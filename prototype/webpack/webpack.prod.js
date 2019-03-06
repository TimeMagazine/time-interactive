const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	output: {
		filename: "script-min.js"
	},
	mode: 'production'
});