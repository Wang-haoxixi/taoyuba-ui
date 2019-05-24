const DIC = {
  ISOPEN: [{
    label: '开',
    value: 0,
  }, {
    label: '关',
    value: 1,
  }],
}
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  dicData: DIC,
  align: 'center',
  addBtn: false,
  viewBtn: true,
  column: [
    {
      label: '组织名称',
      prop: 'name',
      span: 24,
      solt: true,
      rules: [
        {
          required: true,
          message: '组织名称不能为空',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur',
        },
      ],
    },
    {
      width: 120,
      label: 'Logo',
      prop: 'logo',
      span: 24,
      hide: true,
    },
    {
      width: 150,
      label: '组织描述',
      prop: 'intro',
      overHidden: true,
      span: 24,
    },
    {
      label: '允许加入',
      prop: 'isOpen',
      span: 24,
      type: 'switch',
      dicData: 'ISOPEN',
      mock: {
        type: 'dic',
      },
    },
    {
      width: 180,
      label: '状态',
      prop: 'status',
      type: 'select',
      editVisdiplay: false,
      addVisdiplay: false,
      rules: [
        {
          required: true,
          message: '请选择数据权限类型',
          trigger: 'blur',
        },
      ],
      dicData: [
        {
          label: '审核通过',
          value: 0,
        },
        {
          label: '待审核',
          value: 1,
        },
        {
          label: '审核驳回',
          value: 2,
        },
      ],
    },
    {
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editVisdiplay: false,
      addVisdiplay: false,
      span: 24,
    },
  ],
}
