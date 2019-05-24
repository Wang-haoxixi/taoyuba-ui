// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    0: '草稿',
    1: '未处理',
    2: '以采纳',
    3: '已驳回',
  },
}

const columnsMap = [
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'sendTime',
    label: '发送时间',
  },
]

const initForm = () => {
  return {
    'id': '', // ID
    'userId':'',//userId
    'theme':'',
    'status':'',//
    'proposeContent': '',//内容
    'attendeeList': '',//接收对象
    'attendeeId':'',//接收对象id
    'feedbackOpinion':'',//反馈意见
    'gratuity':'',//打赏
    'disabled':'',
    'annexList':[],
    'fileName':'',//文件名
    'proposeRelatioList':'',//反馈
  }
}

// const initDtoForm = () => {
//   return {
//     'id': '', // ID
//     'theme':'',
//     'proposeContent': '',//内容
//     'attendeeList': '',//接收对象
//     'addresStatus': '',//处理意见
//     'feedbackOpinion':'',//反馈意见
//     'reward':'',//打赏
//     'disabled':'',
//     'annexList':[],
//   }
// }

const formToDto = (row) => {
  const newForm = { ...row }
  return newForm
}

const rules = {
  theme: [
    { required: true, message: '请填写建议主题', trigger: 'blur' },
  ],
  proposeContent: [
    { required: true, message: '请填写建议内容', trigger: 'blur' },
  ],
  attendeeId: [
    { required: true, message: '请填写接收对象', trigger: 'blur' },
  ],
  feedbackStatus: [
    { required: true, message: '请填写处理意见', trigger: 'blur' },
  ],
  feedbackOpinion: [
    { required: true, message: '请填写反馈意见', trigger: 'blur' },
  ],
  gratuity: [
    { required: true, message: '请输入打赏金额', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, formToDto, rules }