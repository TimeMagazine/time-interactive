const path = require('path');
const webpack = require('webpack');
const postcssPresetEnv = require('postcss-preset-env');

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
						plugins: [ '@babel/plugin-transform-runtime' ]
					}
				}
			},
			{
				test: /\.txt$/,
				use: 'raw-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: true,
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [ postcssPresetEnv() ]
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: true,
							importLoaders: 1
						}
					},
					'less-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [ postcssPresetEnv() ]
						}
					}
				]
			},	
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: true,
							importLoaders: 1
						}
					},
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [ postcssPresetEnv() ]
						}
					}
				]
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
				use: {
					loader: 'file-loader',
					options: {
				  		outputPath: 'img'
					}
				}
			}
		]
	},
	plugins: [
		new webpack.ProgressPlugin()
	]	
};