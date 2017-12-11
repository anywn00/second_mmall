/*
* @Author: 第九
* @Date:   2017-12-08 11:17:25
* @Last Modified by:   第九
* @Last Modified time: 2017-12-11 15:52:24
*/

//将样式抽取出来为独立的文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//html抽取
var HtmlWebPackPlugin = require("html-webpack-plugin");
// webpack
var webpack = require("webpack");

// 获取 package.json script属性下 的start属性（环境变量）
var webpack_nev = process.env.webpack_nev;

var getHtmlConfig = function(name,title){
	return {
		title : title,
		template : './src/view/'+ name +'.html',
		filename : 'view/'+ name +'.html',
		inject : true,
		hash : true,
		chunks : ['common',name]
	}
}
var config = {
	entry : {
		'common' 	: ['./src/page/common/index.js'],
		'user-login': ['./src/page/user-login/index.js']
	},
	output: {
		path : './dist',
		publicPath: '/dist',
		filename: 'js/[name].js'
	},
	module: {
		loaders: [
			{
				test:/\.css$/,
				loader:ExtractTextPlugin.extract("style-loader","css-loader")
				//loader:"style-loader!css-loader"
			},
			{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
				loader: 'url-loader?limit=100&name=resource/[name].[ext]' 
			},
			{test : /\.string$/,loader: 'html-loader'}
		]
	},
	plugins:[
		//把css单独打包到文件里
		new ExtractTextPlugin('css/[name].css'),
		//引用公共js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename : 'js/base.js'
		}),
		//html模板的处理
     	new HtmlWebPackPlugin(getHtmlConfig('user-login','登陆'))
	]
};

module.exports = config;