const fs = require('fs');

exports.readFile = (resolvePath) => {
  // 创建可读流
  let data = [];
  return new Promise((res, rej) => {
    const readerStream = fs.createReadStream(resolvePath);
    readerStream.on("data", function (chunk) {
      data.push(chunk);
    });
    readerStream.on("end", function () {
      const finalData = Buffer.concat(data); // 合并Buffer
      res(finalData);
    });
  });
}
