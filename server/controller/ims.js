exports.getSystemMessagePage = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1, //客户id
          name: '神器宝贝小智a', //客户名称
          type: 1, //客户类型
          time: '2019-01-01 12:12:12', // 区域类型
        },
        {
          id: 2, //客户id
          name: '神器宝贝小智a', //客户名称
          type: 1, //客户类型
          time: '2019-01-01 12:12:12', // 区域类型
        },
        {
          id: 3, //客户id
          name: '神器宝贝小智a', //客户名称
          type: 1, //客户类型
          time: '2019-01-01 12:12:12', // 区域类型
        },
      ],
      total: 3,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
}