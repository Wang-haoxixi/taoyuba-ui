
// IP PORT 配置
const baseUrl = process.env.BASEURL
// 设置代理
// netsh interface portproxy add v4tov4 listenport=9999 connectaddress=192.168.1.154 connectport=9999

// 显示所有代理
// netsh interface portproxy show all

// 删除配置: 本机的监听端口为10022,10022端口接受的连接地址为"*",使用的协议为tcp,当前仅支持TCP协议。
// netsh interface portproxy delete v4tov4 listenport=9999 listenaddress=* protocol=tcp
if (process.env.MOCK === 'true') {
  // MOCK代理转发表
  console.log(`MOCK Proxy forwarding table, Proxy address1: <${baseUrl}>`)
  exports.proxy = {
    '/api': {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  }
} else {
  // 实际代理转发表
  console.log(`Develop Proxy forwarding table, Proxy address2: <${baseUrl}>`)
  exports.proxy = {
    '/api': {
      target: baseUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    '/act': {
      target: baseUrl,
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/act': '/act',
      },
    },
  }
}
// 改成本地 IP
exports.host = process.env.HOST

exports.port = process.env.PORT
