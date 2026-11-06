import { OutputType } from "./agent_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";

export async function handle(request: Request) {
  try {
    const settings = await db
      .selectFrom("siteSettings")
      .select(["settingKey", "settingValue"])
      .where("settingKey", "in", [
        "agent_name",
        "agent_title",
        "agent_description",
        "agent_image_url",
      ])
      .execute();

    const agentProfile: OutputType = {
      name: "Franklin Bellamy",
      title: "Broker / Realtor",
      description: "Local Concord NC expert with 15+ years of experience.",
      imageUrl: "",
    };

    for (const setting of settings) {
      if (setting.settingKey === "agent_name" && setting.settingValue) agentProfile.name = setting.settingValue;
      if (setting.settingKey === "agent_title" && setting.settingValue) agentProfile.title = setting.settingValue;
      if (setting.settingKey === "agent_description" && setting.settingValue) agentProfile.description = setting.settingValue;
      if (setting.settingKey === "agent_image_url" && setting.settingValue) agentProfile.imageUrl = setting.settingValue;
    }

    return new Response(superjson.stringify(agentProfile satisfies OutputType));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(superjson.stringify({ error: errorMessage }), { status: 400 });
  }
}