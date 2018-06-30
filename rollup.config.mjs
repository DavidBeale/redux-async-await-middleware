import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';

const isDev = process.argv.includes('--watch');

export default {
  input: 'src/createAsyncAwaitActionMiddleware.mjs',
  output: {
    file: 'dist/createAsyncAwaitActionMiddleware.js',
    format: 'es',
    sourcemap: isDev
  },
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js', '.mjs']
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: !isDev
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()// ,
    // (isDev && browsersync({
    //     server: 'dist'
    // }))
  ],
  watch: {
    include: 'src/**/*'
  }
};
