import Layout from '@/page/index/index'
export default [
  {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [
      {
        path: 'index',
        name: '后台首页',
        component: () => import('@/views/wel/index/'),
      },
      {
        path: 'account-settings',
        name: '个人设置',
        component: () => import('@/views/wel/account-settings/index'),
        redirect: '/wel/account-settings/base',
        children: [
          {
            path: 'base',
            name: 'BaseSettings',
            component: () => import('@/views/wel/account-settings/BaseSetting'),
            meta: { title: '基本设置' },
          },
          {
            path: 'security',
            name: 'SecuritySettings',
            component: () => import('@/views/wel/account-settings/Security'),
            meta: { title: '安全设置' },
          },
          // {
          //   path: 'notification',
          //   name: 'NotificationSettings',
          //   component: () => import('@/views/wel/account-settings/Notification'),
          // },
        ],
      },
      {
        path: 'org',
        name: '选择组织',
        component: () => import('@/views/wel/org/index'),
      },
    ],
  },
]