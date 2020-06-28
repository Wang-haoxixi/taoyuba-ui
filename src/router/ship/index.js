import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/ship_spa',
    component: Layout,
    redirect: '/ship_spa/detail/:type/:id',
    children: [
      {
        path: '/ship_spa/detail/:type/:id',
        name: '渔船详情',
        component: () => import('@/views/ships/Page/Detail.vue'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/ship_spa',
    component: Layout,
    children: [
      {
        path: '/wel/ship',
        name: 'ships',
        component: () => import('@/views/ships/index.vue'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/ship_port',
    component: Layout,
    redirect: '/ship_port/detail/:type/:id',
    children: [
      {
        path: '/ship_port/detail/:type/:id',
        name: '港口详情',
        component: () => import('@/views/ships/port/Page/Detail.vue'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/ship_crew',
    component: Layout,
    redirect: '/ship_crew/detail/:id',
    children: [
      {
        path: '/ship_crew/detail/:id',
        name: '渔船配员',
        component: () => import('@/views/ships/outRecord/Page/shipDetail.vue'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/ship_record',
    component: Layout,
    redirect: '/ship_record/detail/:id',
    children: [
      {
        path: '/ship_record/detail/:id',
        name: '出港记录详情',
        component: () => import('@/views/ships/outRecord/Page/Detail.vue'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/ship_inrecord',
    component: Layout,
    redirect: '/ship_inrecord/detail/:id',
    children: [
      {
        path: '/ship_inrecord/detail/:id',
        name: '进港记录详情',
        component: () => import('@/views/ships/inRecord/Page/Detail.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]
