const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: "script-min.js"
	}
});