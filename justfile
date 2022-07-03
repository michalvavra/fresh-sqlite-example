# See https://just.systems/man/en/

# Just list recipes
help:
  just --list --unsorted

run: open_dev
  deno task start

# Deploy to Fly.io
deploy:
  flyctl deploy

open:
  flyctl open

open_dev:
  open "http://localhost:8000"

# Formatting (with write)
fmt:
  deno fmt

# Lint
lint:
	deno lint
