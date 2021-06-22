const path = require('path')
const Hwp = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
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
            template: './src/index.html'
        })
    ]
}