import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/cert_spa',
    component: Layout,
    redirect: '/cert_spa/growth_file/:id',
    children: [
        {
            path: 'cert_user/:certId',
            name: '发布招聘表单',
            component: () => import('@/views/hrms/Cert/Page/Edit.vue'),
            meta: noKeepAlive,
          },
          {
            path: 'cert_list',
            name: '发布招聘表单',
            component: () => import('@/views/hrms/Cert/Page/List.vue'),
            meta: noKeepAlive,
          },
    ],
  },
]
