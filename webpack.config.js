const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
});

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            './src/css/main-page.sass',
            './src/index.js',
        ],
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'src/built'),
    },

    resolve: {
        extensions: ['.js'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.xml/,
                loader: 'tp-fest-loader',
            },
            {
                test: /\.sass$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader',
                    }, {
                        loader: 'sass-loader',
                    }],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.(png|jpg|gid|svg|ico)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                },
            },
        ],
    },
    plugins: [
        extractSass,
    ],
};
