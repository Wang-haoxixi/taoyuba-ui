var express = require('express')
var proxyMiddleWare = require('http-proxy-middleware')
var app = require('express')()
var http = require('http')
var proxyPath = 'http://115.233.227.46:20126' //目标后端服务地址
var proxyOption = {
  target: proxyPath,
  changeOrigoin: true,
  ws: true,
  pathRewrite: { '^/api': '/' },
}
var server = http.createServer(app)
server.listen(10020)
app.use(express.static('./dist'))
app.use('/api', proxyMiddleWare(proxyOption))
// app.get('/', function(req, res) {
//   res.sendfile(__dirname + '/index.html')
// })
