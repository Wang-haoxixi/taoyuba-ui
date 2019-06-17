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
  // 船东
  {
    path: '/ship_owner',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'detailShipowner',
        component: () => import('@/views/tmlms/shipowner/Page/Detail'),
        meta: noKeepAlive,
      },
      {
        path: '/admin/list',
        name: 'Shipowner',
        component: () => import('@/views/tmlms/shipowner/index'),
        meta: noKeepAlive,
      },
    ],
  },
  // 培训机构
  {
    path: '/Training',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'detailTraining',
        component: () => import('@/views/tmlms/Training/Page/Detail'),
        meta: noKeepAlive,
      },
      {
        path: '/admin/training',
        name: 'Training',
        component: () => import('@/views/tmlms/Training/index'),
        meta: noKeepAlive,
      },
    ],
  },
  // 渔村
  {
    path: '/bvillage',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'detailBvillage',
        component: () => import('@/views/tmlms/bvillage/Page/Detail'),
        meta: noKeepAlive,
      },
      {
        path: '/admin/bvillage',
        name: 'bvillage',
        component: () => import('@/views/tmlms/bvillage/index'),
        meta: noKeepAlive,
      },
    ],
  },
  // 中介
  {
    path: '/agent',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'detailAgent',
        component: () => import('@/views/tmlms/agent/Page/Detail'),
        meta: noKeepAlive,
      },
      {
        path: '/admin/agent',
        name: 'bvillage',
        component: () => import('@/views/tmlms/agent/index'),
        meta: noKeepAlive,
      },
    ],
  },
  // 个人信息综合
    {
      path: '/information',
      component: Layout,
      children: [
        {
          path: 'detail',
          name: 'detailIformation',
          component: () => import('@/views/tmlms/index'),
          meta: noKeepAlive,
        },
      ],
    },
      // 船员
      {
        path: '/boatMan',
        component: Layout,
        children: [
          {
            path: 'detail',
            name: 'detailBoatMan',
            component: () => import('@/views/tmlms/boatMan/Page/Detail'),
            meta: noKeepAlive,
          },
          {
            path: '/admin/bostMan',
            name: 'boatMan',
            component: () => import('@/views/tmlms/boatMan/index'),
            meta: noKeepAlive,
          },
        ],
      },
]