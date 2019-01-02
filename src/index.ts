import { ApolloServer, gql, IResolvers } from 'apollo-server'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || 4000

// Overwrite a property's type
// https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-378367303
type Overwrite<T, K extends keyof T, R> = Pick<T, Exclude<keyof T, K>> &
  { [P in K]: R }

type IAuthorRef = Overwrite<GQL.IAuthor, 'books', number[]>
type IBookRef = Overwrite<GQL.IBook, 'author', number>

const authors: Record<number, IAuthorRef> = {
  1: {
    __typename: 'Author',
    books: [3, 4],
    id: '1',
    name: 'John Steinbeck',
  },
  2: {
    __typename: 'Author',
    books: [5],
    id: '2',
    name: 'Charles Darwin',
  },
}

const books: Record<number, IBookRef> = {
  3: {
    __typename: 'Book',
    author: 1,
    id: '3',
    title: 'Grapes Of Wrath',
  },
  4: {
    __typename: 'Book',
    author: 1,
    id: '4',
    title: 'Of Mice and Men',
  },
  5: {
    __typename: 'Book',
    author: 2,
    id: '5',
    title: 'Origin Of Species',
  },
}

const resolvers: IResolvers = {
  Book: {
    /**
     * Use Apollo's nested object resolver to look up author
     * {@link https://www.apollographql.com/docs/graphql-tools/resolvers.html}
     */
    author({ author: authorId }: IBookRef) {
      if (authorId in authors) {
        return authors[authorId]
      }
    },
  },
  Query: {
    books() {
      return Object.values(books)
    },
  },
}

const typeDefs = gql(
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
)

const server = new ApolloServer({
  /**
   * Basic request/error logging
   * {@link https://www.apollographql.com/docs/apollo-server/features/metrics.html#High-Level-Logging}
   */
  formatError(error: any) {
    console.error(error)
    return error
  },
  formatResponse(response: any) {
    console.log(response.data)
    return response
  },
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
