const pkg = require('./package.json')
const isProduction = process.env.NODE_ENV === 'production'

const proxyUrl = 'http://127.0.0.1:7001'

module.exports = {
	assetsDir: 'static',
	publicPath: '/',
	outputDir: 'dist',
	indexPath: './index.html',
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
				// pathRewrite: {
				// 	'^/node': '/',
				// },
			},
			'^/cdn': {
				target: proxyUrl,
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/cdn': '/',
				// },
			},
			'^/server': {
				target: proxyUrl,
				changeOrigin: true,
				// pathRewrite: {
				// 	'^/server': '/',
				// },
			},
		},
	},
	css: {
		sourceMap: false,
		extract: true,
	},
	configureWebpack: config => {
		config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']
		config.externals = [
			{
				vue: 'Vue',
				'vue-router': 'VueRouter',
				echarts: 'echarts',
			},
		]
	},
	chainWebpack: config => {
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
