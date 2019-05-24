export const tableOption = {
  'border': true,
  'index': true,
  'stripe': false,
  'menuAlign': 'center',
  'align': 'center',
  'editBtn': false,
  'delBtn': false,
  'header': false,
  'column': [{
    label: 'ID',
    prop: 'id',
    align: 'center',
    addVisdiplay: false,
    editDisabled: true,
  }, {
    label: '关联名字',
    prop: 'name',
    align: 'center',
    search: true,
  }, {
    label: '数据',
    prop: 'number',
    align: 'center',
    search: true,
  }],
}
