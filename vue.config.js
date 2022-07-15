module.exports = {
  lintOnSave: false,
  devServer: {
    // 端口号
    // 配置不同的后台API地址
    proxy: {
      '/api2': {
        target: 'http://172.16.35.74:9090',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api2': ''
        }
      }
    }
  }
}
