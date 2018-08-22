const webpack = require('webpack');
const autoprefixer = require('autoprefixer')

module.exports = {
	entry: ["babel-polyfill", "./debug.js"],
	output: {
		path: __dirname + '/../'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: [ [ 'env', { modules: false, loose: true	} ] ]
				}
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader', 'css-loader',
					{ loader: 'postcss-loader', options: { plugins: () => [autoprefixer] } }
				]
			},
			{
				test: /\.less$/,
				loaders: [
					'style-loader', 'css-loader', 'less-loader',
					{ loader: 'postcss-loader', options: { plugins: () => [autoprefixer] } }
				]
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader', 'css-loader', 'sass-loader',
					{ loader: 'postcss-loader', options: { plugins: () => [autoprefixer] } }
				]
			},
			{
				test: /\.(html|ejs)$/, 
				loaders: [ 'ejs-loader' ]
			},			
			{
				test: /\.(csv|tsv)$/,
				loaders: ['dsv-loader']
			},
			{
				test: /\.(png|jpeg|jpg|gif)$/,
				loaders: ['url-loader?limit=10000']
			}
		]
	}
};