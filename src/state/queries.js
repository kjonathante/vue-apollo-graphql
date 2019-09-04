import gql from 'graphql-tag'

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
