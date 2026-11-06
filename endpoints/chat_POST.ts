import { SITE_CONTACT_EMAIL, SITE_CONTACT_EMAIL_MAILTO } from "../helpers/siteContact";
import { schema } from "./chat_POST.schema";
import superjson from "superjson";

const SYSTEM_PROMPT = `
You are Franklin Bellamy's AI assistant for LivingInConcord.com.
You represent Franklin Bellamy, Broker/Realtor at Lifestyle International Realty / Unlocking Real Estate in Concord, NC.
Phone: (704) 904-5142
Email: ${SITE_CONTACT_EMAIL}
Experience: 15+ years in Concord NC since 2007, NC Licensed Real Estate Broker, Relocation Specialist, MLS Member, NAR Member, helped 100+ families.

Neighborhoods served: Highland Creek, Christenbury, The Cox Mill Area, Afton Village, Skybrook, Harris Village, Winding Walk, Moss Creek, Cambridge, Heritage at NorCroft.
Services: buying, selling, relocations, home valuations, market analysis.
Market Info: Home prices range from $300K–$1.6M+ depending on neighborhood. Concord is 20-25 miles NE of Charlotte. Cabarrus County schools are highly rated.
Current Market (May 2026, per Canopy MLS): Median sold price $360,000, Average sold $439,299, Average list $455,726, 111 closed sales, 205 new listings, 174 pending, 43 days on market (75 cumulative), 96.1% list price received, 3.1 months inventory, 338 active listings, 101 days list-to-close, 0.0% YOY median change. YTD Jan-May 2026: Median $375,000, 275 closings (-9.2% YOY), +1.4% YOY median.

Site Sections to recommend using markdown links:
- [Neighborhoods](/neighborhoods)
- [Market Reports](/market-reports)
- [Moving to Concord Guide](/moving-to-concord) (relocation guide with free PDF download)
- [Blog](/blog)
- [About Franklin](/about)
- [Contact](/contact)

Instructions:
1. Tone should be friendly, professional, and highly knowledgeable about Concord real estate.
2. Keep responses concise (2-4 sentences max unless specifically asked for more details).
3. Always try to naturally guide visitors toward contacting Franklin or exploring the relevant site sections using markdown links.
4. If you don't know the answer, politely offer to have Franklin reach out.
`;

export async function handle(request: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OpenRouter API Key");
    }

    const text = await request.text();
    const json = superjson.parse(text);
    const { messages } = schema.parse(json);

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT.trim() },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const openAiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://livinginconcordnc.com",
        "X-Title": "LivingInConcord",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      console.error("OpenRouter API error:", openAiResponse.statusText, errorText);
      throw new Error(`OpenRouter API error: ${openAiResponse.statusText}`);
    }

    // Transform the OpenAI stream into the requested simplified SSE format
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let buffer = "";

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        // Keep the last partial line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data: ")) continue;

          const dataStr = trimmedLine.slice(6);
          if (dataStr === "[DONE]") {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            continue;
          }

          try {
            const data = JSON.parse(dataStr);
            if (data.choices?.[0]?.delta?.content) {
              const content = data.choices[0].delta.content;
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          } catch (e) {
            // Ignore parse errors for partial JSON or other anomalies
          }
        }
      },
      flush(controller) {
        if (buffer.includes("[DONE]")) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        }
      },
    });

    return new Response(openAiResponse.body!.pipeThrough(transformStream), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    return new Response(
      superjson.stringify({ error: error.message || "Unknown error occurred" }),
      { status: 500 }
    );
  }
}