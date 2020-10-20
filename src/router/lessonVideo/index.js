import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/lessonVideo_spa',
    component: Layout,
    redirect: '/lessonVideo_spa/detail/:type/:id',
    children: [
      {
        path: '/lessonVideo_spa/detail/:type/:id',
        name: '视频详情',
        component: () => import('@/views/lessonVideo/page/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: '/lessonVideo_spa/video_list',  
        name: '视频列表页',
        component: () => import('@/views/lessonVideo/index.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]
