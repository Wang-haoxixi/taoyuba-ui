import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/exam',
    component: Layout,
    children: [
      {
        path: 'exam_list',
        name: '考试列表',
        component: () => import('@/views/exam/examManagement/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'exam_add',
        name: '新增考试',
        component: () => import('@/views/exam/examManagement/Detail'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'test_list',
        name: '试题列表',
        component: () => import('@/views/exam/Test/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'test_add',
        name: '新增试题',
        component: () => import('@/views/exam/Test/Detail'),
        meta: noKeepAlive,
      },
    ],
  },

]