export const columnsMap = [
  {
    label: '分类',
    prop: 'field',
  },
  {
    label: '名称',
    prop: 'title',
  },
  {
    label: '难度',
    prop: 'diffculty',
    type: 'dict',
  },
  {
    label: '题数',
    prop: 'choiceNum',
  },
  {
    label: '总分',
    prop: 'score',
  },
  {
    label: '状态',
    prop: 'status',
  },
  {
    label: '提交人',
    prop: 'createName',
  },
  {
    label: '提交时间',
    prop: 'creatTime',
    width: '250px',
  },
]

export const dictsMap = {
  diffculty: {
    '0': '初级',
    '1': '中级',
    '2': '高级',
  },
}

export const initForm = () => {
  return {
    title: '',//试卷名称
    field: '',//试卷分类
    iepQstnRuleList: [],//试题集合
    difficulty: '',//试卷难度
    choiceNum: 0,//题目总数
    score: 0,//试卷总分
  }
}


export const toDtoForm = (row) => {
  var newForm = { ...row }
  newForm.questionList = row.questionArray.map(m => m.id).join(',')

  return newForm
}