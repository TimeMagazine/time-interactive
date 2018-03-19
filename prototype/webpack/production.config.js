const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const base = require('./base.config');

module.exports = merge(base, {
	output: {
		filename: "script-min.js"
	},
	plugins: [
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			uglifyOptions: {
				compress: false,
				ecma: 6,
				mangle: true
			},
			sourceMap: true
		})
	]
});