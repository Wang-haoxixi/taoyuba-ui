export const  columnsMap = [
  {
      label:'考试名称',
      prop:'examName',
  },
  {
    label:'考试分类',
    prop:'kind',
  },
  {
    label:'职务等级',
    prop:'level',
  },
  // {
  //   label:'考试人数',
  //   prop:'testNumber',
  // },
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
  examName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  kind: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  // level: [
  //   { required: true, message: '必填', trigger: 'blur' },
  // ],
  answerTime: [
    { type: 'number',min: 0,message: '答题时间不能小于0',trigger: 'blur',required: true},
  ],
  passScore: [
    { type: 'number',min: 0,message: '及格分数不能小于0',trigger: 'blur',required: true},
  ],
  goodScore: [
    { type: 'number',min: 0,message: '优秀分数不能小于0',trigger: 'blur',required: true},
  ],
  score: [
    { type: 'number',min: 0,message: '试卷总分不能小于0',trigger: 'blur',required: true},
  ],
  choiceNum: [
    { type: 'number',min: 0,message: '试题总数不能小于0',trigger: 'blur',required: true},
  ],

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



