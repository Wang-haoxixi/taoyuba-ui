import { getDic, getDept } from '@/util/dic'

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
    }, {
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

export const standardDataOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  page: true,
  index: true,
  menu: false,
  column: [
    {
      label: "中文名称",
      prop: "dataCn",
    },
    {
      label: "英文名称",
      prop: "dataCn",
    },
    {
      label: "标准程度",
      prop: "standardness",
      dicData: getDic('TABLE_ENGINE'),
    },
    {
      label: "来源部门",
      prop: "dataSourceDept",
      type: 'dic',
      dicData: getDept(),
    },
    {
      label: "操作",
      prop: "menu",
      width: 150,
      solt: true,
      align: 'center',
    },
  ],
}

export const standardDataDetailTableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  page: true,
  index: true,
  menu: false,
  column: [
    {
      label: "中文名称",
      prop: "detailCn",
    },
    {
      label: "来源部门",
      prop: "detailSourceDept",
      type: 'dic',
      dicData: getDept(),
    },
    {
      label: "操作",
      prop: "menu",
      width: 150,
      solt: true,
      align: 'center',
    },
  ],
}

export const standardDataDetailFormOption = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [
    {
      label: '中文名称',
      prop: 'detailCn',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    }, {
      label: '英文名称',
      prop: 'detailEn',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    }, {
      label: '数据类型',
      type: 'select',
      dicData: getDic('DATA_TYPE'),
      prop: 'detailDataType',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '数据长度',
      prop: 'detailDataLength',
      span: 24,
    }, {
      label: '是否为空',
      type: 'select',
      dicData: getDic('IS_NOT'),
      prop: 'isNull',
      span: 24,
    }, {
      label: '是否主键',
      type: 'select',
      dicData: getDic('IS_NOT'),
      prop: 'isPrimary',
      span: 24,
    }, {
      label: '是否归集',
      type: 'select',
      dicData: getDic('IS_NOT'),
      prop: 'isCollection',
      span: 24,
    }, {
      label: '是否字典项',
      type: 'select',
      dicData: getDic('IS_NOT'),
      prop: 'isDict',
      span: 24,
    }, {
      label: '默认值',
      prop: 'detailDefault',
      span: 24,
    }, {
      label: '字段描述',
      prop: 'detailDataNote',
      span: 24,
    }, {
      label: '所在信息资源名称',
      prop: 'infoResourcesCn',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    }, {
      label: '对象类型',
      type: 'select',
      dicData: getDic('OBJECT_TYPE'),
      prop: 'objectType',
      span: 24,
    }, {
      label: '来源部门',
      type: 'select',
      dicData: getDept(),
      prop: 'detailSourceDept',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '共享类型',
      type: 'select',
      dicData: getDic('SHARING_TYPE'),
      prop: 'shareType',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '共享条件',
      prop: 'shareCondition',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    }, {
      label: '共享方式',
      type: 'select',
      dicData: getDic('TABLE_ENGINE'),
      prop: 'shareWay',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '是否向全社会开放',
      type: 'select',
      dicData: getDic('IS_NOT'),
      prop: 'isOpenForSocial',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    }, {
      label: '开放条件',
      prop: 'openCondition',
      span: 24,
    }, {
      label: '更新周期',
      type: 'select',
      dicData: getDic('UPD_CYCLE'),
      prop: 'updateCycle',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    },
  ],  
}
