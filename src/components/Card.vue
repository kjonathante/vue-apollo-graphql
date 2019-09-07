<template>
  <div v-bind:style="{ backgroundColor: global.property1 }">
    <p>This is a card</p>
    <p>{{ content || global }}</p>
  </div>
</template>

<script>
import { globalProperty1Query } from '../state/queries'

export default {
  apollo: {
    global: globalProperty1Query
  },
  props: {
    content: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 150px;
  padding: 5px;
  border: 1px solid darkgray;
  margin: 5px;
}
</style>
