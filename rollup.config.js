import shebang from 'rollup-plugin-add-shebang'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const common = {
  external: ['crypto'],
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
        },
      },
      exclude: './source/**/*.test.ts',
    }),
    shebang({
      include: 'bin/3n16m4-m4ch1n3.js',
    }),
  ],
}

export default [
  {
    input: 'source/cli.ts',
    output: [
      {
        format: 'cjs',
        file: 'bin/3n16m4-m4ch1n3.js',
      },
    ],
    ...common,
  },
  {
    input: 'source/index.ts',
    output: [
      {
        format: 'cjs',
        file: 'lib/3n16m4-m4ch1n3.cjs.js',
      },
      {
        file: 'lib/3n16m4-m4ch1n3.esm.js',
        format: 'esm',
      },
      {
        file: 'lib/3n16m4-m4ch1n3.iifee.js',
        format: 'iife',
        name: 'enigma',
        globals: {
          crypto: 'Crypto',
        },
      },
    ],
    ...common,
  },
]
