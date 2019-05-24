// 配置编译环境和线上环境之间的切换

let baseUrl = '/api'
// 最后一个icon URL只要替换即可, 无需添加
const iconfontVersion = [
  '567566_qo5lxgtishg',
  '599693_0b5sleso3f1j1yvi',
  '667895_5kwuxgtttcl',
  '752650_3gt983x4g8c',
  '809621_m3013tqvw7',
]
const iconfontUrl = '//at.alicdn.com/t/font_$key.css'
const codeUrl = `${baseUrl}/code`
const performanceDomain = '//perf.limonplayer.cn/api/v1/report/web'
const performanceAppId = '2FAE447D49E40C2DC5E893F6538CBF21'
const env = process.env
if (env.NODE_ENV === 'development') {
  baseUrl = '/api' // 开发环境地址
} else if (env.NODE_ENV === 'production') {
  baseUrl = '/api' // 生产环境地址
} else if (env.NODE_ENV === 'test') {
  baseUrl = '/api' // 测试环境地址
}
export {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  env,
  performanceDomain,
  performanceAppId,
}
