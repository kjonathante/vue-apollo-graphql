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

<script>
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
</script>
