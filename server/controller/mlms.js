exports.getTableData = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      total: 4, size: 20, current: 1, searchCount: true, pages: 1,
      records: [
        {id: 1, name: '名称1'},
        {id: 2, name: '名称2'},
        {id: 3, name: '名称3'},
        {id: 4, name: '名称4'}
      ]
    }
  }
}

exports.postData = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: []
  }
}

exports.deleteById = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: []
  }
}
