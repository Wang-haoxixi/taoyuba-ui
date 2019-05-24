import { mergeByFirst } from '@/util/util'
const columnsMap = [
  {
    prop: 'trainingTheme',
    label: '培训主题',
  },
  {
    prop: 'trainerName',
    label: '培训老师',
  },
  {
    prop: 'startTime',
    label: '开始时间',
  },
  {
    prop: 'endTime',
    label: '结束时间',
  },
  {
    prop: 'type',
    label: '培训类型',
  },
  {
    prop: 'method',
    label: '培训方式',
  },
]

const rules = {
  trainingTheme: [
    { required: true, message: '请输入主题', trigger: 'blur' },
  ],
  user: [
    { required: true, message: '请输入培训老师', trigger: 'blur' },
  ],
  startTime: [
    { required: true, message: '请输入开始时间', trigger: 'blur' },
  ],
  endTime: [
    { required: true, message: '请输入结束时间', trigger: 'blur' },
  ],
  typeId: [
    { required: true, message: '请输入类型', trigger: 'blur' },
  ],
  methodId: [
    { required: true, message: '请输入方法', trigger: 'blur' },
  ],
  place: [
    { required: true, message: '请输入地点', trigger: 'blur' },
  ],
  material: [
    { required: false, message: '请输入材料', trigger: 'blur' },
  ],
  trainingTag: [
    { type:'array', required: true, message: '请选择标签', trigger: 'blur' },
  ],
  trainingBrief: [
    { required: true, message: '请选择简介', trigger: 'blur' },
  ],
  themePictures: [
    { required: true, message: '请上传图片', trigger: 'blur' },
  ],
}

const initForm = () => {
  return {
    id: null, // ID
    trainingTheme: '', // 培训主题
    teacher: '', // 培训老师
    user: {
      id: '',
      name: '',
    }, // 培训老师
    startTime: '', // 培训开始时间
    endTime: '', // 培训结束时间
    typeId: null, // 培训类型
    methodId: '', // 培训方式
    place: '', // 培训地点
    material: [], // 培训材料(暂时无, 以后考虑)
    attachFile: [], // 文件
    trainingTag: [], // 标签
    trainingBrief: '', // 简介
    themePictures: '', // 图片
  }
}

const formToVo = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.material = row.attachFile || []
  newForm.user = row.trainerList[0]
  return newForm
}

const formToDto = (row) => {
  const newForm = { ...row }
  newForm.attachFileUrl = row.material.map(m => m.url)[0]
  newForm.teacher = row.user.id
  delete newForm.material
  delete newForm.attachFile
  return newForm
}

const initSearchForm = () => {
  return {
    trainingTheme: '',
    teacher: '',
    type: '',
    date: '',
  }
}
export { columnsMap, initForm, initSearchForm, rules, formToVo, formToDto }
