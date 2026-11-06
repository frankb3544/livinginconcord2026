import { schema, OutputType } from "./submit_POST.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

async function fireWeb3FormsNotification(result: {
  fullName: string;
  email: string;
  phone?: string | null;
  interestedIn?: string | null;
  message?: string | null;
  motivation?: string | null;
  timeline?: string | null;
  budget?: string | null;
  sourceNeighborhood?: string | null;
  qualifierVariant?: string | null;
  preferredCallTime?: string | null;
}): Promise<void> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("Web3Forms: WEB3FORMS_ACCESS_KEY env var is not set — skipping notification.");
    return;
  }

  const subjectContext = result.interestedIn || result.sourceNeighborhood || "General";
  const subject = `🏠 New Lead: ${result.fullName} — ${subjectContext}`;
  const neighborhood = result.sourceNeighborhood || result.interestedIn || null;

  const body: Record<string, string> = {
    access_key: accessKey,
    subject,
    Name: result.fullName,
    Email: result.email,
  };

  if (result.phone) body["Phone"] = result.phone;
  if (result.interestedIn) body["Interested_In"] = result.interestedIn;
  if (result.message) body["Message"] = result.message;
  if (neighborhood) body["Neighborhood"] = neighborhood;
  if (result.motivation) body["Motivation"] = result.motivation;
  if (result.timeline) body["Timeline"] = result.timeline;
  if (result.budget) body["Budget"] = result.budget;
  if (result.preferredCallTime) body["Preferred_Call_Time"] = result.preferredCallTime;
  if (result.qualifierVariant) body["Qualifier_Variant"] = result.qualifierVariant;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "User-Agent": "LivingInConcordNC/1.0",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Web3Forms: submission failed with status ${res.status}: ${text}`);
  } else {
    console.log("Web3Forms: notification sent successfully.");
  }
}

export async function handle(request: Request) {
  try {
    const json = superjson.parse(await request.text());
    const result = schema.parse(json);

    await db
      .insertInto("contactSubmissions")
      .values({
        fullName: result.fullName,
        email: result.email,
        phone: result.phone ?? null,
        interestedIn: result.interestedIn ?? null,
        message: result.message ?? null,
        motivation: result.motivation ?? null,
        timeline: result.timeline ?? null,
        budget: result.budget ?? null,
        sourceNeighborhood: result.sourceNeighborhood ?? null,
        qualifierVariant: result.qualifierVariant ?? null,
        preferredCallTime: result.preferredCallTime ?? null,
      })
      .execute();

    // Await the notification but don't let Web3Forms errors break the user response
    try {
      await fireWeb3FormsNotification(result);
    } catch (notifyError) {
      console.error("Web3Forms: unexpected error during notification:", notifyError instanceof Error ? notifyError.message : notifyError);
    }

    return new Response(
      superjson.stringify({ success: true } satisfies OutputType)
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
    });
  }
}