import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { typeDefs, resolvers } from './state/resolvers'

Vue.use(VueApollo)

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://us1.prisma.sh/kjonathante-151c9e/hello-world/dev'
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: 'wss://us1.prisma.sh/kjonathante-151c9e/hello-world/dev',
  options: {
    reconnect: true
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
  connectToDevTools: true
})

cache.writeData({
  data: {
    global: {
      __typename: 'Global',
      id: '001',
      property1: 'Something'
    }
  }
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export { apolloProvider }
