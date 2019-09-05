import gql from 'graphql-tag'

export const typeDefs = gql`
  type Global {
    id: ID!
    property1: String!
  }

  type Item {
    id: ID!
    text: String!
    done: Boolean!
  }

  type Mutation {
    updateGlobalProperty1(value: String!): String!
    changeItem(id: ID!): Boolean
    deleteItem(id: ID!): Boolean
    addItem(text: String!): Item
  }
`

import { globalProperty1Query } from './queries'
import { todoItemsQuery } from './queries'
import shortid from 'shortid'

export const resolvers = {
  Mutation: {
    updateGlobalProperty1: (_, { value }, { cache }) => {
      const data = cache.readQuery({ query: globalProperty1Query })
      console.log(JSON.stringify(data))
      data.global.property1 = value
      console.log(JSON.stringify(data))
      cache.writeQuery({ query: globalProperty1Query, data })
      return value
    },

    checkItem: (_, { id }, { cache }) => {
      const data = cache.readQuery({ query: todoItemsQuery })
      const currentItem = data.todoItems.find(item => item.id === id)
      currentItem.done = !currentItem.done
      cache.writeQuery({ query: todoItemsQuery, data })
      return currentItem.done
    },

    deleteItem: (_, { id }, { cache }) => {
      const data = cache.readQuery({ query: todoItemsQuery })
      const currentItem = data.todoItems.find(item => item.id === id)
      data.todoItems.splice(data.todoItems.indexOf(currentItem), 1)
      cache.writeQuery({ query: todoItemsQuery, data })
      return true
    },

    addItem: (_, { text }, { cache }) => {
      const data = cache.readQuery({ query: todoItemsQuery })
      const newItem = {
        __typename: 'Item',
        id: shortid.generate(),
        text,
        done: false
      }
      data.todoItems.push(newItem)
      cache.writeQuery({ query: todoItemsQuery, data })
      return newItem
    }
  }
}
