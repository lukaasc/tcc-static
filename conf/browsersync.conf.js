const conf = require('./gulp.conf');
const proxy = require('http-proxy-middleware');

const jsonPlaceholderProxy = proxy('/api', {
  target: 'localhost:8080',
  changeOrigin: true,
  logLevel: 'debug',
  router: {
    'localhost:3000/api': 'http://localhost:8080'
  }
});

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: jsonPlaceholderProxy
    },
    open: false
  };
};
