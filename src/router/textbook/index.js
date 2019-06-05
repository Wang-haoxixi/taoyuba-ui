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
    ],
  },
]
