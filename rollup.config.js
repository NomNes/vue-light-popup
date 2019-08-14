import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import cjs from 'rollup-plugin-commonjs'
import node from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import buble from 'rollup-plugin-buble'
const pkg = require('./package.json')
const version = process.env.VERSION || pkg.version
const name = process.env.name || pkg.name
const author = pkg.author.name
const banner =
  `/*!
  * ${name} v${version}
  * (c) ${new Date().getFullYear()} ${author}
  * @license MIT
  */`

export default [
  {
    file: `dist/${name}.min.js`,
    format: 'umd'
  },
  {
    file: `dist/${name}.common.js`,
    format: 'cjs',
    vue: { template: { optimizeSSR: true } },
    external: ['vue', 'disable-body-scroll']
  },
  {
    file: `dist/${name}.esm.js`,
    format: 'esm',
    external: ['vue', 'disable-body-scroll']
  },
  {
    file: `dist/${name}.esm.browser.min.js`,
    format: 'es',
    transpile: false,
    external: ['vue', 'disable-body-scroll']
  }
].map(genConfig)

function genConfig (opts) {
  const config = {
    input: 'src/index.ts',
    plugins: [
      node({
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      }),
      cjs(),
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true
      }),
      vue(opts.vue),
      replace({
        __VERSION__: version
      })
    ],
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'VueLightPopup'
    },
    external: opts.external
  }

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  return config
}
