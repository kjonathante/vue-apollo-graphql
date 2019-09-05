<template>
  <div>
    <p>{{ content.text }} {{ content.done }}</p>
    <button v-on:click="$emit('toggleDone')">Toggle</button>
    <button v-on:click="$emit('delete')">Delete</button>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
