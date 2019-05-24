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
    {label:'区域', prop:'sysDeptArea'},
    {label:'单位名称', prop:'sysDeptName'},
    {label:'信息系统名称', prop:'sysDsgt'},
  ],
}, config)
