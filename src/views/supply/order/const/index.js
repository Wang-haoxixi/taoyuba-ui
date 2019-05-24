import { getDept, getDic } from '@/util/dic'
import exportDownload from '@/util/export'

export let searchOption = [
  { label: '事项名称', prop: 'matName', type: 'input' },
  { label: '事项编码', prop: 'matCode', type: 'input' },
  { label: '需求部门', prop: 'deptId', type: 'select', data: getDept() },
  { label: '责任部门', prop: 'dutyId', type: 'select', data: getDept() },
]

export let tableOption = {
  index: true,
  indexLabel: '序号',
  selection: false,
  menu: false,
  border: false,
  header: false,
  column: [{
      label: '需求情况', prop: '', align: 'center', children: [
        { label: '标记责任部门', prop: 'initialDeptId', align: 'center', type: 'select', dicData: getDept() },
        { label: '需求部门', prop: 'demandDeptId', align: 'center', type: 'select', dicData: getDept(), minWidth: '150px', fixed: 'left' },
        { label: '事项名称', prop: 'matName', align: 'center', minWidth: '150px' },
        { label: '材料名称', prop: 'materialName', align: 'center', minWidth: '150px' },
        { label: '材料类型', prop: 'materialType', align: 'center', type: 'dic', dicData: getDic('SUPPLU_MATERIAL_TYPE'), minWidth: '150px' },
        { label: '数据项名称', prop: 'itemName', align: 'center', minWidth: '150px' },
      ],
    }, {
      label: '认责情况', prop: '', align: 'center', children: [
        { label: '确认数源部门', prop: 'confirmDeptId', align: 'center', type: 'select', dicData: getDept(), minWidth: '150px' },
        { label: '确认材料名称', prop: 'confirmMaterialName', align: 'center', minWidth: '150px' },
        { label: '确认材料类型', prop: 'confirmMaterialType', align: 'center', type: 'dic', dicData: getDic('SUPPLU_MATERIAL_TYPE'), minWidth: '150px' },
        { label: '确认数据项', prop: 'confirmItemName', align: 'center', minWidth: '150px' },
      ],
    },
  ],
}

export function download ({url = '', title = '清单', data = {}}) {
  exportDownload({url, data, title})
}
