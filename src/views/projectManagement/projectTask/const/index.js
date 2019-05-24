import { getDic, getDept } from '@/util/dic'
export const taskTableOption = {
  page: true,
  menu: false,
  header: false,
  selection: true,
  index: true,
  column: [
    {
      label: "名称",
      prop: "configName",
    }, {
      label: "模块",
      prop: "moduleType",
      type: "dic",
      dicData: getDic('PROJECT_MODULE_TYPE'),
    }, {
      label: "排序",
      prop: "sort",
    }, {
      label: "操作",
      prop: "menu",
      solt: true,
      width: 250,
    },
  ],
}

export const taskFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [
    {
      label: '任务名称',
      prop: 'taskName',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
      maxlength: 100,
    }, {
      label: '任务类型',
      prop: 'taskType',
      type: 'select',
      dicData: getDic('PROJECT_TASK_TYPE'),
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '所属项目',
      prop: 'dependentProjectId',
      type: 'select',
      typeDic: 'dic',
      filterable: true,
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '关联项目',
      prop: 'associatedProjectIdList',
      multiple: true,
      type: 'select',
      tyepDic: 'dic',
      filterable: true,
      span: 24,
      maxlength: 100,
    }, {
      label: '描述',
      prop: 'description',
      type: 'textarea',
      span: 24,
      maxlength: 255,
    }, {
      label: '协同部门',
      prop: 'collaborativeDepartmentId',
      type: 'select',
      dicData: getDept(),
      filterable: true,
      span: 24,
    }, {
      label: '开发商',
      prop: 'developer',
      type: 'select',
      filterable: true,
      dicData: getDept(),
      span: 24,
      rules: [{
          required: true,
          message: '不能为空',
          trigger: 'change',
      }],
    }, {
      label: '状态',
      prop: 'status',
      type: 'select',
      dicData: getDic('PROJECT_MILESTONE_STATUS'),
      valueDefault: '1',
      span: 24,
      rules: [{
          required: true,
          message: '不能为空',
          trigger: 'change',
      }],
    }, {
      label: '计划开始时间',
      prop: 'plannedStartTime',
      type: 'date',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      span: 24,
      rules: [{
          required: true,
          message: '不能为空',
          trigger: 'change',
      }],
      slot: true,
    }, {
      label: '计划达成时间',
      prop: 'plannedTime',
      type: 'date',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      span: 24,
      rules: [{
          required: true,
          message: '不能为空',
          trigger: 'change',
      }],
      slot: true,
    }, {
      label: '优先级',
      prop: 'priority',
      type: 'select',
      dicData: getDic('PROJECT_TASK_PRIORITY'),
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '任务负责人',
      prop: 'taskManager',
      span: 24,
      type: 'tree',
      parent:false,
      //rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
  ],
}
