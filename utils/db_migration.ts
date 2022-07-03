import { Kysely, sql } from "kysely";
import { Db, DbSchema } from "@utils/db.ts";

async function up(db: Kysely<DbSchema>): Promise<void> {
  await db.schema
    .createTable("person")
    .ifNotExists()
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text")
    .addColumn("gender", "text", (col) => col.notNull())
    .addColumn(
      "modified_at",
      "timestamp",
      (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();

  await db.insertInto("person").values({
    first_name: "Jennifer",
    gender: "female",
  }).execute();

  await db.insertInto("person").values({ first_name: "John", gender: "male" })
    .execute();
}

async function down(db: Kysely<DbSchema>): Promise<void> {
  await db.schema.dropTable("person").ifExists().execute();
}

async function run() {
  const { args } = Deno;

  const db = Db.getInstance();

  if (args.includes("--up")) {
    await up(db);
  } else if (args.includes("--down")) {
    await down(db);
  } else {
    await down(db);
    await up(db);
  }
}

// Run only when executed as a script via `deno run` or `deno task`
if (import.meta.main) {
  run();
}
