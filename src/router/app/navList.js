const navList = [
  {
    id: '/app/index',
    name: '首页',
  }, {
    id: '/app/person',
    name: '国脉人',
  }, {
    id: '/app/resource',
    name: '资源',
    show: 'show',
  }, {
    id: '/app/products',
    name: '产品',
  }, {
    id: '/app/project',
    name: '项目',
  }, {
    id: '/app/college',
    name: '学堂',
  }, {
    id: '/app/brand',
    name: '品牌',
  }, {
    //   id: '/app/news',
    //   name: '要闻',
    // }, {
    id: '/app/data',
    name: '数据',
    // }, {
    //   id: '/app/wealth',
    //   name: '财富',
  },
]
const navPathList = navList.map(m => m.id)
export { navList, navPathList }