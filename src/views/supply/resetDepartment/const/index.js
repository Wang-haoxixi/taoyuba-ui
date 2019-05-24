import { getDept, getDic } from '@/util/dic'

export const materialTableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  selection: false,
  page: false,
  header: false,
  menu: false,
  align: 'center',
  menuAlign: 'center',
  indexLabel: '序号',
  index: true,
  column: [
    {
      label: '需求情况',
      children: [
        {
          label: '材料类型',
          prop: 'materialType',
          type: 'dic',
          dicData: getDic('SUPPLU_MATERIAL_TYPE'),
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
      ],
    },
    {
      label: '认责情况',
      children: [
        {
          label: '转交部门',
          prop: 'menu',
          width: 200,
          solt: true,
        },
        {
          label: '拒绝部门',
          prop: 'deptId',
          type: 'dic',
          dicData: getDept(),
        },
        {
          label: '拒绝理由',
          prop: 'comment',
        },
      ],
    },
  ],
}

export const formOption = {
  labelWidth: '150',
  menuBtn: false,
  selection: false,
  menu: false,
  header: false,
  border:true,
  column: [{
    label: '选择部门',
    prop: 'recDeptId',
    span: 24,
    type: 'select',
    rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    dicData: getDept(),
  }],
}

export const itemTableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  selection: false,
  page: false,
  header: false,
  menu: false,
  align: 'center',
  menuAlign: 'center',
  indexLabel: '序号',
  index: true,
  column: [
    {
      label: '需求情况',
      children: [
        {
          label: '数据项',
          prop: 'itemName',
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
      ],
    },
    {
      label: '认责情况',
      children: [
        {
          label: '转交部门',
          prop: 'menu',
          width: 200,
          solt: true,
        },
        {
          label: '拒绝部门',
          prop: 'deptId',
          type: 'dic',
          dicData: getDept(),
        },
        {
          label: '拒绝理由',
          prop: 'comment',
        },
      ],
    },
  ],
}
