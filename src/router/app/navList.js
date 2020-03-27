const navList = [
  {
    id: '/',
    name: '首页',
  }, {
    id: '/ships/manage',
    name: '渔船',
  }, {
    id: '/admin/bostMan',
    name: '船员',
    show: 'show',
  }, {
    id: '/admin/list',
    name: '船东',
  }, {
    id: '/account/standing',
    name: '一船一档',
  }, {
    id: '/tmlms_spa/contract_list',
    name: '合同',
  }, {
    id: '/hrms_spa/recruit_list',
    name: '招聘',
  }, {
    //   id: '/app/news',
    //   name: '要闻',
    // }, {
    // id: '/app/data',
    // name: '数据',
    // // }, {
    //   id: '/app/wealth',
    //   name: '财富',
  },
]
const navPathList = navList.map(m => m.id)
export { navList, navPathList }