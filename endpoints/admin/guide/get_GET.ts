import { OutputType } from "./get_GET.schema";
import superjson from "superjson";
import { db } from "../../../helpers/db";

export async function handle(request: Request) {
  try {
    // Check if any chunks exist
    const chunkCount = await db
      .selectFrom("guidePdfChunks")
      .select(db.fn.count<number>("id").as("count"))
      .executeTakeFirst();

    const exists = Number(chunkCount?.count ?? 0) > 0;

    // Get filename and updatedAt from siteSettings
    const settings = await db
      .selectFrom("siteSettings")
      .where("settingKey", "in", ["relocation_guide_filename", "relocation_guide_total_chunks"])
      .select(["settingKey", "settingValue", "updatedAt"])
      .execute();

    const filenameSetting = settings.find((s) => s.settingKey === "relocation_guide_filename");

    return new Response(
      superjson.stringify({
        exists,
        fileName: filenameSetting?.settingValue ?? null,
        updatedAt: filenameSetting?.updatedAt as Date | null,
      } satisfies OutputType)
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error getting guide info:", errorMessage);
    return new Response(superjson.stringify({ error: errorMessage }), { status: 400 });
  }
}