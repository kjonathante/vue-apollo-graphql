<template>
  <div>
    <p>{{ people }}</p>
  </div>
</template>
<script>
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
</script>
