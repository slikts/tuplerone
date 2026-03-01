import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/tuplerone.ts'],
  format: ['esm'],
  globalName: 'tuplerone',
  dts: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
  exports: {
    devExports: true,
  },
});
