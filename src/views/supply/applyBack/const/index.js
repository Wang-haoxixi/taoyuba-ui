import { getDept, getDic } from '@/util/dic'

export const materialTableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  selection: false,
  page: true,
  header: false,
  menu:false,
  align:'center',
  menuAlign:'center',
  indexLabel: '序号',
  index: true,
  column: [
    {
      label: '需求情况',
      prop: 'name',
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
      prop: 'name',
      children: [
        // {
        //   label: '操作',
        //   prop: 'menu',
        //   width: 200,
        //   solt: true,
        // },
        {
          label: '确认数源部门',
          prop: 'deptId',
          type: 'dic',
          dicData: getDept(),
        },
      ],
    },
  ],
}

export const itemTableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  selection: false,
  page: true,
  header: false,
  menu:false,
  align:'center',
  menuAlign:'center',
  indexLabel: '序号',
  index: true,
  column: [
    {
      label: '需求情况',
      prop: 'name',
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
        {
          label: '数据项名称',
          prop: 'itemName',
        },
      ],
    },
    {
      label: '认责情况',
      prop: 'name',
      children: [
        // {
        //   label: '操作',
        //   prop: 'menu',
        //   width: 200,
        //   solt: true,
        // },
        {
          label: '确认数源部门',
          prop: 'deptId',
          type: 'dic',
          dicData: getDept(),
        },
      ],
    },
  ],
}