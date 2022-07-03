/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { Db, Person } from "@utils/db.ts";

type PersonRow = {
  id: number;
  firstName: string;
  lastName: string | null;
};

type People = Array<PersonRow>;

export const handler: Handlers<People | null> = {
  async GET(_, ctx) {
    const db = Db.getInstance();

    const results = await db.selectFrom("person").selectAll().execute();

    let people: People | null = null;
    if (results) {
      people = results.map((p) => ({
        id: p.id,
        firstName: p.first_name,
        lastName: p.last_name,
      }));
    }

    return ctx.render(people);
  },
};

export default function Home({ data }: PageProps<People | null>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to `fresh`. This is an example with{" "}
        <a href="https://deno.land/x/sqlite" class={tw`underline`}>
          Deno SQLite Module
        </a>{" "}
        and{" "}
        <a href="https://koskimas.github.io/kysely/" class={tw`underline`}>
          Kysely
        </a>{" "}
        query builder.
      </p>
      {data &&
        (
          <div class={tw`my-6`}>
            <p>Results from database:</p>
            <ul class={tw`mx-6 list-disc`}>
              {data.map((p) => <li>{p.firstName}</li>)}
            </ul>
            <p>
              Try the{" "}
              <a href="/api/person" class={tw`underline`}>`api/person`</a> API.
            </p>
          </div>
        )}
      <Counter start={3} />
    </div>
  );
}
