exports.getCustomerPage = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1, //客户id
          name: '神器宝贝小智a', //客户名称
          type: 1, //客户类型
          districtType: '省级', // 区域类型
          businessType: '事项', // 业务类型
          relation: '重找客户', //客户关系
          status: 1, // 跟进状态
          marketManager: '张培欲', // 市场经理
          lastTime: '7', // 距离上次拜访已有(全部客户没有但依然存着)
          tags: ['数据基因', '智慧城市'] //客户标签
        },
        {
          id: 2, //客户id
          name: '神器宝贝小智a', //客户名称
          type: 2, //客户类型
          districtType: '省级', // 区域类型
          businessType: '事项', // 业务类型
          relation: '重找客户', //客户关系
          status: 2, // 跟进状态
          marketManager: '张培欲', // 市场经理
          lastTime: '7', // 距离上次拜访已有(全部客户没有但依然存着)
          tags: ['数据基因', '智慧城市'] //客户标签
        },
        {
          id: 3, //客户id
          name: '神器宝贝小智a', //客户名称
          type: 1, //客户类型
          districtType: '省级', // 区域类型
          businessType: '事项', // 业务类型
          relation: '重找客户', //客户关系
          status: 3, // 跟进状态
          marketManager: '张培欲', // 市场经理
          lastTime: '7', // 距离上次拜访已有(全部客户没有但依然存着)
          tags: ['数据基因', '智慧城市'], //客户标签
          phoneNum: '18423317071', //手机号码
          responsibleDepartment: '技术部', //负责部门
          describe: {
            url: 'www.govmade.com', //单位网址
            function: '前端', //单位职能
            address: '重庆', //单位地址
            otherDes: 'hello world' //其他说明
          } //客户描述
        }
      ],
      total: 3,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
}
exports.getCustomerById = async function(ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      id: '3',
      name: '神器宝贝小智a',
      type: [1, 2],
      districtType: 1,
      businessType: [1, 2, 3],
      specificType: '研究、规划、评测、整体解决方案等',
      relation: 1,
      status: 2,
      marketManager: '张培欲',
      lastTime: '7',
      tags: ['数据基因', '智慧城市'],
      phoneNum: '18423317071',
      respDept: '技术部',
      url: 'www.govmade.com',
      function: '前端',
      address: '重庆',
      otherDesc: 'hello world'
    }
  }
}
exports.fetchDetail = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      id: 1,
      name: '客户全景'
    }
  }
}

exports.create = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: []
  }
}

exports.update = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: []
  }
}

exports.delete = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: []
  }
}

// 方案
exports.fetchProgramme = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          name: '20180909浙江省办公室项目方案0001号文件',
          downLoadUrl: 'asdsd21323awe.xml'
        },
        {
          id: 2,
          name: '20180909浙江省办公室项目方案0002号文件',
          downLoadUrl: 'asdsd21323awe.xml'
        },
        {
          id: 3,
          name: '20180909浙江省办公室项目方案0003号文件',
          downLoadUrl: 'asdsd21323awe.xml'
        }
      ],
      total: 2,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
}

// 联系人
exports.fetchContartList = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          name: '马云',
          zhiwu: '市场经理',
          duiying: '马氏集团'
        },
        {
          id: 2,
          name: '丁磊',
          zhiwu: '总经理',
          duiying: '养殖场'
        },
        {
          id: 3,
          name: '马化腾',
          zhiwu: '员工',
          duiying: '幼儿园'
        }
      ],
      total: 2,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1
    }
  }
}

exports.createContact = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: []
  }
}

exports.updateContact = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: []
  }
}

exports.deleteContact = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: []
  }
}
