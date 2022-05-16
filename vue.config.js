const pkg = require('./package.json')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const proxyUrl = 'http://127.0.0.1:7001'

const resolve = dir => {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath: '/',
	productionSourceMap: false,
	lintOnSave: false,
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		historyApiFallback: true,
		disableHostCheck: true,
		proxy: {
			'^/node': {
				target: proxyUrl,
				changeOrigin: true,
			},
			'^/cdn': {
				target: proxyUrl,
				changeOrigin: true,
			},
			'^/server': {
				target: proxyUrl,
				changeOrigin: true,
			},
		},
	},
	css: {
		sourceMap: false,
		extract: true,
	},
	configureWebpack: config => {
		config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']
	},
	chainWebpack: config => {
		config.resolve.alias.set('@', resolve('src'))
		config.plugin('define').tap(args => {
			args[0]['process.env'].version = JSON.stringify(pkg.version)
			return args
		})
		config.module.rule('vue').use('iview').loader('iview-loader').options({ prefix: false })
		config.module
			.rule('view-design')
			.test(/view-design.src.*?js$/)
			.use('babel')
			.loader('babel-loader')
			.end()
		if (isProduction) {
			config.plugins.delete('prefetch')
			config.plugins.delete('preload')
		} else {
			config.resolve.symlinks(true)
		}
	},
}
