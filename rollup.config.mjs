import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';

const isDev = process.argv.includes('--watch');

const common = {
  input: 'src/createAsyncAwaitActionMiddleware.mjs',
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


export default [
  {
    ...common,
    output: {
      file: 'dist/createAsyncAwaitActionMiddleware.mjs',
      format: 'es',
      sourcemap: isDev
    }
  },
  {
    ...common,
    output: {
      file: 'dist/createAsyncAwaitActionMiddleware.js',
      format: 'umd',
      name: 'createAsyncAwaitActionMiddleware',
      sourcemap: isDev
    }
  }
];
