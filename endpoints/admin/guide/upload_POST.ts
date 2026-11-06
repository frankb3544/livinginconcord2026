import { schema, OutputType } from "./upload_POST.schema";
import superjson from "superjson";
import { db } from "../../../helpers/db";
import { getServerUserSession } from "../../../helpers/getServerUserSession";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);
    if (user.role !== "admin") {
      return new Response(superjson.stringify({ error: "Forbidden" }), { status: 403 });
    }

    const json = superjson.parse(await request.text());
    const input = schema.parse(json);

    const now = new Date();

    // Helper to upsert a site setting
    const upsertSetting = async (key: string, value: string) => {
      const existing = await db
        .selectFrom("siteSettings")
        .where("settingKey", "=", key)
        .select("id")
        .executeTakeFirst();

      if (existing) {
        await db
          .updateTable("siteSettings")
          .set({ settingValue: value, updatedAt: now })
          .where("id", "=", existing.id)
          .execute();
      } else {
        await db
          .insertInto("siteSettings")
          .values({ settingKey: key, settingValue: value })
          .execute();
      }
    };

    if (input.isFirstChunk) {
      // Clear all existing chunks before starting a new upload
      await db.deleteFrom("guidePdfChunks").execute();

      // Persist filename and total chunk count
      await upsertSetting("relocation_guide_filename", input.fileName);
      await upsertSetting("relocation_guide_total_chunks", String(input.totalChunks));

      console.log(`Starting chunked upload: ${input.fileName}, ${input.totalChunks} chunks`);
    }

    // Insert this chunk
    await db
      .insertInto("guidePdfChunks")
      .values({
        chunkIndex: input.chunkIndex,
        chunkData: input.chunkData,
      })
      .execute();

    console.log(`Uploaded chunk ${input.chunkIndex + 1}/${input.totalChunks} for ${input.fileName}`);

    return new Response(superjson.stringify({ success: true } satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Chunk upload error:", errorMessage);
    const status =
      errorMessage === "Not authenticated" || errorMessage === "Forbidden" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}