module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue-apollo-graphql/' : '/',
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  }
}
