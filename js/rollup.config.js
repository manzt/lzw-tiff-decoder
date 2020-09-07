import rust from '@wasm-tool/rollup-plugin-rust';

export default {
  input: './src.js',
  output: [
    {
      file: './index.mjs',
      format: 'es',
      exports: 'default'
    },
    {
      file: './index.cjs',
      format: 'cjs',
      exports: 'default'
    },
  ],
  plugins: [
    rust({ inlineWasm: true }),
  ],
};
