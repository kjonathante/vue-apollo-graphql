<template>
  <div>
    <div class="div">
      <Card
        v-for="user in users"
        :key="user.node.id"
        v-bind:content="user.node.name"
      />
    </div>
    <button v-if="hasNextPage" v-on:click="handleMore">More</button>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Card from '../components/Card'

export default {
  data() {
    return {
      hasNextPage: false,
      endCursor: ''
    }
  },

  apollo: {
    users: {
      query: gql`
        query UsersConnection($after: String) {
          usersConnection(first: 1, after: $after) {
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
      `,
      update(data) {
        this.endCursor = data.usersConnection.pageInfo.endCursor
        this.hasNextPage = data.usersConnection.pageInfo.hasNextPage
        return data.usersConnection.edges
      }
    }
  },

  methods: {
    handleMore() {
      this.$apollo.queries.users.fetchMore({
        variables: {
          after: this.endCursor
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult

          const model = 'usersConnection'

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
</script>

<style lang="scss" scoped>
.div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
