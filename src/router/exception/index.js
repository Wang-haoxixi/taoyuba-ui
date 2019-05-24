import Layout from '@/page/index/index'
export default [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "exception" */ '@/components/error-page/404'),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/exception',
    name: '错误页',
    component: Layout,
    redirect: '/exception/500',
    children: [
      {
        path: '403',
        component: () => import(/* webpackChunkName: "exception" */ '@/components/error-page/403'),
        name: '403',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '500',
        component: () => import(/* webpackChunkName: "exception" */ '@/components/error-page/500'),
        name: '500',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '502',
        component: () => import(/* webpackChunkName: "exception" */ '@/components/error-page/502'),
        name: '502',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '503',
        component: () => import(/* webpackChunkName: "exception" */ '@/components/error-page/503'),
        name: '503',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '504',
        component: () => import(/* webpackChunkName: "exception" */ '@/components/error-page/504'),
        name: '504',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
    ],
  },
  {
    path: '/403',
    redirect: '/exception/403',
  },
  {
    path: '/500',
    redirect: '/exception/500',
  },
  {
    path: '/502',
    redirect: '/exception/502',
  },
  {
    path: '/503',
    redirect: '/exception/503',
  },
  {
    path: '/504',
    redirect: '/exception/504',
  },
]