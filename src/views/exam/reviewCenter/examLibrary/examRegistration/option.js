export const dictsMap = {
  type: {
    '1': '类型1',
    '2': '类型2',
  },
  isYes: [
    { value: 0, lable: '否' },
    { value: 1, label: '是' },
  ],
  isOpen: [
    { value: 0, lable: '开放' },
    { value: 1, label: '关闭' },
  ],
  secrecyLevel: [
    { value: 0, lable: '不保密' },
    { value: 1, label: '保密' },
  ],
}

export const tableOption = [
  {
    label: '科目',
    prop: 'createTime',
    width: '250',
  },
  {
    label: '总分',
    prop: 'views',
    width: '100',
  },
  {
    label: '开始时间',
    prop: 'createTime',
    // width: '250',
  },
  {
    label: '结束时间',
    prop: 'createTime',
    // width: '250',
  },
  {
    label: '状态',
    prop: 'name',
    width: '100',
  },
  {
    label: '报名',
    prop: 'name',
    // width: '250',
  },
  {
    label: '创建人',
    prop: 'name',
    // width: '250',
  },
]

// 本地上传
export const initLocalForm = () => {
  return {
    uploader: '',
    type: 0,
    id: '',
    materialName: '',
    intro: '',
    content: '',
    firstClass: '',
    secondClass: '',
    materialType: '',
    tagKeyWords: [],
    isContri: '',
    attachFileList: [],
    attachFile: '',
    isOpen: 0,
    secrecyLevel: 0,
  }
}

// 新建文档
export const initFormData = () => {
  return {
    uploader: '',
    type: 1,
    id: '',
    materialName: '',
    intro: '',
    content: '',
    firstClass: '',
    secondClass: '',
    materialType: '',
    downloadCost: '',
    tagKeyWords: [],
    attachFileList: [],
    isOpen: 0,
    secrecyLevel: 0,
  }
}

export const rules = {
  materialName: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  intro: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  firstClass: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  secondClass: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  materialType: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  tagKeyWords: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  isContri: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  downloadCost: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  uploader: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  isOpen: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  secrecyLevel: [
    { required: true, message: '必填', trigger: 'change' },
  ],
  attachFileList: [
    { required: true, message: '必填', trigger: 'change' },
  ],
}

// 纠错
export function initWrongForm () {
  return {
    attachmentIds: [],
    content: '',
    emailId: 0,
    materialIds: [],
    projectIds: [],
    receiverIds: [],
    receiverList: {
      unions: [],
      orgs: [],
      users: [],
    },
    reportIds: [],
    status: 1,
    subject: '',
    summaryIds: [],
    summaryList: [],
    tagKeyWords: [],
    type: 3, // 类型为纠错
    kind: 0,
  }
}

export const wrongRules = {
  subject: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  receiverIds: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '必填', trigger: 'blur' },
  ],
}
export const tipContent = {
  materialName: '1、市场项目类文件：日期+项目名称/编号+文件描述+文件阶段标识，例如20190101丽水市信息化项目建设方案编制说明v1.0；<br/>' +
    '2、政策规范制度类文件：日期+发布部门/单位+文件主题+文件阶段标识，例如20190101资产管理与投融资委员会发布关于国脉贝管理v1.0；<br/>' +
    '3、学习资源类材料：文件主题+类型：如浙江省政府数字化转型的几点思考；<br/>' +
    '备注：名称中切记出现特殊符号',
  uploader: '1、材料撰写者；<br/>' +
    '2、系统默认读取上传人为作者，如代替上传请修改姓名。',
  intro: '1、材料内容主旨说明；<br/>' +
    '2、字数在200字以上',
  firstClass: '根据材料主题准确选择分类，确保分类的准确性！',
  materialType: '根据材料实际性质进行选择，如方案，报告，清单等',
  downloadCost: '1、全体或多数国脉人知晓的公司制度、文件、新生必读等材料均不设定下载贝额；<br/>' +
    '2、线上或线下分享培训类相关材料不可设定下载贝额；<br/>' +
    '3、常规材料不高于10（普遍性公共性，比如方案、研究报告模板等），特殊领域应用不高于50贝。',
  tagKeyWords: '1、材料标签要突出材料主题，其中提及的合作项目简称，合作产品，客户简称等必须作为标签；<br/>' +
    '2、标签次序按照重要性排序；<br/>' +
    '3、标签数量必须3个以上。',
  attachFileList: '1、附件上传形式多样，如DOC、PPT、TXT、PDF、XLS；<br/>' +
    '2、材料只支持1个文件上传，大小限制在200M以内。',
}
export const tipContent2 = {
  materialName: '1、文件主题+类型：如浙江省政府数字化转型的几点思考；<br/>' +
    '备注：名称中切记出现特殊符号',
  intro: '1、材料内容主旨说明；<br/>' +
    '2、字数在50字以上',
  content: '*正文 1、文章段落要求首行缩进2个字符；<br/>' +
    '2、文章字体为默认字体；<br/>' +
    '3、文章标题标注使用规范：<br/>' +
    '①一级标题用一、二、三等标注；<br/>' +
    '②二级标题用（一）、（二）、（三）等标注；<br/>' +
    '③三级标题用1、2、3等标注；<br/>' +
    '④四级标题用（1）、（2）、（3）等标注；',
  firstClass: '根据材料主题准确选择分类，确保分类的准确性！',
  materialType: '根据材料实际性质进行选择，如方案，报告，清单等',
  tagKeyWords: '1、材料标签要突出材料主题，其中提及的合作项目简称，合作产品，客户简称等必须作为标签；<br/>' +
    '2、标签次序按照重要性排序；<br/>' +
    '3、标签数量必须3个以上。',
}