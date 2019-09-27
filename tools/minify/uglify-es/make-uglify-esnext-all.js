const makeUglify = require('./make-uglify');

makeUglify('dist/global/jbson.esnext.umd.js', {
  compress: {
    inline: false
  },
});
