<template>
  <div class="div" v-bind:style="{ backgroundColor: global.property1 }">
    <p>This is a card</p>
    <p>{{ global }}</p>
  </div>
</template>

<script>
import { globalProperty1Query } from '../state/queries'

export default {
  apollo: {
    global: globalProperty1Query
  }
}
</script>

<style lang="scss" scoped>
.div {
  width: 150px;
  padding: 5px;
  border: 1px solid darkgray;
}
</style>
