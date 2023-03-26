import fs from 'fs';
// plugins
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import progress from 'rollup-plugin-progress';

const input = [
  './src/index.ts',
  ...getFiles('./src'),
  ...getFiles('./src/actions'),
  ...getFiles('./src/operators'),
];

const external = [];

const plugins = [
  json(),
  resolve(),
  commonjs(),
  terser(),
  progress({
    clearLine: false,
  }),
];

function getFiles(entry, extensions = ['.ts', '.tsx'], excludeExtensions = []) {
  let fileNames = [];
  const dirs = fs.readdirSync(entry);

  dirs.forEach(dir => {
    const path = `${entry}/${dir}`;

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ];

      return;
    }

    if (
      !excludeExtensions.some(exclude => dir.endsWith(exclude)) &&
      extensions.some(ext => dir.endsWith(ext))
    ) {
      fileNames.push(path);
    }
  });

  return fileNames;
}

/** @type {import('rollup').RollupOptions} */
const options = [
  // ESM
  {
    input,
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      assetFileNames({ name }) {
        return name?.replace(/^src\//, '') ?? '';
      },
      exports: 'named',
    },
    external,
    plugins: [
      ...plugins,
      typescript({
        tsconfig: 'tsconfig.esm.json',
        declaration: true,
        declarationDir: 'dist/esm',
      }),
    ],
  },
  // CJS
  {
    input,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: '[name].cjs',
      assetFileNames({ name }) {
        return name?.replace(/^src\//, '') ?? '';
      },
      exports: 'named',
    },
    external,
    plugins: [
      ...plugins,
      typescript({
        tsconfig: 'tsconfig.cjs.json',
        declaration: true,
        declarationDir: 'dist/cjs',
      }),
    ],
  },
];

export default options;
