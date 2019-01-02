# TypeScript GraphQL Definitions

This project demos [avantcredit/gql2ts](https://github.com/avantcredit/gql2ts) and [Apollo Server](https://www.apollographql.com/docs/apollo-server/) for GraphQL-driven types for TypeScript

## Running the Project

With a recent version of [Node.js](https://nodejs.org/en/) (>=10) and [yarn](https://yarnpkg.com/en/):

```shell
# Clone the project
git clone https://github.com/swashcap/ts-gql-defs.git

# Install dependencies
cd ts-gql-defs
yarn

# Build to JavaScript
yarn build

# Run the server
yarn start
```

Then, open up <http://localhost:4000> to see the GraphQL playground.

## Generating Definitions

Run `yarn schema` to generate definitions from _src/schema.graphql_.
