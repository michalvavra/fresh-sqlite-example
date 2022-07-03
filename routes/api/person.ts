import { HandlerContext } from "$fresh/server.ts";
import { Db } from "@utils/db.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const db = Db.getInstance();

  const results = await db.selectFrom("person").select([
    "first_name",
    "modified_at",
  ]).execute();

  return Promise.resolve(
    new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    }),
  );
};
