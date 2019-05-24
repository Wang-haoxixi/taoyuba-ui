import Layout from '@/page/index/index'
export default [
  {
    path: '/cpms_spa',
    component: Layout,
    redirect: '/cpms_spa/product_detail',
    children: [
      {
        path: 'product_detail/:id',
        name: '产品详情',
        component: () => import('@/views/cpms/products/Page/Detail.vue'),
      },
      {
        path: 'module_detail/:id',
        name: '模块详情',
        component: () => import('@/views/cpms/modules/Page/Detail.vue'),
      },
      {
        path: 'technology_detail/:id',
        name: '技术详情',
        component: () => import('@/views/cpms/technologys/Page/Detail.vue'),
      },
    ],
  },
]
