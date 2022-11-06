const  {createProxyMiddleware}  = require('http-proxy-middleware');
// console.log(process.env.CLIENT_API_BASE_URL);
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://127.0.0.1:6868/`,
      changeOrigin: true,
    })
  )
}