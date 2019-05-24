import { getDept, getDic } from '@/util/dic'
export const tableProps = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  index: true,
  menuWidth: '250px',
  column: [
    {label:'责任单位', prop:'responsibleUnit',type: 'dic', dicData: getDept()},
    {label:'项目名称', prop:'projectName'},
    {label:'报告时间', prop:'reportTime', solt: true},
  ],
}

export const formProps = [
  {
    label: "责任单位",
    prop: "milestoneName",
    type: "select",
    data: getDept(),
    filerable: true,
  }, {
    label: "项目名称",
    prop: "projectId",
    type: "select",
    // multiple: true,
    data: null,
  }, {
    label: "状态",
    prop: "status",
    type: "select",
    data: getDic('PROJECT_MILESTONE_STATUS'),
  },
]

export const tableOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '项目名称',
      prop: 'projectId',
      type: 'select',
      typeDic: 'dic',
      filterable: true,
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    },
    {
      label: '责任单位',
      prop: 'responsibleUnit',
      span: 24,
      type: 'select',
      filerable: true,
      dicData: getDept(),
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '报告时间',
      prop: 'reportTime',
      span: 24,
      slot: true,
    },
    {
      label: '年度目标',
      prop: 'annualTarget',
      span: 24,
      type: 'textarea',
    },
    {
      label: '项目里程碑',
      prop: 'projectId',
      span: 24,
      slot: true,
      border: false,
      autoHeight: true,
      style: '{"padding": "0px","white-space": "normal"}',
    },
    {
      label: '项目本周进展',
      prop: 'thisWeekProgress',
      span: 24,
    },
    {
      label: '下周工作计划',
      prop: 'nextWeekPlan',
      span: 24,
    }, {
      label: '附件上传',
      prop: 'attachmentMapList',
      type: 'upload',
      loadText: '附件上传中，请稍等',
      span: 24,
      limit: 1,
      border: false,
      autoHeight: true,
      propsHttp: {
        name: 'name',
        url: 'url',
      },
      props: {
        label: 'name',
        value: 'url',
      },
      // tip: '只能上传jpg/png文件，且不超过500kb',
      action: '/datamodule/dnastddoc/upload',
      rules: [{
        required: true,
        message: '不能为空',
      }],
      slot: true,
    },
  ],
}
