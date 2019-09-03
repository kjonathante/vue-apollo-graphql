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
  apollo: {
    users: {
      query: ALL_USERS,
      subscribeToMore: {
        document: gql`
          subscription {
            user {
              mutation
              node {
                id
                name
              }
              updatedFields
              previousValues {
                id
                name
              }
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData: { data } }) => {
          // params: prevResult, {subscriptionData: {data}, variables}
          /*
            type UserSubscriptionPayload {
              mutation: MutationType!
              node: User
              updatedFields: [String!]
              previousValues: UserPreviousValues
            }
          */
          // console.log(previousResult)
          // console.log(data.user)
          // console.log(data.user.mutation)
          // console.log(data.user.node)
          // console.log(data.user.updatedFields)
          // console.log(data.user.previousValues)

          if (data.user.mutation === 'CREATED') {
            return { users: [...previousResult.users, data.user.node] }
          } else if (data.user.mutation === 'DELETED') {
            const index = previousResult.users.findIndex(
              user => user.id === data.user.previousValues.id
            )
            if (index === -1) return previousResult
            // The previous result is immutable
            const newResult = {
              users: [...previousResult.users]
            }
            // Remove the question from the list
            newResult.users.splice(index, 1)
            return newResult
          }
        }
      }
    }
  }
}
</script>
