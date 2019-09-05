<template>
  <div>
    <input type="text" v-model="newItem" />
    <button v-on:click="addItem">Add</button>
    <TodoItem
      v-for="item in todoItems"
      v-bind:key="item.id"
      v-bind:content="item"
      v-on:toggleDone="checkItem(item.id)"
      v-on:delete="deleteItem(item.id)"
      >{{ item.text }}</TodoItem
    >
  </div>
</template>

<script>
import {
  todoItemsQuery,
  addItemMutation,
  deleteItemMutation,
  checkItemMutation
} from '../state/queries'
import TodoItem from '../components/TodoItem'
export default {
  data() {
    return {
      newItem: ''
    }
  },
  apollo: {
    todoItems: {
      query: todoItemsQuery
    }
  },
  methods: {
    addItem() {
      if (this.newItem) {
        this.$apollo.mutate({
          mutation: addItemMutation,
          variables: { text: this.newItem }
        })
        this.newItem = ''
      }
    },
    deleteItem(id) {
      this.$apollo.mutate({
        mutation: deleteItemMutation,
        variables: { id }
      })
    },
    checkItem(id) {
      this.$apollo.mutate({
        mutation: checkItemMutation,
        variables: { id }
      })
    }
  },
  components: {
    TodoItem
  }
}
</script>

<style lang="scss" scoped></style>
