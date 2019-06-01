import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/empty',
    component: Layout,
    children: [
      {
        path: 'empty',
        name: '空页面',
        component: () => import('@/views/empty/index'),
        meta: noKeepAlive,
      },
    ],
  },
]