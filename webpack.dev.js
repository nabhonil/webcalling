const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { EnvironmentPlugin } = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 3000,
        hot: true,
        open: true
    },
    plugins: [
        new EnvironmentPlugin({
            DEBUG: "",
        }), 
    ],
});