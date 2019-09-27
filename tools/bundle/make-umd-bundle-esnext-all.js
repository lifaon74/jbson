const rollupBundle = require('./rollup-bundle');

rollupBundle({
  input: 'dist/esnext_for_rollup/public.js',
  dest: 'dist/global/jbson.esnext.umd.js',
});
