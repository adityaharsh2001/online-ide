const  {createProxyMiddleware}  = require('http-proxy-middleware');
// console.log(process.env.CLIENT_API_BASE_URL);
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.NODE_ENV === "production"? process.env.REACT_APP_API_BASE_URL: process.env.CLIENT_API_BASE_URL,
      changeOrigin: true,
    })
  );
};