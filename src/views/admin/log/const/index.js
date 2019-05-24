import {getDic} from '@/util/dic'
export const tableOption = {
  selection: true,
  align: 'center',
  editBtn: false,
  delBtn: false,
  addBtn: false,
  header: false,
  menuWidth: '100px',
  column: [
    {label:'类型', prop:'type', type: 'dic', dicData: getDic('IS_NORMAL')},
    {label:'请求接口', prop:'requestUri'},
    {label:'IP地址', prop:'remoteAddr'},
    {label:'请求方式', prop:'method'},
    {label:'客户端', prop:'serviceId'},
    {label:'请求时间', prop:'time'},
    {label:'创建时间', prop:'createTime'},
  ],
}