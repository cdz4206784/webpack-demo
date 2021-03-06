const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        // main: './src/main.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack demo',
            filename: 'index.html',
            template: './src/index.html',
            inject: 'head',
            favicon: './assets/img/favicon.ico',
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            cache: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css'
        }),
        // new CssMinimizerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    optimization: {
        minimize: true,  //压缩js
        minimizer: [
            new CssMinimizerPlugin()    //压缩css 或写在plugins中
        ],
        splitChunks: {
            chunks: 'all',   //提取公共文件(默认文件大于3k进行分离)
            minSize: 0
        }
    }
}