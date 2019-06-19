import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/ship_spa',
    component: Layout,
    redirect: '/ship_spa/detail/:type/:id',
    children: [
      {
        path: '/ship_spa/detail/:type/:id',
        name: '渔船详情',
        component: () => import('@/views/ships/Page/Detail.vue'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/ship_spa',
    component: Layout,
    children: [
      {
        path: '/wel/ship',
        name: 'ships',
        component: () => import('@/views/ships/index.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]
