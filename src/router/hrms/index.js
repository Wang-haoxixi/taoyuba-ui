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
        name: '船员表单',
        component: () => import('@/views/hrms/crew/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'crew_views/:userId',
        name: '船员表单详情页',
        component: () => import('@/views/hrms/crew/Page/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'crew_admin/:userId',
        name: '管理表单',
        component: () => import('@/views/hrms/AdminCrew/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'crew_view/:userId',
        name: '管理表单',
        component: () => import('@/views/hrms/AdminCrew/Page/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'recruit_post/:recruitId',
        name: '发布招聘求职表单',
        component: () => import('@/views/hrms/Recruit/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'resume_post/:resumeId',
        name: '发布求职简历表单',
        component: () => import('@/views/hrms/Resume/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'recruit_list',
        name: '招聘列表页',
        component: () => import('@/views/hrms/Recruit/Page/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'resume_list',
        name: '招聘列表页',
        component: () => import('@/views/hrms/Resume/Page/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'position_list',
        name: '禁渔期列表页',
        component: () => import('@/views/hrms/Position/Page/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'crew_admin_list',
        name: '船员管理列表页',
        component: () => import('@/views/hrms/AdminCrew/Page/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'village_ship_list/:villageId',                  
        name: '渔村下渔船列表页',                     
        component: () => import('@/views/hrms/StandingBook/BoatsFiles/Page/ShipList.vue'),
        meta: noKeepAlive,
      },
      {         
        path: 'ship_crew_list/:shipId',                        
        name: '渔船下船员列表页',                     
        component: () => import('@/views/hrms/StandingBook/BoatsFiles/Page/CrewList.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'village_shipOwner_detail',                  
        name: '渔村下船东详情页',                     
        component: () => import('@/views/hrms/StandingBook/Owner/Page/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'village_ship_detail',                  
        name: '渔村下渔船详情页',                     
        component: () => import('@/views/hrms/StandingBook/Fisher/Page/Detail.vue'),
        meta: noKeepAlive,
      },
      {   
        path: 'ship_insure_list/:shipName',                        
        name: '渔船保单列表',                                   
        component: () => import('@/views/hrms/StandingBook/BoatsFiles/Page/ShipinsureList.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'ship_insure',                        
        name: '渔船保单表单',                                   
        component: () => import('@/views/hrms/StandingBook/BoatsFiles/Page/Shipinsure.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'ship_crew/:shipNo',                        
        name: '渔船船员表单',                                   
        component: () => import('@/views/hrms/StandingBook/Fisher/FishCrew/index.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'myship_crew/:shipNo',                        
        name: '渔船管理',                                   
        component: () => import('@/views/hrms/StandingBook/Fisher/FishCrew/Shipcrew.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'shipCrew_list/',                        
        name: '渔船下船员列表页',                                   
        component: () => import('@/views/hrms/StandingBook/Fisher/index.vue'),        
        meta: noKeepAlive,
      },
      {          
        path: 'shipCrew_Detial/:shipId',                        
        name: '渔船下船员详情页',                                   
        component: () => import('@/views/hrms/StandingBook/Fisher/FishCrew/Detail.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'shipCrew_Insure/:idcard',                        
        name: '渔船下船员证书列表页',                                   
        component: () => import('@/views/hrms/StandingBook/Fisher/FishCrew/Insure.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'ship_operat/:shipId',                        
        name: '渔船下经营人表单',                                   
        component: () => import('@/views/hrms/StandingBook/Fisher/Operat/index.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'shipOperat_Detial/:shipName',                        
        name: '渔船下经营人详情',                                   
        component: () => import('@/views/hrms/StandingBook/Fisher/Operat/Detail.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'shipChange_Detial/:id',                        
        name: '渔船变更详情页',                                   
        component: () => import('@/views/hrms/StandingBook/ShipChange/Page/Detail.vue'),        
        meta: noKeepAlive,
      },
      {   
        path: 'shipChange__list/',                        
        name: '渔船变更列表页',                                   
        component: () => import('@/views/hrms/StandingBook/ShipChange/index.vue'),        
        meta: noKeepAlive,
      },  
    ],
  },
  {
    path: '/hrms',
    component: Layout,
    children: [
      {
        path: 'resume',
        name: 'resume',
        component: () => import('@/views/hrms/Resume/index.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]
