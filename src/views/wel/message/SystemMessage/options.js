// import { mergeByFirst } from '@/util/util'
const dictsMap = {
}
const columnsMap = [
  {
    prop: 'time',
    label: '时间',
    width: '200',
  },
]

const initForm = () => {
  return {
    id: 0,  // 通知公告id
    name: '',  // 通知公告Title
    time: '', // 通知公告时间
    pathType: '3', // 通知公告字典类型
    pathId: '', // 通知公告路径ID
    receiverName: '', // 接收人
    content: '', // 发布内容
    type: '', // 邀请联盟,会议纪要
    isMark: '', // 是否标记
  }
}

const initSearchForm = () => {
  return {
    name: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }