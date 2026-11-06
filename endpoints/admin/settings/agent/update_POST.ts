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
    if (input.name !== undefined) updates.push({ key: "agent_name", value: input.name });
    if (input.title !== undefined) updates.push({ key: "agent_title", value: input.title });
    if (input.description !== undefined) updates.push({ key: "agent_description", value: input.description });
    if (input.imageUrl !== undefined) updates.push({ key: "agent_image_url", value: input.imageUrl });

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
    const status = errorMessage === "Not authenticated" ? 401 : 400;
    return new Response(superjson.stringify({ error: errorMessage }), { status });
  }
}