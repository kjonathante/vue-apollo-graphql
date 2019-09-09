<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link :to="{ name: 'query' }">Query</router-link>
      <router-link :to="{ name: 'query2' }">Query2</router-link>
      <router-link :to="{ name: 'mutation' }">Mutation</router-link>
      <router-link :to="{ name: 'subscription' }">Subscription</router-link>
      <router-link :to="{ name: 'subscription2' }">Subscription2</router-link>
      <router-link :to="{ name: 'localstate' }">LocalState</router-link>
      <router-link :to="{ name: 'localstate2' }">LocalState2</router-link>
      <router-link :to="{ name: 'pagination' }">Pagination</router-link>
      <router-link :to="{ name: 'webpackgraphqlloader' }"
        >Webpack GraphQL Loader</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

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
    padding: 0 5px;
    border-right: 1px solid lightgray;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:last-child {
      border-right: 0;
    }
  }
}
</style>
