var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
	context: __dirname,
	entry: './books/static/main.js',
	output: {
      path: path.resolve('./books/static/bundles/'),
      filename: "[name]-[hash].js",
  },
	devServer: {
		inline: true,
		port: 3334
	},
	plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
	 ],
	module: {
		loaders: [
		  {
		  	test: /\.js$/,
		  	exclude: /node_modules/,
		  	loader: 'babel-loader',
		  	query: {
		  		presets: ['es2015', 'react']
		  	}
		  }
		]
	},
	resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
}