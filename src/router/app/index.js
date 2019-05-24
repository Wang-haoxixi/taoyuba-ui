import Layout from '@/page/index/index'
import resourceRoute from './resource'



const noAuth = {
  keepAlive: false,
  // isTab: false,
  // isAuth: false,
}
export default [
  {
    path: '/app',
    name: '首页',
    component: Layout,
    redirect: '/app/index',
    children: [
      {
        path: 'index',
        name: '首页频道',
        component: () => import('@/views/app/index/'),
        meta: noAuth,
      },
      {
        path: 'person',
        name: '国脉人频道',
        component: () => import('@/views/app/person/'),
        meta: noAuth,
      },
      {
        path: 'products',
        name: '产品频道',
        component: () => import('@/views/app/products/'),
        meta: noAuth,
      },
      {
        path: 'project',
        name: '项目频道',
        component: () => import('@/views/app/project/'),
        meta: noAuth,
      },
      {
        path: 'brand',
        name: '品牌频道',
        component: () => import('@/views/app/brand/'),
        meta: noAuth,
      },
      {
        path: 'news',
        name: '要闻频道',
        component: () => import('@/views/app/news/'),
        meta: noAuth,
      },
      {
        path: 'resource',
        name: '资源频道',
        component: () => import('@/views/app/resource/'),
        meta: noAuth,
        redirect: '/app/resource/material',
        children: resourceRoute,
      },
      {
        path: 'data',
        name: '数据频道',
        component: () => import('@/views/app/data/'),
        meta: noAuth,
      },
      {
        path: 'wealth',
        name: '财富频道',
        component: () => import('@/views/app/wealth/'),
        meta: noAuth,
      },
      {
        path: 'college',
        name: '学院频道',
        component: () => import('@/views/app/college/'),
        meta: noAuth,
      },
      {
        path: 'search',
        name: '搜索频道',
        component: () => import('@/views/app/search/'),
        meta: noAuth,
      },
      {
        path: 'organization_style/:id',
        name: '组织风采',
        component: () => import('@/views/app/organizationStyle/'),
        meta: noAuth,
      },
      {
        path: 'organization_details',
        name: '关于组织',
        component: () => import('@/views/app/organizationDetails/'),
        meta: noAuth,
        redirect: '/app/organization_details/introduction',
        children:[
          {
            path: 'introduction',
            name: '组织介绍',
            component: () => import('@/views/app/organizationDetails/introduction/'),
            meta: noAuth,
          },
          {
            path: 'member',
            name: '组织介绍',
            component: () => import('@/views/app/organizationDetails/member/'),
            meta: noAuth,
          },
          {
            path: 'memorabilia',
            name: '组织大事记',
            component: () => import('@/views/app/organizationDetails/memorabilia/'),
            meta: noAuth,
          },
          {
            path: 'album',
            name: '组织相册',
            component: () => import('@/views/app/organizationDetails/album/'),
            meta: noAuth,
          },
          {
            path: 'honor',
            name: '组织荣誉',
            component: () => import('@/views/app/organizationDetails/honor/'),
            meta: noAuth,
          },
          {
            path: 'evaluation',
            name: '组织评价',
            component: () => import('@/views/app/organizationDetails/evaluation/'),
            meta: noAuth,
          },
        ],
      },
      {
        path: 'alliance_details',
        name: '关于联盟',
        component: () => import('@/views/app/allianceDetails/'),
        meta: noAuth,
        redirect: '/app/alliance_details/introduction',
        children:[
          {
            path: 'introduction',
            name: '联盟介绍',
            component: () => import('@/views/app/allianceDetails/introduction/'),
            meta: noAuth,
          },
          {
            path: 'memorabilia',
            name: '联盟大事记',
            component: () => import('@/views/app/allianceDetails/memorabilia/'),
            meta: noAuth,
          },
          {
            path: 'development',
            name: '联盟发展历程',
            component: () => import('@/views/app/allianceDetails/development/'),
            meta: noAuth,
          },
          {
            path: 'album',
            name: '联盟相册',
            component: () => import('@/views/app/allianceDetails/album/'),
            meta: noAuth,
          },
          {
            path: 'culture',
            name: '联盟文化',
            component: () => import('@/views/app/allianceDetails/culture/'),
            meta: noAuth,
          },
          {
            path: 'evaluation',
            name: '评价管理',
            component: () => import('@/views/app/organizationDetails/evaluation/'),
            meta: noAuth,
          },
        ],
      },
      {
        path: 'personal_style/:id',
        name: '个人风采',
        component: () => import('@/views/app/personalStyle/'),
        meta: noAuth,
      },
      {
        path: 'tag_library',
        name: '标签库',
        component: () => import('@/views/app/tagLibrary/'),
        meta: noAuth,
      },
      {
        path: 'module_details/:id',
        name: '展示模块详情',
        component: () => import('@/views/app/moduleDetails/'),
        meta: noAuth,
      },
      {
        path: 'technology_details/:id',
        name: '新技术详情',
        component: () => import('@/views/app/technologyDetails/'),
        meta: noAuth,
      },
      {
        path: 'tags_detail/:id',
        name: '标签页详情',
        component: () => import('@/views/app/tagLibrary/tagDetail/'),
        meta: noAuth,
      },
      {
        path: 'training_list',
        name: '培训列表',
        component: () => import('@/views/app/trainingList/'),
      },
      {
        path: 'video_detail',
        name: '视频详情',
        component: () => import('@/views/app/videoDetails/'),
      },
      {
        path: 'video_list',
        name: '视频详情',
        component: () => import('@/views/app/videoList/'),
      },
      {
        path: 'search_detail',
        name: '搜索结果',
        component: () => import('@/views/app/searchDetails/'),
      },
    ],
  },
]
