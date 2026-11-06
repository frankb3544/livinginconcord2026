import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    // Read all chunks ordered by chunkIndex
    const chunks = await db
      .selectFrom("guidePdfChunks")
      .select(["chunkIndex", "chunkData"])
      .orderBy("chunkIndex", "asc")
      .execute();

    if (chunks.length === 0) {
      return new Response(JSON.stringify({ error: "No guide uploaded" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Concatenate all chunk data to reconstruct the full base64 string
    const fullBase64 = chunks.map((c) => c.chunkData).join("");

    // Strip data URI prefix if somehow present
    const prefix = "data:application/pdf;base64,";
    const base64Data = fullBase64.startsWith(prefix)
      ? fullBase64.substring(prefix.length)
      : fullBase64;

    // Convert base64 string to a binary buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Get filename from siteSettings
    const filenameSetting = await db
      .selectFrom("siteSettings")
      .where("settingKey", "=", "relocation_guide_filename")
      .select("settingValue")
      .executeTakeFirst();

    const filename = filenameSetting?.settingValue || "Moving_to_Concord_Guide.pdf";

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}