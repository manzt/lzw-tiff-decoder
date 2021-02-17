import rust from '@wasm-tool/rollup-plugin-rust';
import { terser } from 'rollup-plugin-terser';

/* tiny plugin to resolve `import.meta.url` to an empty string ("").
 *
 * `rollup-plugin-rust` adds `import.meta.url`, which breaks webpack.
 * Since we inline the wasm, relative imports are skipped altogether
 * and we just need to eliminate `import.meta` to avoid breaking bundlers.
 */
const resolveImportMetaEmpty = () => ({
  name: 'resolve-meta-url',
  resolveImportMeta: (property) => {
    if (property === 'url') return `""`;
  },
});

export default {
  input: './index.js',
  output: [
    { file: './index.mjs', format: 'es' },
    { file: './index.cjs', format: 'cjs' },
  ],
  plugins: [
    rust({ inlineWasm: true }),
    resolveImportMetaEmpty(),
    terser(),
  ],
};
