const path = require('path')
const { merge } = require('webpack-merge')

const config = {
    mode: 'production',
    entry: './src/snake.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'snake.js',
        library: 'snake'
    }
}

module.exports = merge([
    config,
    require('./webpack.babel.js')
])
