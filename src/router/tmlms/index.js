import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/tmlms_spa',
    component: Layout,
    children: [
      {
        path: 'contract_add',
        name: '新增合同',
        component: () => import('@/views/tmlms/contract/Page/NewDetail'),
        meta: noKeepAlive,
      },
      {
        path: 'contract_tmp/:shipName',
        name: 'contract_tmp',
        component: () => import('@/views/tmlms/contract/Page/contractTemplate'),
        meta: noKeepAlive,
      },
      {
        path: 'contract_list',
        name: '查看淘渔吧合同',
        component: () => import('@/views/tmlms/contractAdmin/index'),
        meta: noKeepAlive,
      },
      {
        path: 'contractCancel_list/:contractId',
        name: '合同解除和投诉列表',
        component: () => import('@/views/tmlms/relieve/Page/List'),
        meta: noKeepAlive,
      },
      {
        path: 'contractCancel_admin/:contractId',
        name: '管理员合同解除和投诉列表',
        component: () => import('@/views/tmlms/relieve/Page/AdminList'),
        meta: noKeepAlive,
      },
      {
        path: 'contract_record/:contractId',
        name: '管理员合同解除和投诉列表',
        component: () => import('@/views/tmlms/contract/Page/record'),
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
        meta: {
          keepAlive: true,
        },
      },
      {
      path: 'apply_detail',
        name: 'applyDetailShipowner',
        component: () => import('@/views/tmlms/shipowner/Page/Apply_Detail'),
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
      {                                       
      path: 'applyDetail',            
        name: 'applyBvillage',          
        component: () => import('@/views/tmlms/bvillage/Page/Apply_Detail'),
        meta: noKeepAlive,
      },      
      {           
        path: 'shipInfo',
          name: 'allotship',
          component: () => import('@/views/tmlms/bvillage/shipinfo'),
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
            meta: {   
              keepAlive: true,
            },
          },
          {
            path: '/crew/smdj/boatMan',
            name: 'crewboatMan',
            component: () => import('@/views/tmlms/boatMan/index'),
            meta: {   
              keepAlive: true,
            },
          },
          {
            path: 'apply_detail',
              name: 'applyDetailBoatMan',
              component: () => import('@/views/tmlms/boatMan/Page/Apply_Detail'),
              meta: noKeepAlive,
          },
        ],
      },
      //绑定机器
      {
        path: '/bindSn',
        component: Layout,
        children: [
          {
            path: 'detail',
            name: 'detailBindSn',
            component: () => import('@/views/tmlms/bindsn/index'),
            meta: noKeepAlive,
          },
        ],
      },
      //数据统计
      {
        path: '/dataStatistics',
        name: 'dataStatistics',
        component: () => import('@/views/tmlms/dataStatistics/index'),
        meta: noKeepAlive,
      },
      {
        path: '/statistics',
        component: Layout,
        children: [
          // {
          //   path: 'dataStatistics',
          //   name: 'dataStatistics',
          //   component: () => import('@/views/tmlms/dataStatistics/index'),
          //   meta: noKeepAlive,
          // },
          {
            path: 'positionList',
            name: 'positionList',
            component: () => import('@/views/tmlms/dataStatistics/positionList'),
            meta: noKeepAlive,
          },
        ],
      },
      // {
      //   path: '/tmlms_spa',
      //   component: Layout,
      //   children: [
      //     {
      //       path: 'contract_detail',
      //       name: '查看淘渔吧合同详情页',
      //       component: () => import('@/views/tmlms/contract/Page/ContractPrintCopy'),
      //       meta: noKeepAlive,
      //     },
      //   ],
      // },
      // 培训机构
  {
    path: '/Gov',
    component: Layout,
    children: [
      {
        path: 'detail',
        name: 'detailGov',
        component: () => import('@/views/tmlms/gov/Page/Detail'),
        meta: noKeepAlive,
      },
      {
        path: '/admin/gov',
        name: 'Gov',
        component: () => import('@/views/tmlms/gov/index'),
        meta: noKeepAlive,
      },
    ],
  },
  //  // 船员
  // {
  //   path: '/boatMan',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'detail',
  //       name: 'detailBoatMan',
  //       component: () => import('@/views/tmlms/boatMan/Page/Detail'),
  //       meta: noKeepAlive,
  //     },
  //     {
  //       path: '/admin/bostMan',
  //       name: 'boatMan',
  //       component: () => import('@/views/tmlms/boatMan/index'),
  //       meta: {   
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: 'apply_detail',
  //         name: 'applyDetailBoatMan',
  //         component: () => import('@/views/tmlms/boatMan/Page/Apply_Detail'),
  //         meta: noKeepAlive,
  //     },
  //   ],
  // },
  //上船人员登记
  {
    path: '/crewRegister',       
    component: Layout,        
    children: [
      {
        path: 'detail/:id',
        name: 'detailCrewregister',            
        component: () => import('@/views/tmlms/crewRegister/Page/Detail'),  
        meta: noKeepAlive,
      },
      {
        path: '/admin/crewRegister',
        name: 'listCrewregister',
        component: () => import('@/views/tmlms/crewRegister/index'),
        meta: noKeepAlive,
      },
    ],
  },
  //上下船记录
  {
    path: '/crewSyslog',       
    component: Layout,        
    children: [
      {
        path: '/admin/crewSyslog',
        name: 'listcrewSyslog',
        component: () => import('@/views/tmlms/crewSyslog/index'),
        meta: noKeepAlive,
      },
      {
        path: 'detail',
        name: 'detailcrewSyslog',            
        component: () => import('@/views/tmlms/crewSyslog/Page/Detail'),  
        meta: noKeepAlive,
      },
    ],
  },
  //浏览记录
  {
    path: '/History',       
    component: Layout,        
    children: [
      {
        path: '/admin/History',
        name: 'listHistory',
        component: () => import('@/views/tmlms/History/index'),
        meta: noKeepAlive,
      },
      {
        path: 'detail',
        name: 'detailHistory',            
        component: () => import('@/views/tmlms/History/Page/Detail'),  
        meta: noKeepAlive,
      },
    ],
  },
  // //上船人员登记
  // {
  //   path: '/crewregister',       
  //   component: Layout,        
  //   children: [
  //     {
  //       path: '/detail/:idcard',
  //       name: 'crewregister_detail',
  //       component: () => import('@/views/tmlms/crewRegister/Page/Detail'),
  //       meta: noKeepAlive,
  //     },
  //     {
  //       path: '/admin/crewregister',
  //       name: '上船登记人员列表',
  //       component: () => import('@/views/tmlms/crewRegister/index'),
  //       meta: noKeepAlive,
  //     },
  //   ],
  // },         
  // 劳务纠纷
  {
    path: '/laborDisputes',
    component: Layout,
    children: [
      {
        path: 'form',
        name: 'laborDisputesForm',
        component: () => import('@/views/tmlms/laborDisputes/form'),
        meta: noKeepAlive,
      },
    ],
  },
  {
    path: '/notification',
    component: Layout,
    children: [
      {
        path: 'form',
        name: 'notificationForm',
        component: () => import('@/views/tmlms/message/notification/form'),
        meta: noKeepAlive,
      },
    ],
  },
]