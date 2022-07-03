# fresh-sqlite-example

[Fresh][fresh] example with [SQLite][sqlite] and [kysely][kysely] query builder.
See running [example][app-url] on [Fly.io][fly-io].

## Prerequisites

- [Deno][deno] v1.23 or higher
- [SQLite][sqlite]

### Optional

- [Fly.io][fly-io]
- [Just][just]

## Development

### Run

```sh
deno task start

#

just run
```

This will watch the project directory and restart as necessary.

### Initiate database

```sh
deno task migrate
```

Creates `./data/test.db` with example data. It runs `migrate_down` and
`migrate_up` tasks.

### Create database and populate with data

```sh
deno task migrate_up
```

### Clear database

```sh
deno task migrate_down
```

## Deployment

[Fly.io][fly-io] deployment configuration is based on
[Remix Indie Stack][remix-indie-stack] and [Fly.io Run a Deno][fly-io-run-deno].

- Create an app

```sh
flyctl launch
```

- Create a persistent volume for the SQLite

```sh
flyctl volumes create data --size 1 --app fresh-sqlite-example
```

- Deploy

```sh
flyctl deploy
```

- Open in the web browser

```sh
flyctl open
```

[app-url]: http://fresh-sqlite-example.fly.dev/
[fresh]: https://fresh.deno.dev/
[sqlite]: https://www.sqlite.org/
[kysely]: https://koskimas.github.io/kysely/
[deno]: https://deno.land/
[fly-io]: https://fly.io/
[fly-io-run-deno]: https://fly.io/docs/getting-started/deno/
[just]: https://github.com/casey/just
[remix-indie-stack]: https://github.com/remix-run/indie-stack
