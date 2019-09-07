<template>
  <div v-if="usersConnection">
    <div class="div">
      <Card
        v-for="user in usersConnection.edges"
        :key="user.node.id"
        v-bind:content="user.node.name"
      />
    </div>
    <button v-if="usersConnection.pageInfo.hasNextPage" v-on:click="handleMore">More</button>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Card from '../components/Card'

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
</script>

<style lang="scss" scoped>
.div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
