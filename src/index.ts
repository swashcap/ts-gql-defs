import { ApolloServer, gql } from 'apollo-server'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || 4000

const resolvers = {
  Query: {
    books() {
      return []
    },
  },
}

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
)

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

server
  .listen({ port })
  .then(({ url }) => {
    console.log(`Server listening at ${url}`)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })