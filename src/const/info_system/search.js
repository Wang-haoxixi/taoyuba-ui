import merge from 'lodash/merge'
var config = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
}
export const SearcgSystemTableProps = merge({
  menuWidth: '180px',
  column: [
    {label:'序号', prop:'id'},
    {label:'信息系统名称', prop:'sysDsgt'},
    {label:'数据规模', prop:'dataSize'},
    {label:'数据总量', prop:'dataAggr'},
  ],
}, config)
