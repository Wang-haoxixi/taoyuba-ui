import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/ims_spa',
    component: Layout,
    redirect: '/ims_spa/announcement_edit/:id',
    children: [
      {
        path: 'announcement_edit/:id',
        name: '通知公告',
        component: () => import('@/views/wel/message/Announcement/Form.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'announcement_detail/:id',
        name: '通知公告详情',
        component: () => import('@/views/wel/message/Announcement/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'system_message_detail/:id',
        name: '系统消息详情',
        component: () => import('@/views/wel/message/SystemMessage/Detail.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]
