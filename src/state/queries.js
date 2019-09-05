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

export const todoItemsQuery = gql`
  {
    todoItems @client {
      id
      text
      done
    }
  }
`

export const checkItemMutation = gql`
  mutation($id: ID!) {
    checkItem(id: $id) @client
  }
`

export const deleteItemMutation = gql`
  mutation($id: ID!) {
    deleteItem(id: $id) @client
  }
`

export const addItemMutation = gql`
  mutation($text: String!) {
    addItem(text: $text) @client {
      id
      text
      done
    }
  }
`
