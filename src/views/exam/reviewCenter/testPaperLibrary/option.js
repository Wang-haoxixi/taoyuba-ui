export const columnsMap = [
  {
    label: '分类',
    prop: 'fieldName',
  },
  {
    label: '名称',
    prop: 'title',
  },
  // {
  //   label: '难度',
  //   prop: 'diffculty',
  //   type: 'dict',
  //   width: '100px',
  // },
  {
    label: '题数',
    prop: 'choiceNum',
    width: '150px',
  },
  {
    label: '总分',
    prop: 'score',
    width: '150px',
  },
  // {
  //   label: '状态',
  //   prop: 'status',
  // },
  {
    label: '创建者',
    prop: 'createName',
    width: '180px',
  },
  {
    label: '创建时间',
    prop: 'creatTime',
    width: '200px',
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
    title: '', //试卷名称
    field: '', //试卷分类
    iepQstnRuleList: [], //试题集合
    difficulty: '', //试卷难度
    choiceNum: 0, //题目总数
    score: 0, //试卷总分
  }
}

export const questionForm = () => {
  return {
    field: [], //科目
    type: '', //题型
    configurationState: '', //配置状态
    simpleNum: '', //简单题数
    middleNum: '', //普通题数
    hardNum: '', //困难题数
    scoringMethod: '', //打分方式
    marker: '', //是否指定阅卷人
    qstnDescribe: '', // 题型说明
    multipleSelection: 0, //是否开启多选
    single: 5, //单题分数
    total: '', //试题总数
    iepItemBankList: [], //固定试题
    questionList: '', //试题id
  }
}

export const toDtoForm = (row) => {
  var newForm = { ...row }
  newForm.questionList = row.iepItemBankList.map(m => m.id).join(',')

  return newForm
}
