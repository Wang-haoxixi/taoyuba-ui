export const tableOption = {
  'border': false,
  'index': true,
  'indexLabel': '序号',
  'stripe': false,
  'menuAlign': 'center',
  'align': 'center',
  'addBtn': false,
  'editBtn': false,
  'delBtn': false,
  'header': false,
  'dic': [],
  'column': [{
    label: '令牌',
    prop: 'token_value',
    align: 'center',
  }, 
  // {
  //   label: '用户ID',
  //   prop: 'user_id',
  //   align: 'center',
  // },
   {
    label: '用户名',
    prop: 'user_name',
    align: 'center',
  }, {
    label: '类型',
    prop: 'token_type',
    align: 'center',
  }, {
    label: '过期时间',
    prop: 'expires_in',
    align: 'center',
    // format: "MM-dd",
  }, {
    label: '客户端',
    prop: 'client_id',
    align: 'center',
  }, {
    label: '授权类型',
    prop: 'grant_type',
    align: 'center',
  }],
}
