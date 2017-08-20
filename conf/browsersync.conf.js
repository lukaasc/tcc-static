const conf = require('./gulp.conf');
const proxy = require('http-proxy-middleware');

const jsonPlaceholderProxy = proxy('/api', {
  target: 'https://tcc-si.herokuapp.com',
  changeOrigin: true,
  logLevel: 'debug'
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
