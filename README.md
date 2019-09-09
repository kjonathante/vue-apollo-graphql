# Vue Apollo

## Table of Contents

- [Query](#query)
  - [Simple Query](#simple-query)
  - [Name Matching](#name-matching)
  - [Query with parameters](#query-with-parameters)
  - [Reactive parameters](#reactive-parameters)
  - [Reactive query definition](#reactive-query-definition)
- [Mutation](#mutation)
- [Local State](#local-state)
  - [Type Definition](#type-definition)
  - [Queries](#queries)
  - [Resolvers](#resolvers)
  - [Initialize Cache](#initialize-cache)
- [Pagination](#pagination)
  - [Resources](#pagination-resources)
  - [Query](#pagination-query)
  - [Code](#pagination-code)
- [Webpack GraphQL Loader](webpack-graphql-loader)

## Query

#### Simple Query

```
<template>
  <div>
    <p>{{ users }}</p>
  </div>
</template>
<script>
```

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      users: []
    }
  },
  apollo: {
    users: gql`
      query {
        users(where: { name: "Kit Jonathan Te" }) {
          id
          name
        }
      }
    `
  }
}
</script>
```

#### Name Matching

```
<template>
  <div>
    <p>{{ people }}</p>
  </div>
</template>
<script>
```

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      people: []
    }
  },
  apollo: {
    people: gql`
      query {
        people: users(where: { name: "Kit Jonathan Te" }) {
          id
          name
        }
      }
    `
  }
}
</script>
```

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      people: []
    }
  },
  apollo: {
    people: {
      query: gql`
        query {
          users(where: { name: "Kit Jonathan Te" }) {
            id
            name
          }
        }
      `,
      update: data => data.users
    }
  }
}
```

#### Query with parameters

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      people: []
    }
  },
  apollo: {
    people: {
      query: gql`
        query GetUser($name: String!) {
          users(where: { name: $name }) {
            id
            name
          }
        }
      `,
      update: data => data.users,
      variables: {
        name: 'Kit Jonathan Te'
      }
    }
  }
}
```

#### Reactive parameters

```
<template>
  <div>
    <input v-model="nameInput" placeholder="Enter a name" />
    <p>{{ people }}</p>
  </div>
</template>
```

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      nameInput: '',
      people: []
    }
  },
  apollo: {
    people: {
      query: gql`
        query GetUser($name: String!) {
          users(where: { name: $name }) {
            id
            name
          }
        }
      `,
      update: data => data.users,
      variables() {
        return { name: this.nameInput }
      }
    }
  }
}
```

#### Reactive query definition

## Mutation

### The cache needs to be initialized so the update function can work without any problem.

```
<template>
  <div>
    <input v-model="nameInput" placeholder="Enter a name" />
    <button v-on:click="addUser">Add</button>
    <ul>
      <li v-for="(user, index) in users" v-bind:key="user.id">
        {{ index }}. {{ user.name }}
      </li>
    </ul>
  </div>
</template>
```

```javascript
import gql from 'graphql-tag'
const ALL_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`

export default {
  data() {
    return {
      users: [],
      nameInput: ''
    }
  },

  apollo: {
    users: ALL_USERS
  },

  methods: {
    addUser() {
      // We save the user input in case of an error
      const nameInput = this.nameInput
      // We clear it early to give the UI a snappy feel
      this.nameInput = ''
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($name: String!) {
              createUser(data: { name: $name }) {
                id
                name
              }
            }
          `,
          // Parameters
          variables: {
            name: nameInput
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          update: (cache, { data: { createUser } }) => {
            // Read the data from our cache for this query.
            const data = cache.readQuery({ query: ALL_USERS })
            data.users.push(createUser)
            cache.writeQuery({ query: ALL_USERS, data })
          },
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
          optimisticResponse: {
            __typename: 'Mutation',
            createUser: {
              __typename: 'User',
              id: -1,
              name: nameInput
            }
          }
        })
        .then(data => {
          // Result
          console.log('success', data)
        })
        .catch(error => {
          // Error
          console.error('error', error)
          // We restore the initial user input
          this.nameInput = nameInput
        })
    }
  }
}
```

## Local State

#### Type Definition

```javascript
export const typeDefs = gql`
  type Global {
    id: ID!
    property1: String!
  }

  type Mutation {
    updateGlobalProperty1(value: String!): String!
  }
`
```

#### Queries

```javascript
export const globalProperty1Query = gql`
  {
    global @client {
      id
      property1
    }
  }
`
export const globalProperty1Mutation = gql`
  mutation($value: String!) {
    updateGlobalProperty1(value: $value) @client
  }
`
```

#### Resolvers

```javascript
import { globalProperty1Query } from './queries'

export const resolvers = {
  Mutation: {
    updateGlobalProperty1: (_, { value }, { cache }) => {
      const data = cache.readQuery({ query: globalProperty1Query })
      data.global.property1 = value
      cache.writeQuery({ query: globalProperty1Query, data })
      return value
    }
  }
}
```

#### Initialize Cache

```javascript
cache.writeData({
  data: {
    global: {
      __typename: 'Global',
      id: '001',
      property1: 'Something'
    }
  }
})
```

## Pagination

#### Pagination Resources

- [Understanding pagination: REST, GraphQL, and Relay](https://blog.apollographql.com/understanding-pagination-rest-graphql-and-relay-b10f835549e7)
- [Explaining GraphQL Connections](https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976)
- [Vue Apollo - Pagination](https://vue-apollo.netlify.com/guide/apollo/pagination.html)

#### Pagination Query

```javascript
const query = gql`
  query UsersConnection($first: Int = 1, $after: String) {
    usersConnection(first: $first, after: $after) {
      edges {
        node {
          id
          name
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`
```

#### Pagination Code

```javascript
const model = 'usersConnection'

export default {
  apollo: {
    [model]: {
      query
    }
  },

  methods: {
    handleMore() {
      this.$apollo.queries[model].fetchMore({
        variables: {
          after: this[model].pageInfo.endCursor
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          return {
            [model]: {
              __typename: fetchMoreResult[model].__typename,
              edges: [
                ...previousResult[model].edges,
                ...fetchMoreResult[model].edges
              ],
              pageInfo: { ...fetchMoreResult[model].pageInfo }
            }
          }
        }
      })
    }
  },

  components: {
    Card
  }
}
```

## Webpack GraphQL Loader

```javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  }
}
```

```
// usersConnection.gql or usersConnection.graphql
query UsersConnection($first: Int = 2, $after: String) {
  usersConnection(first: $first, after: $after) {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
  }
}
```

```javascript
// any vue file
import USERS_CONNECTION from '../graphql/usersConnection.gql'
```
