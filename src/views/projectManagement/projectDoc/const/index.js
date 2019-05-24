import { getDic } from '@/util/dic'
export const tableProps = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  index: true,
  menuWidth: '180px',
  column: [
    {
      label: '项目名称',
      prop: 'projectName',
    }, {
      label:'所处阶段',
      prop:'stage',
      type: 'dic',
      dicData: getDic('PROJECT_DOC_STAGE'),
    }, {
      label:'进度状态',
      prop:'progressStatus',
      type: 'dic',
      dicData: getDic('PROJECT_MILESTONE_STATUS'),
      solt: true,
    }, {
      label:'验收与支付',
      prop:'payStatus',
      type: 'dic',
      dicData: getDic('PROJECT_MILESTONE_STATUS'),
      solt: true,
    }, {
      label:'项目绩效',
      prop:'performanceStatus',
      type: 'dic',
      dicData: getDic('PROJECT_MILESTONE_STATUS'),
      solt: true,
    }, {
      label:'项目跟踪',
      prop:'trackingStatus',
      type: 'dic',
      dicData: getDic('PROJECT_MILESTONE_STATUS'),
      solt: true,
    },
  ],
}
export const fileList1 = [
  {
    title:'1-1.项目会议纪要',
    action:'/api/proj/dnaprojectdoc/upload',
    num:11,
  },
  {
    title:'1-2.项目汇报材料',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:12,
  },
  {
    title:'1-3.项目技术材料',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:13,
  },
  {
    title:'1-4.政策文件',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:14,
  },
  {
    title:'1-5.项目学习材料',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:15,
  },
]
export const fileList2 = [
  {
    title:'2-1.项目申报书（必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:21,
    required:true,
  },
  {
    title:'2-2.立项方案（必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:22,
    required:true,
  },
  {
    title:'2-3.“两办”预审意见',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:23,
  },
  {
    title:'2-4.项目预算（“一上”）汇报材料',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:24,
  },
  {
    title:'2-5.项目预算（“二上”）汇报材料（必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:25,
    required:true,
  },
]
export const fileList3 = [
  {
    title:'3-1.项目预算批复文件',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:31,
  },
  {
    title:'3-2.采购审批表',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:32,
  },
  {
    title:'3-3.项目方案（必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:33,
    required:true,
  },
  {
    title:'3-4.采购需求（必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:34,
    required:true,
  },
  {
    title:'3-5.采购建议书申请表',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:35,
  },
  {
    title:'3-7.招标文件（必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:36,
    required:true,
  },
  {
    title:'3-8.项目合同签订审批表',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:37,
  },
]
export const fileList4 = [
  {
    title:'3-9.项目合同（必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:41,
    required:true,
  },
  {
    title:'4-1.项目建设需求变更审批表',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:42,
  },
  {
    title:'4-2.项目实施档案',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:43,
  },
]
export const fileList5 = [
  {
    title:'5-4.固定资产验收单',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:51,
  },
  {
    title:'5-5.信息化项目经费支付审批表（必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:52,
    required:true,
  },
  {
    title:'5-6.第三方检测报告（建设类、升级改造类必填）',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:53,
  },
]
export const fileList6 = [
  {
    title:'6-1.项目绩效评估报告',
    action:'https://jsonplaceholder.typicode.com/posts/',
    num:61,
  },
]
