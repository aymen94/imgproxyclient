const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commons = {
    mode: 'production',
    entry: {
        main: './src/index.ts'
    },
    resolve: {
        extensions: [".ts"],
        fallback: {
            "crypto": false,
            "buffer": false,
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
}

const clientConfig = Object.assign({}, {
    target: 'web',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.browser.js',
        libraryTarget: "umd",
        globalObject: 'this',
    },
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require("buffer/").Buffer,
        }
    }
    //…
}, commons);

module.exports = [clientConfig];
