import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/textbook_spa',
    component: Layout,
    redirect: '/textbook_spa/detail/:type/:id',
    children: [
      {
        path: '/textbook_spa/detail/:type/:id',
        name: '教材详情',
        component: () => import('@/views/textbook/Page/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: '/textbook_spa/textbook_list',
        name: '教材列表页',
        component: () => import('@/views/textbook/Page/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'order_detail',
        name: '新增审批',
        component: () => import('@/views/textbook/order/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'order_list',
        name: '新增审批',
        component: () => import('@/views/textbook/order/index.vue'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/print_order/:id',
    name: '打印页面',
    component: () => import('@/views/textbook/order/Print.vue'),
  },
]
