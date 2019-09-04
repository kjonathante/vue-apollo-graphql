<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>_|_
      <router-link to="/about">About</router-link>_|_
      <router-link :to="{ name: 'query' }">Query</router-link>_|_
      <router-link :to="{ name: 'query2' }">Query2</router-link>_|_
      <router-link :to="{ name: 'mutation' }">Mutation</router-link>_|_
      <router-link :to="{ name: 'subscription' }">Subscription</router-link>_|_
      <router-link :to="{ name: 'subscription2' }">Subscription2</router-link
      >_|_
      <router-link :to="{ name: 'localstate' }">LocalState</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
