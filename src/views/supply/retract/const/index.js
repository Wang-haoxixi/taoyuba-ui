import { getDept, getDic } from '@/util/dic'

export const itemTableOption = {
  selection: false,
  page: true,
  header: false,
  menu:false,
  align:'center',
  menuAlign:'center',
  indexLabel: '序号',
  index: true,
  border: false,
  column: [
    {
      label: '需求情况',
      prop: 'name',
      children: [
        {
          label: '责任部门',
          prop: 'deptId',
          type: 'dic',
          dicData: getDept(),
        },
        {
          label: '需求部门',
          prop: 'demandDeptId',
          type: 'dic',
          dicData: getDept(),
        },
        {
          label: '事项名称',
          prop: 'matName',
        },
        {
          label: '材料名称',
          prop: 'materialName',
        },
        {
          label: '材料类型',
          prop: 'materialType',
          type: 'dic',
          dicData: getDic('SUPPLU_MATERIAL_TYPE'),
        },
        {
          label: '涉及信息项',
          prop: 'itemName',
        },
      ],
    },
    {
      label: '认责情况',
      prop: 'name',
      children: [
        {
          label: '确认操作',
          prop: 'menu',
          width: 200,
          solt: true,
        },
      ],
    },
  ],
}

export let form = {
  id: '',
  deptId: '',
  demandDeptId: '',
  matName: '',
  materialName: '',
  materialType: '',
  itemName: '',
}

let column = [
  {
    label: '需求部门',
    prop: 'demandDeptId',
    span: 24,
    type: 'select',
    disabled: true,
    dicData: getDept(),
  },
  {
    label: '事项名称',
    prop: 'matName',
    span: 24,
    disabled: true,
  },
  {
    label: '材料名称',
    prop: 'materialName',
    span: 24,
    disabled: true,
  },
  {
    label: '材料类型',
    prop: 'materialType',
    span: 24,
    disabled: true,
    type: 'select',
    dicData: getDic('SUPPLU_MATERIAL_TYPE'),
  },
  {
    label: '涉及信息项',
    prop: 'itemName',
    span: 24,
    disabled: true,
  },
  {
    label: '责任部门',
    prop: 'deptId',
    span: 24,
    type: 'select',
    dicData: getDept(),
  },
]

export const editOption = {
  menuBtn: false,
  labelWidth: 100,
  column,
}
