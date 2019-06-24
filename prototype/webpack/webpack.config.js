const path = require('path');
const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');
// const autoprefixer = require('autoprefixer')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./debug.js",
	output: {		
		path: path.resolve(__dirname, '..') // move one up since webpack config files in a subdirectory
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			},
			{
				test: /\.txt$/,
				use: 'raw-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
				options: {
					url: true
				}
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
			},	
			{
				test: /\.scss$/,
				use: {
					loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
					options: {
						includePaths: ['./node_modules/node-sass']
					}
				}				
			},
			{
				test: /\.(html|ejs)$/, 
				use: 'ejs-loader'
			},
			{
				test: /\.(c|d|t)sv$/,
				use: 'dsv-loader'
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: 'file-loader',
				options: {
			  		outputPath: 'img'
				}
			}
		]
	},
	plugins: [
		new webpack.ProgressPlugin(),
		require('autoprefixer')
	]	
};