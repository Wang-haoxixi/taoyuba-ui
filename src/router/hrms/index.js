import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/hrms_spa',
    component: Layout,
    redirect: '/hrms_spa/growth_file/:id',
    children: [
      {
        path: 'growth_file/:id',
        name: '成长档案',
        component: () => import('@/views/hrms/GrowthFile/index.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'approval/:id',
        name: '新增审批',
        component: () => import('@/views/wel/approval/Components/New/index.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'approval_detail/:id',
        name: '审批详情',
        component: () => import('@/views/wel/approval/Components/Detail/index.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'recruitment_publish/:id',
        name: '发布招聘表单',
        component: () => import('@/views/hrms/Recruitment/Publish/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'suggestion_new',
        name: '新增建议',
        component: () => import('@/views/hrms/Suggestion/New.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'suggestion_edit/:id',
        name: '修改建议',
        component: () => import('@/views/hrms/Suggestion/New.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'suggestion_list',
        name: '发布的建议列表',
        component: () => import('@/views/hrms/Suggestion/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'suggestion_detail/:id',
        name: '建议详情',
        component: () => import('@/views/hrms/Suggestion/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'position_post/:positionId',
        name: '发布禁渔岗位表单',
        component: () => import('@/views/hrms/Position/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'crew_post/:userId',
        name: '船员管理表单',
        component: () => import('@/views/hrms/crew/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'crew_view/:userId',
        name: '船员管理表单',
        component: () => import('@/views/hrms/crew/Page/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'recruit_post/:recruitId',
        name: '发布招聘求职表单',
        component: () => import('@/views/hrms/Recruit/Page/Edit.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]
