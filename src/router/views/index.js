import Layout from '@/page/index/'
export default [
  {
    path: '/info',
    component: Layout,
    redirect: '/info/show',
    children: [{
      path: 'password',
      name: '修改密码',
      component: () => import('@/views/info/password'),
    },{
      path: 'info',
      name: '修改资料',
      component: () => import('@/views/info/info'),
    }, {
      path: 'show',
      name: '查看资料',
      component: () => import('@/views/info/show'),
    }, {
      path: 'message',
      name: '消息中心',
      component: () => import ('@/views/info/message'),
    }],
  },
]
