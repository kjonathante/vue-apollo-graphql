<template>
  <div>
    <p>{{ global }}</p>
    <input type="text" v-model="text" />
    <button v-on:click="updateProperty">Change</button>
  </div>
</template>
<script>
import { globalProperty1Query, globalProperty1Mutation } from '../state/queries'

export default {
  data() {
    return {
      text: ''
    }
  },

  apollo: {
    global: {
      query: globalProperty1Query
    }
  },

  methods: {
    updateProperty() {
      this.$apollo.mutate({
        mutation: globalProperty1Mutation,
        variables: { value: this.text }
      })
    }
  }
}
</script>
