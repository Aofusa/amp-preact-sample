const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    return {
        entry: "./src/index.tsx",
        output: {
            path: __dirname + '/dist',
            filename: "./js/bundle.js"
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ["ts-loader"]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                template: "./src/html/index.html",
                filename: "index.html"
            })
        ],

        devServer: {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080/",
                "AMP-Access-Control-Allow-Source-Origin": "http://localhost:8080/",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD, PUT",
                "Access-Control-Allow-Credentials": "true"
            },
            contentBase: path.join(__dirname, "./dist"),
            watchContentBase: true,
        }
    }
}