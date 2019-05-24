const utils = require('./config/utils')
const devServer = require('./config/devServer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: isProduction ? 'src/main.js' : 'src/main.dev.js',
  //     // 模板来源
  //     template: isProduction ? 'public/index.html' : 'public/index.dev.html',
  //   },
  // },
  // configureWebpack: {
  //   externals: isProduction
  //     ? {
  //       vue: 'Vue',
  //       vuex: 'Vuex',
  //       'vue-router': 'VueRouter',
  //       'element-ui': 'ELEMENT',
  //       '@smallwei/avue/lib/index.js': 'AVUE',
  //     }
  //     : undefined,
  // },
  chainWebpack: config => {
    // config.resolve.symlinks(true)
    // config.plugin('preload').tap(options => {
    //   options[0] = {
    //     rel: 'preload',
    //     as (entry) {
    //       if (/\.css$/.test(entry)) return 'style'
    //       if (/\.(woff||ttf))$/.test(entry)) return 'font'
    //       if (/\.png)$/.test(entry)) return 'image'
    //       return 'script'
    //     },
    //     include: 'allAssets',
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/],
    //   }
    // })
    // config
    //   .entry('index')
    //   .add('babel-polyfill')
    //   .end()
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      // 压缩代码
      config.optimization.minimize(true)
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all',
      })
      // 生产环境注入cdn
      // config.plugin('html')
      //   .tap(args => {
      //     args[0].cdn = cdn;
      //     return args;
      //   });
    }
    config.plugin('define').tap(definitions => {
      definitions[0] = Object.assign(definitions[0], {
        BUILD_PROJECT: JSON.stringify(utils.getProject()),
        BUILD_TEAM_NAME: JSON.stringify(utils.getProjectTeam()),
        BUILD_PRO_NAME: JSON.stringify(utils.getProjectName()),
        BUILD_VER_TAG: JSON.stringify(utils.getCurrentTag()),
        BUILD_GIT_HASH: JSON.stringify(utils.getGitHash()),
        BUILD_PRO_DESC: JSON.stringify(utils.getProjectDesc()),
        BUILD_TIME: Date.parse(new Date()),
      })
      return definitions
    })
    return config
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      // config.externals = {
      //   'vue': 'Vue',
      //   'vuex': 'Vuex',
      //   'vue-router': 'VueRouter',
      //   'axios': 'axios'
      // }
      // 为生产环境修改配置...
      config.plugins.push(
        //生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
          sourceMap: false,
          parallel: true,
        })
      )
    } else {
      // 为开发环境修改配置...
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    // sourceMap: false,
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#BA1B21',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
  },
  // 配置转发代理
  devServer: {
    host: devServer.host, // can be overwritten by process.env.HOST
    open: true,
    port: devServer.port, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    proxy: devServer.proxy,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  pwa: {
    name: 'govmade-iep-2.0',
    themeColor: '#BA1B21',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
}
