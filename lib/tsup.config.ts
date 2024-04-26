import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  target: 'es2018',
  format: ['esm', 'cjs'],
  minify: true,
  dts: true,
});
