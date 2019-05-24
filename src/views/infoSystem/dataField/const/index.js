import mergeWith from 'lodash/mergeWith'
import {getDic} from '@/util/dic'
import { validatePositive } from '@/util/validate'

let limitLength = (rule, value, callback) => {
  if (validatePositive(value)) {
    callback()
  } else {
    callback(new Error())
  }
}

const config = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  menuWidth: '180px',
  selection: true,
}
// 信息资源table 参数
export let fieldTableProps = mergeWith({
  column: [
    {label:'英文名称', prop:'nameEn'},
    {label:'中文名称', prop:'nameCn'},
    {label:'所属数据表', prop:'tableIdForShow'},
    {label:'数据类型', prop:'columnTypeForShow'},
    {label:'数据长度', prop:'columnLength'},
  ],
}, config)

let updateSpan = 24
// 编辑参数
export let fieldUpdateProps = {
  labelWidth: '150',
  menuBtn: false,
  column: [
    {
      label: '数据字段英文名',
      prop: 'nameEn',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '数据字段中文名',
      prop: 'nameCn',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
    },
    {
      label: '数据类型',
      prop: 'columnType',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('DATA_TYPE'),
    },
    {
      label: '字段长度',
      prop: 'columnLength',
      span: updateSpan,
      rules: [
        { required: true, message: '不能为空', trigger: 'blur' },
        { validator: limitLength, message: '请输入正整数', trigger: 'blur'},
      ],
    },
    {
      label: '小数位',
      prop: 'decimals',
      span: updateSpan,
      rules: [
        { required: true, message: '不能为空', trigger: 'blur' },
        { validator: limitLength, message: '请输入正整数', trigger: 'blur'},
      ],
    },
    {
      label: '是否为空',
      prop: 'isNull',
      span: updateSpan,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('IS_NOT'),
    },
    {
      label: '默认值',
      prop: 'defaults',
      span: updateSpan,
    },
    {
      label: '是否主键',
      prop: 'isKey',
      type: 'select',
      span: updateSpan,
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: getDic('IS_NOT'),
    },
  ],
}