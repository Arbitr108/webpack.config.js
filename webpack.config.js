"use strict";
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLESS = new ExtractTextPlugin({
    filename: 'assets/css/default.css',
    allChunks: true,
    disable: process.env.NODE_ENV === "development"
});
const EXCLUDE = /node_modules/;

const config = {
    entry: {
            javascript: './resources/assets/js/main_menu.js'
        },
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: EXCLUDE,
                use: 'babel-loader'},
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: ([
        extractLESS
    ]),
};

module.exports = config;