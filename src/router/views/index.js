import Layout from '@/page/index/index'
export default [
  {
    path: '/activti',
    component: Layout,
    redirect: '/activti/detail',
    children: [
      {
        path: 'detail/:id',
        component: () => import(/* webpackChunkName: "views" */ '@/views/activiti/detail'),
      },
    ],
  },
]
