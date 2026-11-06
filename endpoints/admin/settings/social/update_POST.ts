import { schema, OutputType } from "./update_POST.schema";
import superjson from "superjson";
import { db } from "../../../../helpers/db";
import { getServerUserSession } from "../../../../helpers/getServerUserSession";

export async function handle(request: Request) {
  try {
    const { user } = await getServerUserSession(request);
    if (user.role !== "admin") {
      return new Response(superjson.stringify({ error: "Forbidden" }), { status: 403 });
    }

    const json = superjson.parse(await request.text());
    const input = schema.parse(json);

    const updates = [];
    if (input.instagram !== undefined) updates.push({ key: "social_instagram", value: input.instagram });
    if (input.facebook !== undefined) updates.push({ key: "social_facebook", value: input.facebook });
    if (input.tiktok !== undefined) updates.push({ key: "social_tiktok", value: input.tiktok });
    if (input.youtube !== undefined) updates.push({ key: "social_youtube", value: input.youtube });

    for (const { key, value } of updates) {
      const existing = await db
        .selectFrom("siteSettings")
        .select("id")
        .where("settingKey", "=", key)
        .executeTakeFirst();

      if (existing) {
        await db
          .updateTable("siteSettings")
          .set({ settingValue: value, updatedAt: new Date() })
          .where("id", "=", existing.id)
          .execute();
      } else {
        await db
          .insertInto("siteSettings")
          .values({ settingKey: key, settingValue: value })
          .execute();
      }
    }

    const settings = await db
      .selectFrom("siteSettings")
      .select(["settingKey", "settingValue"])
      .where("settingKey", "in", ["social_instagram", "social_facebook", "social_tiktok", "social_youtube"])
      .execute();

    const socialLinks: OutputType = {
      instagram: "",
      facebook: "",
      tiktok: "",
      youtube: "",
    };

    for (const setting of settings) {
      if (setting.settingKey === "social_instagram") socialLinks.instagram = setting.settingValue || "";
      if (setting.settingKey === "social_facebook") socialLinks.facebook = setting.settingValue || "";
      if (setting.settingKey === "social_tiktok") socialLinks.tiktok = setting.settingValue || "";
      if (setting.settingKey === "social_youtube") socialLinks.youtube = setting.settingValue || "";
    }

    return new Response(superjson.stringify(socialLinks satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = errorMessage === "Not authenticated" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}