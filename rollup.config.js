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
      include: 'bin/enigma-machine.js',
    }),
  ],
}

export default [
  {
    input: 'source/cli.ts',
    output: [
      {
        format: 'cjs',
        file: 'bin/enigma-machine.js',
      },
    ],
    ...common,
  },
  {
    input: 'source/index.ts',
    output: [
      {
        format: 'cjs',
        file: 'lib/enigma-machine.cjs.js',
      },
      {
        file: 'lib/enigma-machine.esm.js',
        format: 'esm',
      },
      {
        file: 'lib/enigma-machine.iifee.js',
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
