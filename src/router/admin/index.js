import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'posForm',
        name: '广告位',
        component: () => import('@/views/admin/ad/posForm.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]