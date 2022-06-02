const  createProxyMiddleware  = require('http-proxy-middleware');
console.log(process.env.CLIENT_API_BASE_URL);
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:6868',
      changeOrigin: true,
    })
  );
};