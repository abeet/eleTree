const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'eleTree.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
              test: /\.(css)$/,
              use: ["style-loader", "css-loader"]},
            {
              test: /\.tsx?$/,
              use: {
                loader: 'ts-loader'
              }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        "plugins": [
                            "@babel/plugin-syntax-dynamic-import"
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ],
        alias: {
            "@": path.join(__dirname, '../src/')
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../src/public'), to: '../dist/' },
                { from: path.resolve(__dirname, '../src/public'), to: '../docsBuild/.vuepress/public/eleTree/' },
            ],
        }),
    ],
}
