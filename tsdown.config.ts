import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/tuplerone.ts'],
  format: ['es', 'cjs', 'umd'],
  globalName: 'tuplerone',
  dts: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
});
