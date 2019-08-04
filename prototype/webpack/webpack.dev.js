const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
	output: {
		filename: "script.js"
	},
	mode: 'development',
	devtool: 'inline-source-map'
});