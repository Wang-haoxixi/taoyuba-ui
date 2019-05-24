import { getDic} from '@/util/dic'

export const tableOption = {
  addBtn: false,
  editBtn: false,
  delBtn: false,
  header: false,
  page: true,
  index: true,
  selection: true,
  menu: false,
  'column': [
    {
      label: '消息标题',
      prop: 'msgTitle',
    }, {
      label: '消息内容',
      prop: 'msgContent',
    }, {
      label: '发送时间',
      prop: 'createTime',
    }, {
      label: '状态',
      prop: 'status',
      type: 'dic',
      dicData: getDic('READ_STATUS'),
    },
  ],
}
