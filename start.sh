#!/bin/sh

set -ex

deno task migrate
deno task start
