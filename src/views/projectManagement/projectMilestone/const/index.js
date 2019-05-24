import {getDic} from '@/util/dic'

const updataSpan = 24

export const tableOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '项目里程碑名称',
      prop: 'milestoneName',
      span: updataSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 100,
    },
    {
      label: '里程碑类型',
      prop: 'milestoneType',
      span: updataSpan,
      type: 'select',
      dicData: getDic('PROJECT_MILESTONE_TYPE'),
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '所属项目',
      prop: 'projectId',
      span: updataSpan,
      type: 'select',
      typeDic: 'dic',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '描述',
      prop: 'description',
      span: updataSpan,
      type: 'textarea',
    },
    {
      label: '负责人',
      prop: 'principal',
      span: updataSpan,
      type: 'tree',
      parent:false,
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '进度',
      prop: 'schedule',
      span: updataSpan,
      type: 'select',
      dicData: getDic('PROJECT_MILESTONE_SCHEDULE'),
      valueDefault: '1',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '状态',
      prop: 'status',
      span: updataSpan,
      type: 'select',
      dicData: getDic('PROJECT_MILESTONE_STATUS'),
      valueDefault: '1',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
    {
      label: '计划达成时间',
      prop: 'plannedTime',
      type: 'date',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      span: updataSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      slot: true,
    },
  ],
}
