const plugins = [];
if(['production', 'prod'].includes(process.env.NODE_ENV)) {
 plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        polyfills: [
          'es6.promise',
          'es6.symbol',
          'es6.array.iterator',
          'es7.promise.finally',
        ],
      },
    ],
  ],
  plugins: plugins
  // plugins: [
  //   ['import', { 'libraryName': 'ant-design-vue', 'libraryDirectory': 'es', 'style': 'css' }],
  // ],
  // presets: [["@vue/app",{"useBuiltIns": "entry"}]],
  // plugins: []
}
