const {createProxyMiddleware} = require('http-proxy-middleware');//创建代理中间件

module.exports = function(app){
  app.use(
    '/proxy', //如果请求是以proxy开头的 我们就把它代理一下
    createProxyMiddleware({ //以服务器的形式发起请求，不会受到浏览器的限制
      target: 'http://demo.don.red/weibo/api',
      pathRewrite: { '/proxy': '/' }, // 将对应地址映射到 /proxy 路径下
      changeOrigin: true, //配置项
    })    
  )
}
