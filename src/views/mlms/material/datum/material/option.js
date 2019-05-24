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
    label: '创建时间',
    prop: 'createTime',
    width: '250',
  }, {
    label: '浏览次数',
    prop: 'views',
    width: '150',
  },
]

export function initSearchForm () {
  return {
    name: '',
    materialClsFirstClass: '',
    materialClsSecondClass: '',
    materialType: '',
    format: '',
    downloadCost: '',
    creatorRealName: '',
  }
}

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
    isContri: 0,
    attachFileList: [],
    attachFile: '',
    isOpen: 2,
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
    isOpen: 2,
    secrecyLevel: 0,
  }
}

var tagKeyWords = (rule, value, callback) => {
  if (value.length < 3) {
    callback(new Error())
  } else {
    callback()
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
    { validator: tagKeyWords, message: '请输入至少3个标签', trigger: 'change' },
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

export const tipContent = {
    materialName: '日期+项目名称/发文部门（单位）+材料主题+文件阶段标识，例如20190101资产管理与投融资委员会内网国脉贝管理办法v1.0',
    uploader:'作者为该材料撰写者，系统默认读取上传人为作者，如作者为其他人请做修改',
    intro:'1、材料内容主旨说明，如选取文中重要的段落；<br/>' +
    '2、字数控制在200字以内',
    firstClass:'根据材料主题准确选择分类，确保分类的准确性！',
    materialType:'根据材料实际性质进行选择，如方案，报告，清单等',
    downloadCost:'全体或多数国脉人需知晓的公司制度、文件、新生必读、分享培训等材料均不设定下载贝额，其余材料可自行设定，如材料质量与价格不符被纠错/差评/投诉将影响个人信用分。',
    tagKeyWords:'标签要突出材料主题且按照重要性排序，其中提及的合作项目简称，合作产品，客户简称等必须作为标签；',
    attachFileList:'附件仅支持DOC、PPT、TXT、PDF、XLS等形式的一个文件，大小限制在200M以内',
}
export const tipContent2  = {
    materialName:'1、文件主题+类型：如浙江省政府数字化转型的几点思考；（名称中切记出现特殊符号）',
    intro:'1、材料内容主旨说明；<br/>' +
    '2、字数在50字以上',
    content:'1、文章字体为默认字体；<br/>' +
    '2、文章标题标注使用规范：<br/>' +
    '①一级标题用一、二、三等标注；<br/>' +
    '②二级标题用（一）、（二）、（三）等标注；<br/>' +
    '③三级标题用1、2、3等标注；<br/>' +
    '④四级标题用（1）、（2）、（3）等标注；<br/>',
    firstClass:'根据材料主题准确选择分类，确保分类的准确性！',
    materialType:'根据材料实际性质进行选择，如方案，报告，清单等',
    tagKeyWords:'标签要突出材料主题且按照重要性排序，其中提及的合作项目简称，合作产品，客户简称等必须作为标签；',
}