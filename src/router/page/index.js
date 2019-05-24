import Layout from '@/page/index/'
/**
 * 基础路由
 * @type { *[] }
 */
export default [
  {
    path: '/',
    name: '主页',
    redirect: '/wel/index',
  },
  {
    path: '/login',
    name: '登录页',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/page/login/index'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/register',
    name: '注册页',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/page/register/index'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: () => import(/* webpackChunkName: "page" */ '@/page/lock/index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [
      {
        path: ':routerPath',
        name: 'iframe',
        component: () => import(/* webpackChunkName: "page" */ '@/components/iframe/main'),
        props: true,
      },
    ],
  },
  {
    path: '*', redirect: '/login',
  },
]
