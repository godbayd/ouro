const path = require('path')
const Hwp = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const config = {
    mode: 'development',
    context: path.resolve(__dirname, './'),
    entry: './index.js',
    devtool: 'inline-source-map',
    module: {   
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        port: 3000,
        stats: 'minimal'
    },
    plugins: [
        new Hwp({
            template: './index.html'
        })
    ]
}

module.exports = merge([
    config,
    require('../webpack.babel.js')
])
