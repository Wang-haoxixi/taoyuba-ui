import { getDept, getDic } from '@/util/dic'

let auditState = [{value: 0, label: '待提交'}, {value: 1, label: '待确认'}, {value: 2, label: '已确认'}]

// let limitLength = (rule, value, callback) => {
//   let regName = /^[1-9]*[1-9][0-9]*$/
//   let xx = parseFloat(value)
//   if (regName.test(value)) {
//     if (value.toString().length > 12 || value < 0) {
//       console.log('3')
//       callback(new Error('请填写12位以内的正整数'))
//     } else if(xx >= 2000000000){
//       console.log('4')
//       callback(new Error('请填写小于2000000000的数字'))
//     }else{
//       callback()
//     }
//   } else {
//     callback(new Error('请填写12位以内的正整数'))
//   }
// }

let CheckDigit = (rule, value, callback) => {
  let booleans = new RegExp("^[1-9][0-9]*$").test(value)
  let xx = parseFloat(value)
  if(!booleans){
    callback(new Error("请输入正整数"))
  } else if(xx >= 2000000000){
    console.log('4')
    callback(new Error('请填写小于2000000000的数字'))
  }else {
    callback()
  }
}

export const mainTableOption = {
  selection: false,
  border: false,
  menu: false,
  header: false,
  column: [
    {
      label: '需求部门',
      prop: 'deptId',
      type: 'dic',
      dicData: getDept(),
    }, {
      label: '事项编码',
      prop: 'matCode',
    }, {
      label: '事项名称',
      prop: 'matName',
    },  {
      label: '状态',
      prop: 'auditState',
      type: 'dic',
      dicData: auditState,
    }, {
      label: '操作',
      prop: 'menu',
      solt: true,
      align: 'center',
    },
  ],
}

export const mainFormOption = {
  labelWidth: '150',
  menuBtn: false,
  selection: false,
  menu: false,
  header: false,
  border:true,
  column: [
    {
      label: '需求部门',
      prop: 'deptId',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDept(),
    },
    {
      label: '事项名称',
      prop: 'matName',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 100,
    },
    {
      label: '事项编码',
      prop: 'matCode',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 50,
    },
    {
      label: '事项类别',
      prop: 'types',
      span: 24,
      type: 'cascader',
      // type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLY_ITEM_TYPE'),
    },
    {
      label: '年平均办理量',
      prop: 'anlAvgVol',
      span: 24,
      rules: [
        { required: true, message: '不能为空', trigger: 'blur' },
        { validator: CheckDigit, trigger: 'blur'},
      ],
      maxlength: 12,
    },
    {
      label: '申请理由',
      prop: 'applyReason',
      span: 24,
      type: 'textarea',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 500,
    },
  ],
}

export const matTableOption = {
  selection: false,
  menu: false,
  header: false,
  column: [
    {
      label: '材料名称',
      prop: 'materialName',
    }, {
      label: '材料类别',
      prop: 'materialType',
      type: 'dic',
      dicData: getDic('SUPPLU_MATERIAL_TYPE'),
    }, {
      label: '操作',
      prop: 'matMenu',
      solt: true,
      align: 'center',
    },
  ],
}

export const matFormOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '材料名称',
      prop: 'materialName',
      span: 24,
      rules: [
        { required: true, message: '不能为空', trigger: 'blur' },
        // { validator: limitLength, trigger: 'blur'},
      ],
    }, {
      label: '材料类别',
      prop: 'materialType',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLU_MATERIAL_TYPE'),
    }, {
      label: '来源方式',
      prop: 'sourceMethod',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLY_SOURCE_MODE'),
    }, {
      label: '法律依据',
      prop: 'legalBasis',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLY_LEGAL_BASIS'),
    },
  ],
}

export const matDeptFormOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '材料名称',
      prop: 'materialName',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength:'24',
    }, {
      label: '材料类别',
      prop: 'materialType',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLU_MATERIAL_TYPE'),
    }, {
      label: '来源方式',
      prop: 'sourceMethod',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLY_SOURCE_MODE'),
    }, {
      label: '法律依据',
      prop: 'legalBasis',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('SUPPLY_LEGAL_BASIS'),
    }, {
      label: '责任部门',
      prop: 'deptId',
      span: 24,
      type: 'select',
      dicData: getDept(),
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
    },
  ],
}

export const eleTableOption = {
  selection: false,
  menu: false,
  header: false,
  column: [
    {
      label: '数据项名称',
      prop: 'itemName',
    }, {
      label: '责任部门(共享需求)',
      prop: 'deptId',
      type: 'dic',
      dicData: getDept(),
    }, {
      label: '备注内容',
      prop: 'comment',
      type: 'textarea',
    }, {
      label: '操作',
      prop: 'matMenu',
      solt: true,
      align: 'center',
    },
  ],
}

export const eleFormOption = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '信息项',
      prop: 'itemName',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 100,
    }, {
      label: '责任部门',
      prop: 'deptId',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDept(),
    }, {
      label: '备注',
      prop: 'comment',
      span: 24,
      type: 'textarea',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 100,
    },
  ],
}
