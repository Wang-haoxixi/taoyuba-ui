import { getDic, getDept} from '@/util/dic'

export const tableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  page: true,
  index: true,
  menu: false,
  'column': [
    {
      label: '标题',
      prop: 'title',
    }, {
      label: '部门',
      prop: 'createDeptId',
      type: 'dic',
      dicData: getDept(),
    }, {
      label: '时间',
      prop: 'createTime',
    }, {
      label: '状态',
      prop: 'status',
      type: 'dic',
      dicData: getDic('READ_STATUS'),
    }, {
        label: "操作",
        prop: "menu",
        solt: true,
        width: 250,
    },
  ],
}

export const msgForm = {
  menuBtn: false,
  labelWidth: '160',
  labelPosition: 'right',
  column: [
    {
      label: '接收部门',
      prop: 'acceptDeptIdsItem',
      type: 'select',
      dicData: getDept(),
      multiple: true,
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'change',
      }],
    },
    {
      label: '标题名称',
      prop: 'title',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    }, {
      label: '留言内容',
      prop: 'content',
      type: 'textarea',
      span: 24,
      rules: [{
        required: true,
        message: '不能为空',
        trigger: 'blur',
      }],
    },{
      label: '联系电话',
      prop: 'phone',
      span: 24,
    },
  ],
}





  