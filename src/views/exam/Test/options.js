export const  columnsMap = [
  {
      label:'试题名称',
      prop:'title',
      width:'400',
  },
  {
    label:'试题分类',
    prop:'kind',
  },
  // {
  //   label:'题目难度',
  //   prop:'level',
  // },
  {
    label:'职务等级',
    prop:'level',
  },
  // {
  //   label:'及格分数',
  //   prop:'passScore',
  // },
  // {
  //   label:'优秀分数',
  //   prop:'goodScore',
  // },
//   {
//       label:'考试开始时间',     
//       prop:'beginTime',
//   },
//   {
//     label:'考试结束时间',     
//     prop:'endTime',
// },

  // {
  //   label:'答卷时长',     
  //   prop:'answerTime',
  // },
  {
    label:'创建者',     
    prop:'createByName',
  },
  {
    label:'创建时间',     
    prop:'createTime',
  },
  // {
  //     label:'资讯类别',     
  //     prop:'type',     
  //     dictName: 'tyb_article_type',
  //     type: 'dictGroup',        
  // },
  // {
  //   label:'是否跳转链接',     
  //   prop:'isDispatch',             
  // },
  // {
  //     label:'创建时间',
  //     prop:'createTime',     
  // },        
]   


export const rules = {
  title: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  kind: [
    { required: true, message: '必填'},
  ],
  type: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  answer: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  // passScore: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
  // goodScore: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
  // tagKeyWords: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
  // isContri: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
  // downloadCost: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
  // uploader: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
  // isOpen: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
  // secrecyLevel: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
  // attachFileList: [
  //   { required: true, message: '必填', trigger: 'change' },
  // ],
}
