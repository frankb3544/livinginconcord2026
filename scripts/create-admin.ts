/**
 * Create (or promote) the admin user for the site.
 *
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='…' npm run create-admin
 *
 * Optional: ADMIN_DISPLAY_NAME (defaults to "Franklin Bellamy", the agent
 * name the codebase itself uses as its built-in default).
 *
 * The password is read from the environment at run time and stored only as a
 * bcrypt hash (same helper the register endpoint uses) in user_passwords.
 * Nothing is hardcoded. Re-running with an existing email updates that user's
 * password hash and ensures the role is 'admin'.
 */
import { db } from "../helpers/db";
import { generatePasswordHash } from "../helpers/generatePasswordHash";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const displayName = process.env.ADMIN_DISPLAY_NAME || "Franklin Bellamy";

  if (!email || !password) {
    console.error(
      "Usage: ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run create-admin\n" +
        "Both ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment."
    );
    process.exit(1);
  }

  const passwordHash = await generatePasswordHash(password);

  const user = await db.transaction().execute(async (trx) => {
    const existing = await trx
      .selectFrom("users")
      .select(["id", "email"])
      .where("email", "=", email)
      .executeTakeFirst();

    if (existing) {
      await trx
        .updateTable("users")
        .set({ role: "admin", displayName })
        .where("id", "=", existing.id)
        .execute();
      await trx
        .insertInto("userPasswords")
        .values({ userId: existing.id, passwordHash })
        .onConflict((oc) =>
          oc.column("userId").doUpdateSet({ passwordHash })
        )
        .execute();
      return existing;
    }

    const created = await trx
      .insertInto("users")
      .values({ email, displayName, role: "admin" })
      .returning(["id", "email"])
      .executeTakeFirstOrThrow();
    await trx
      .insertInto("userPasswords")
      .values({ userId: created.id, passwordHash })
      .execute();
    return created;
  });

  console.log(`Admin user ready: ${user.email} (id ${user.id})`);
}

main()
  .then(async () => {
    await db.destroy();
  })
  .catch(async (err) => {
    console.error("create-admin failed:", err);
    await db.destroy();
    process.exit(1);
  });
