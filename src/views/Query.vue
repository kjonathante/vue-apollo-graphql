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
</script>
