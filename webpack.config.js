// Inspired from https://github.com/adrianhall/grumpy-wizards
var path = require('path');
var config = require('config');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var jsxLoader = 'react-hot!babel-loader';

var configuration = {
    devtool: 'source-map',
    entry: {
        app: ['babel-polyfill', './app/index.js'],
        vendor: [
            "lodash",
            "react",
            "react-dom",
            "react-router",
            "redux",
            "react-redux",
            "redux-promise",
            "redux-actions",
            "react-tap-event-plugin",
            "superagent",
            "material-ui/CircularProgress",
            "material-ui/Dialog",
            "material-ui/DropDownMenu",
            "material-ui/FlatButton",
            "material-ui/FontIcon",
            "material-ui/IconButton",
            "material-ui/IconMenu",
            "material-ui/MenuItem",
            "material-ui/RaisedButton",
            "material-ui/TextField",
            "material-ui/svg-icons/navigation/more-vert",
        ],
    },
    module: {
        preLoaders: [
            {
                test: /\.js|\.jsx$/,
                loader: 'eslint',
                exlude: /node_modules/,
            }
        ],
        loaders: [
            {
                test: /\.js|\.jsx$/,
                loader: jsxLoader,
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style', // The backup style loader
                    'css?-url&-import&sourceMap!sass?sourceMap'
                ),
                exclude: /node_modules/,
            }
        ]
    },
    sassLoader: {
        includePaths: ['sass']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            app: 'app',
            repos: 'app/repos',
            common: 'app/common',
            layout: 'app/layout'
        },
        extensions: ['', '.js', '.jsx', '.scss']
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin({ mangle: false, compress: { warnings: false }}),
    ],
    node: {
        fs: "empty"
    },
    target: 'web',
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};

module.exports = configuration;