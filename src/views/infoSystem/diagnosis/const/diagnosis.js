
import { getDic,
         // getDept
} from '@/util/dic'
import { formCurd } from '../../systemRegister/const/fields'
export let diagnosisDataProps = {
  exportData: {
    url: '/directory/dirExcel/download_data',
    listQuery: {
      result: [],
      fields: [],
    },
    data: [
      {
        title: '诊断结果',
        prop: 'result',
        data: [],
      },
      {
        title: '选择字段',
        prop: 'fields',
        data: [],
      },
    ],
  },
  refNameDialog: 'formDialog',
  dialogStatus: 'detail',
}

// 系统诊断table 参数
export let diagnosisTableProps = {
  menu: false,
  header: false,
  selection: false,
  menuWidth: '180px',
  column: [
    {label:'诊断主题', prop:'diagnosticTheme', width: 300},
    {label:'详细条件', prop:'detailedValueCn'},
    {label: '操作', prop: 'menu', solt: true, width: 300},
  ],
}

export const diagnosisTableOption = {
  page: false,
  menu: false,
  index: false,
  header: false,
  selection: false,
  column: [
    {label:'条件名称', prop:'conditionName'},
    {label:'条件类型', prop:'conditionType', type: 'dic', dicData: getDic('DIAGNOSE_CONDITION_TYPE')},
    {label:'连接符', prop:'connector', type: 'dic', dicData: getDic('DIAGNOSE_CONNECTOR')},
    {label:'字段选择', prop:'optionField', type: 'dic', dicData: getDic('DIAGNOSE_OPTION_FIELD')},
    {label:'条件选择', prop:'selectionCondition', type: 'dic', dicData: getDic('DIAGNOSE_SELECTION_CONDITION')},
    {label:'数值', prop:'value'},
    {label: '操作', prop: 'menu', solt: true },
  ],
}

export const diagnosisTableTreeColumn = [
  {
    text: '条件名称',
    value: 'conditionName',
  },
  {
    text: '条件类型',
    value: 'conditionType',
    type:'dic',
    dicData: getDic('DIAGNOSE_CONDITION_TYPE'),
  },
  {
    text: '连接符',
    value: 'connector',
    type:'dic',
    dicData: getDic('DIAGNOSE_CONNECTOR'),
  },
  {
    text: '字段选择',
    value: 'optionField',
    type:'dic',
    dicData: getDic('DIAGNOSE_OPTION_FIELD'),
  },
  {
    text: '条件选择',
    value: 'selectionCondition',
    type:'dic',
    dicData: getDic('DIAGNOSE_SELECTION_CONDITION'),
  },
  // {
  //   text: '数值',
  //   value: 'value',
  //   solt: true,
  // },
]

export const diagnosisResultTableOption = {
  page: false,
  menu: false,
  header: false,
  selection: false,
  index: true,
  indexLabel:'序号',
  column: [
    {label: '信息系统名称', prop:'sysDsgt'},
    {label: '操作', prop: 'menu', solt: true },
  ],
}

export const diagnosisResultColumn = [
  {text: '部门', value:'deptId'},
  {text: '信息系统名称', value:'sysDsgt'},
  {label: '操作', prop: 'menu', solt: true },
]

export const diagnosisResultDetailOption = {
  column: formCurd,
}
