import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/tmlms_spa',
    component: Layout,
    children: [
      {
        path: 'contract_list',
        name: '查看淘渔吧合同',
        component: () => import('@/views/tmlms/contractAdmin/Page/List'),
        meta: noKeepAlive,
      },
    ],
  },
]