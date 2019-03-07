import pkg from './package.json'
import { terser } from "rollup-plugin-terser"
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import commonjs from 'rollup-plugin-commonjs'
import execute from 'rollup-plugin-execute'


const configurations = [
  // UMD
  {
    input: pkg.entry,
    output: {
      file: pkg.unpkg,
      name: pkg.name,
      sourcemap: true,
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs({ include: 'node_modules/**' }),
      globals(),
      builtins(),
      execute(`cp ${pkg.unpkg} docs/js/`)
    ]
  },

]


// Adding the minified umd bundle
if (process.env.NODE_ENV === "production") {
  configurations.push(
  {
    input: pkg.entry,
    output: {
      file: pkg.unpkg.replace(".js", '.min.js'),
      name: pkg.name,
      sourcemap: false,
      format: 'umd',
    },
    plugins: [
      resolve(),
      commonjs({ include: 'node_modules/**' }),
      globals(),
      builtins(),
      terser(),
      execute(`cp ${pkg.unpkg} docs/js/`)
    ]
  })
}

export default configurations
