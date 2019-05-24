import Layout from '@/page/index/index'
export default [
  {
    path: '/gpms_spa',
    component: Layout,
    redirect: '/gpms_spa/project/detail/:id',
    children: [
      {
        path: 'project/detail/:id',
        name: '查看纪要',
        component: () => import('@/views/gpms/project/approval/index.vue'),
      },
    ],
  },
]
