#!/bin/bash
set -eo pipefail

find src -type f -name '*.graphql' \
  -exec node_modules/.bin/gql2ts -o "{}.d.ts" {} \;
