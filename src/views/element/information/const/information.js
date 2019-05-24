
import { getDic, getDept } from '@/util/dic'

// 信息资源table 参数
export let informationTableProps = {
  menu: false,
  header: false,
  menuWidth: '180px',
  column: [
    {label:'信息资源名称', prop:'name'},
    {label:'资源提供方', prop:'deptId', type: 'dic', dicData: getDept(), align: 'center'},
    {label:'信息资源格式', prop:'fmtList', solt: true},
    {label:'目录状态', prop:'status', type: 'dic', dicData: getDic('INFORMATION_STATUS'), solt: true},
    {label:'归集状态', prop:'collectStatus', type: 'dic', dicData: getDic('COLLECT_STATUS')},
    {label: '操作', prop: 'menu', solt: true, width: 200},
  ],
}

export const imformationTableOption = {
  page: false,
  menu: false,
  index: false,
  header: false,
  selection: false,
  column: [
    {label:'中文名称', prop:'chName'},
    {label:'英文名称', prop:'enName'},
    {label:'数据类型', prop:'dataTypeList', solt: true}, //type: 'cascader', dicData: getDic('DATA_TYPE')
    {label:'数据长度', prop:'dataLength'},
    {label:'共享类型', prop:'sharingType', type: 'dic', dicData: getDic('SHARING_TYPE')},
    {label:'开放属性', prop:'isOpen', type: 'dic', dicData: getDic('IS_NOT')},
    {label: '操作', prop: 'menu', solt: true },
  ],
}
