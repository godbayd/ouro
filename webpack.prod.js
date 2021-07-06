const path = require('path')
const { merge } = require('webpack-merge')

const config = {
    mode: 'production',
    entry: './src/ouro.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'ouro.js',
        globalObject: 'this',
        library: {
            name: 'ouro',
            type: 'umd'
        }
    }
}

module.exports = merge([
    config,
    require('./webpack.babel.js')
])
