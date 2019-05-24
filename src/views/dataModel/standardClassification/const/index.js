import { getDic, getDept } from '@/util/dic'

export const classificationFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [
    {
      label: '分类名称',
      prop: 'classificationName',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    },
  ],
}

export const standardDataTableOption = {
  selection: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  page: true,
  index: true,
  menu: false,
  column: [
    {
      label: '中文名称',
      prop: 'dataCn',
    }, {
      label: '英文名称',
      prop: 'dataEn',
    }, {
      label: '操作',
      prop: 'menu',
      solt: true,
      width: 100,
      align: 'center',
    },
  ],
}

export const standardDataFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [
    {
      label: '中文名称',
      prop: 'dataCn',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    },
    {
      label: '英文名称',
      prop: 'dataEn',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    }, {
      label: '数据类型',
      type: 'select',
      dicData: getDic('TABLE_ENGINE'),
      prop: 'dataType',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '数据长度',
      prop: 'dataLength',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    }, {
      label: '来源部门',
      type: 'select',
      dicData: getDept(),
      prop: 'dataSourceDept',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '标签',
      type: 'select',
      dicData: getDic('TABLE_ENGINE'),
      prop: 'label',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    },
  ],
}


