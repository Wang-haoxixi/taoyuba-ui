import Layout from '@/page/index/'
export default [
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/page/login/index'),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/page/error-page/404'),
    name: '404',
  },
  {
    path: '/403',
    component: () => import('@/page/error-page/403'),
    name: '403',
  },
  {
    path: '/500',
    component: () => import('@/page/error-page/500'),
    name: '500',
  },
  {
    path: '/',
    name: 'main',
    redirect: '/index',
    meta: {
      title: '主页',
    },
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/page/main-index/index'),
    meta: {
      title: '主页面',
    },
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ':routerPath',
      name: 'iframe',
      component: () => import('@/page/iframe/main'),
      props: true,
    }],
  },
  {
    path: '*',
    redirect: '/404',
    // hidden: true,
  },
]
