export let tableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  selection: false,
  menuWidth: '100',
  indexLabel: '序号',
  index: false,
  align: 'center',
  border: false,
  column: [
    { label: '代码集名称', prop: 'cdCollNm' },
    { label: '引用标准', prop: 'stdDocId', type: 'dic', dicData: [] },
  ],
}
