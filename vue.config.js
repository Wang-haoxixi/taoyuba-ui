const utils = require('./config/utils')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
let devServer
try {
  devServer = require('./config/devServer.local')
} catch (e) {
  devServer = require('./config/devServer')
}
let baseUrl = '/'
// const IS_PRODUCTION = process.env.NODE_ENV === 'production'
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'index.html',
    },
  },
  runtimeCompiler: true,
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      // 'element-ui': 'ELEMENT',
      '@smallwei/avue/lib/index.js': 'AVUE',
    }
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        })
      )
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        BUILD_TIME: Date.parse(new Date()),
        BUILD_GIT_HASH: JSON.stringify(utils.getGitHash()),
        BUILD_PRO_NAME: JSON.stringify(utils.getProjectName()),
        BUILD_VER_TAG: JSON.stringify(utils.getCurrentTag()),
        BUILD_PRO_DESC: JSON.stringify(utils.getProjectDesc()),
      })
      return definitions
    })
    config
      .plugin('webpack-context-replacement')
      .use(require('webpack').ContextReplacementPlugin, [
        /moment[/\\]locale$/,
        /zh-cn/,
      ])
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  transpileDependencies: ['avue-plugin-transfer'],
  // 配置转发代理
  devServer: {
    host: devServer.host, // can be overwritten by process.env.HOST
    open: false,
    port: devServer.port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: devServer.proxy,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  pwa: {
    // 配置 workbox 插件
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
  publicPath: baseUrl,
}
