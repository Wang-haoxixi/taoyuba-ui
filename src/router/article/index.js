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
    ],
  },
]
