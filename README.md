# Query

## Simple Query

```
<template>
  <div>
    <p>{{ users }}</p>
  </div>
</template>
<script>
```

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      users: []
    }
  },
  apollo: {
    users: gql`
      query {
        users(where: { name: "Kit Jonathan Te" }) {
          id
          name
        }
      }
    `
  }
}
</script>
```

## Name Matching

```
<template>
  <div>
    <p>{{ people }}</p>
  </div>
</template>
<script>
```

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      people: []
    }
  },
  apollo: {
    people: gql`
      query {
        people: users(where: { name: "Kit Jonathan Te" }) {
          id
          name
        }
      }
    `
  }
}
</script>
```

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      people: []
    }
  },
  apollo: {
    people: {
      query: gql`
        query {
          users(where: { name: "Kit Jonathan Te" }) {
            id
            name
          }
        }
      `,
      update: data => data.users
    }
  }
}
```

## Query with parameters

```javascript
import gql from 'graphql-tag'

export default {
  data() {
    return {
      people: []
    }
  },
  apollo: {
    people: {
      query: gql`
        query GetUser($name: String!) {
          users(where: { name: $name }) {
            id
            name
          }
        }
      `,
      update: data => data.users,
      variables: {
        name: 'Kit Jonathan Te'
      }
    }
  }
}
```
