'use strict'

var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: [
		'./client'
	],
	output: {
		path: __dirname + '/dist/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
				}
			}
		]
	},
	resolve: {
		extensions: ['', '.', '.js', '.jsx']
	}
}