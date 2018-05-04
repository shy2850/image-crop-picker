const typescript = require('rollup-plugin-typescript2')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
module.exports = [{
    input: 'src/index.tsx',
    plugins: [
        typescript(),
        nodeResolve(),
        commonjs()
    ],
    output: {
        sourcemap: true,
        file: 'index.js',
        format: 'iife'
    }
}]
