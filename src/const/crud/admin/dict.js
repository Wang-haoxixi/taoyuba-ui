export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: true,
  searchSize: 'mini',
  editBtn: false,
  delBtn: false,
  dic: [],
  column: [
    {
      width: 150,
      label: '字典编码',
      prop: 'code',
      search: true,
      rules: [
        {
          required: true,
          message: '请输入字典编码',
          trigger: 'blur',
        },
      ],
    },
    {
      label: '字典名称',
      prop: 'name',
      search: true,
      rules: [
        {
          required: true,
          message: '请输入字典名称',
          trigger: 'blur',
        },
      ],
    },
    {
      label: '所属系统',
      prop: 'system',
      search: true,
      editDisabled: true,
      addVisdiplay: false,
    },
    {
      label: '创建时间',
      prop: 'createTime',
      editDisabled: true,
      addVisdiplay: false,
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      editDisabled: true,
      addVisdiplay: false,
    },
  ],
}
