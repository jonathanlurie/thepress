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
      //execute(`echo "BUILD FOR DEV"`),
      //execute(`rm docs/js/*`),
      //execute(`cp dist/* docs/js/`)
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
      execute(`cp dist/* docs/js/`),
      execute(`rm samples/site.zip; cp dist/* docs/js/; cp -r docs site; rm site/CNAME; zip -r samples/site.zip site; rm -rf site`),
      // execute(`cp dist/* docs/js/; rm samples/site.zip; cp dist/* docs/js/; cp -r docs site; rm site/CNAME; zip -r samples/site.zip site; rm -rf site`)
    ]
  })
}

export default configurations
