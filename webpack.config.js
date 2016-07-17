var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: __dirname + '/src',
	entry: './apirequest.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist',
		filename: 'apirequest.js',
		library: 'apirequest',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	]
};
