const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'dist/icons/[name].[ext]'
                    }
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],
    resolve: {
        fallback: {
            http: require.resolve("stream-http"),
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            os: require.resolve("os-browserify/browser"),
            url: require.resolve("url"),
            assert: require.resolve("assert"),
            vm: require.resolve("vm-browserify"),
            fs: false,
            querystring: require.resolve("querystring-es3"),
        },
    },
}