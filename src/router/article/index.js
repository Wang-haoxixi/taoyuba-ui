import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/article_spa',
    component: Layout,
    redirect: '/article_spa/growth_file/:id',
    children: [
      {
        path: 'article_post/:articleId',
        name: '发布咨询表单',
        component: () => import('@/views/article/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'article_list',
        name: '招聘列表页',
        component: () => import('@/views/article/Page/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'article_service/:articleId',
        name: '发布培训服务表单',
        component: () => import('@/views/train/Service/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'service_list',
        name: '培训服务列表页',
        component: () => import('@/views/train/Service/Page/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'article_agent/:articleId',
        name: '发布证件代办表单',
        component: () => import('@/views/train/Agent/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'agent_list',
        name: '证件代办列表页',
        component: () => import('@/views/train/Agent/Page/List.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]