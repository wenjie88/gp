var htmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var path = require('path')


module.exports = {
    entry: {inject:['babel-polyfill','./src/inject/app.js'],login:'./src/inject/login.js'},
    output: {
        path: __dirname + '/dist',
        // filename: '[name]-[hash:5].js'
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body',
            // title: 'webpack is main'
        }),
        // new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    devServer: {
        historyApiFallback: true,
        noInfo: true
    }
}

if (process.env.NODE_ENV === 'production') {
    // module.exports.devtool = '#soucre-map'

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: { warnings: false },
            output: { comments: false },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        
    ])
}