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

export const disAgreeFormOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '推荐责任部门',
      prop: 'recDeptId',
      type: 'select',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDept(),
    },
    {
      label: '备注',
      prop: 'comment',
      type: 'textarea',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 2000,
    },
  ],
}

export const agreeFormOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '需求部门',
      prop: 'demandDeptId',
      type: 'select',
      span: 24,
      disabled: true,
      dicData: getDept(),
    }, {
      label: '事项名称',
      prop: 'matName',
      span: 24,
      disabled: true,
    }, {
      label: '材料名称',
      prop: 'materialName',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      span: 24,
      maxlength: 100,
    }, {
      label: '材料类别',
      prop: 'materialType',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLU_MATERIAL_TYPE'),
    }, {
      label: '数据项名称',
      prop: 'itemName',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      span: 24,
      maxlength: 100,
    }, {
      label: '责任部门',
      prop: 'deptId',
      type: 'select',
      span: 24,
      dicData: getDept(),
      disabled: true,
    },
  ],
}

export const materialTableOption = {
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

export const agreeMaterialFormOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '需求部门',
      prop: 'demandDeptId',
      type: 'select',
      span: 24,
      disabled: true,
      dicData: getDept(),
    }, {
      label: '事项名称',
      prop: 'matName',
      span: 24,
      disabled: true,
    }, {
      label: '材料名称',
      prop: 'materialName',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      span: 24,
      maxlength: 100,
    }, {
      label: '材料类别',
      prop: 'materialType',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLU_MATERIAL_TYPE'),
    }, {
      label: '责任部门',
      prop: 'deptId',
      type: 'select',
      span: 24,
      dicData: getDept(),
      disabled: true,
    },
  ],
}
