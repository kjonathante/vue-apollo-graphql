<template>
  <div>
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
      users: []
    }
  },

  apollo: {
    users: ALL_USERS,
    // Subscriptions
    $subscribe: {
      // When a tag is added
      user: {
        query: gql`
          subscription {
            user {
              mutation
              node {
                id
                name
              }
            }
          }
        `,
        // // Reactive variables
        // variables() {
        //   // This works just like regular queries
        //   // and will re-subscribe with the right variables
        //   // each time the values change
        //   return {
        //     type: this.type
        //   }
        // },
        // Result hook
        // Don't forget to destructure `data`
        result({ data }) {
          console.log(data)
          if (data.user.mutation === 'CREATED') {
            this.users.push(data.user.node)
          }
        }
      }
    }
  }
}
</script>
