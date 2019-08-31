<template>
  <div>
    <input v-model="nameInput" placeholder="Enter a name" />
    <p>{{ people }}</p>
  </div>
</template>
<script>
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
</script>
