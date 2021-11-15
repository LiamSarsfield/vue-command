module.exports = {
  chainWebpack: config => {
    config.module.rule('eslint').use('eslint-loader').options({ fix: true })
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
        }
      })
  }
}
