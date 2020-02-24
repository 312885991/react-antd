let proxy = require('http-proxy-middleware');

// 本地代理
module.exports = function(app) {
  // app.use( 
  //     '/mock',
  //     proxy.createProxyMiddleware(
  //       { 
  //         target: 'http://yapi.demo.qunar.com/mock/80992/react-antd',
  //         changeOrigin: true,
  //         pathRewrite: {
  //           '^/mock': '/'
  //         }
  //     })
  // );
  // app.use(
  //     '/api',
  //     proxy.createProxyMiddleware(
  //       { 
  //         target: 'https://quicklyweb.cn',
  //         changeOrigin: true,
  //         pathRewrite: {
  //           '^/api': '/'
  //         }
  //     })
  // );
};