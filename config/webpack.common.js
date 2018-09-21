const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopywebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    output: {
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },
    resolve: {
        alias: {
            '$': 'jquery',
            'jQuery': 'jquery'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TDD Challenge',
            meta: {
                viewport: 'width=device-width, initial-scale=1'
            }
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopywebpackPlugin([ { from: path.join('src', 'assets'), to: 'assets' } ]),
    ],
    module: {
        rules: [
            // use the html loader
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {loader: 'html-loader'}
            },
            // use the css loaders (first load the css, then inject the style)
            {
                test: /\.css$/,
                use: [
                    'style-loader/url',
                    'file-loader'
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
                use: [ 'url-loader' ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
            }
        }
    }
};