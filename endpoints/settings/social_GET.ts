import { OutputType } from "./social_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
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
    return new Response(superjson.stringify({ error: errorMessage }), { status: 400 });
  }
}