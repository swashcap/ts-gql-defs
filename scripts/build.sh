#!/bin/bash
set -eo pipefail

rm -rf build
node_modules/.bin/tsc
find src -type f -name '*.graphql' -exec bash -c 'cp {} $(echo "{}" | sed -E "s/^src/build/")' \;