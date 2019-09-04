import gql from 'graphql-tag'

export const typeDefs = gql`
  type Global {
    id: ID!
    property1: String!
  }

  type Mutation {
    updateGlobalProperty1(value: String!): String!
  }
`

import { globalProperty1Query } from './queries'

export const resolvers = {
  Mutation: {
    updateGlobalProperty1: (_, { value }, { cache }) => {
      const data = cache.readQuery({ query: globalProperty1Query })
      console.log(JSON.stringify(data))
      data.global.property1 = value
      console.log(JSON.stringify(data))
      cache.writeQuery({ query: globalProperty1Query, data })
      return value
    }
  }
}
