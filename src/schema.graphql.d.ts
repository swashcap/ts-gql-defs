// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery
    errors?: Array<IGraphQLResponseError>
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string
    locations?: Array<IGraphQLResponseErrorLocation>
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any
  }

  interface IGraphQLResponseErrorLocation {
    line: number
    column: number
  }

  interface IQuery {
    __typename: 'Query'
    books: Array<IBook | null>
  }

  interface IBook {
    __typename: 'Book'
    author: IAuthor
    id: string
    title: string
  }

  interface IAuthor {
    __typename: 'Author'
    books: Array<IBook | null>
    id: string
    name: string
  }
}

// tslint:enable
