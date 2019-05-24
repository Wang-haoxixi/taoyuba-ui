const path = require('path');
const fileStream = require('../file-stream')

exports.getCode = async function (ctx) {
  const realPath = path.resolve(__dirname, '../resource/code.jpg')
  const res = await fileStream.readFile(realPath);
  // res 为 Buffer流
  if (res) {
    ctx.type = "application/octet-stream";
    ctx.body = res;
  }
}

