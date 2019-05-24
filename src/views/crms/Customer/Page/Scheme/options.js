export const dictsMap = {
  type: {
    '1': '类型1',
    '2': '类型2',
  },
  isYes: [{ value: 0, lable: '否' }, { value: 1, label: '是' }],
  isOpen: [{ value: 0, lable: '开放' }, { value: 1, label: '关闭' }],
  secrecyLevel: [{ value: 0, lable: '不保密' }, { value: 1, label: '保密' }],
}

const rules = {
  materialName: [{ required: true, message: '必填', trigger: 'blur' }],
  intro: [{ required: true, message: '必填', trigger: 'blur' }],
  content: [{ required: true, message: '必填', trigger: 'blur' }],
  firstClass: [{ required: true, message: '必填', trigger: 'change' }],
  secondClass: [{ required: true, message: '必填', trigger: 'change' }],
  materialType: [{ required: true, message: '必填', trigger: 'change' }],
  tagKeyWords: [{ required: true, message: '必填', trigger: 'change' }],
  isContri: [{ required: true, message: '必填', trigger: 'change' }],
  downloadCost: [{ required: true, message: '必填', trigger: 'change' }],
  uploader: [{ required: true, message: '必填', trigger: 'change' }],
  isOpen: [{ required: true, message: '必填', trigger: 'change' }],
  secrecyLevel: [{ required: true, message: '必填', trigger: 'change' }],
  attachFileList: [{ required: true, message: '必填', trigger: 'change' }],
}

export const tipContent = {
  materialName:
    '1、市场项目类文件：日期+项目名称/编号+文件描述+文件阶段标识，例如20190101丽水市信息化项目建设方案编制说明v1.0；<br/>' +
    '2、政策规范制度类文件：日期+发布部门/单位+文件主题+文件阶段标识，例如20190101资产管理与投融资委员会发布关于国脉贝管理v1.0；<br/>' +
    '3、学习资源类材料：文件主题+类型：如浙江省政府数字化转型的几点思考；<br/>' +
    '备注：名称中切记出现特殊符号',
  uploader:
    '1、材料撰写者；<br/>' +
    '2、系统默认读取上传人为作者，如代替上传请修改姓名。',
  intro: '1、材料内容主旨说明；<br/>' + '2、字数在200字以内',
  firstClass: '根据材料主题准确选择分类，确保分类的准确性！',
  materialType: '根据材料实际性质进行选择，如方案，报告，清单等',
  downloadCost:
    '1、全体或多数国脉人知晓的公司制度、文件、新生必读等材料均不设定下载贝额；<br/>' +
    '2、线上或线下分享培训类相关材料不可设定下载贝额；<br/>' +
    '3、常规材料不高于10（普遍性公共性，比如方案、研究报告模板等），特殊领域应用不高于50贝。',
  tagKeyWords:
    '1、材料标签要突出材料主题，其中提及的合作项目简称，合作产品，客户简称等必须作为标签；<br/>' +
    '2、标签次序按照重要性排序；<br/>' +
    '3、标签数量必须3个以上。',
  attachFileList:
    '1、附件上传形式多样，如DOC、PPT、TXT、PDF、XLS；<br/>' +
    '2、材料只支持1个文件上传，大小限制在200M以内。',
}

const initForm = () => {
  return {
    atchUpload: '',
    avatar: '',
    programName: '',
    clientId: '',
    creator: '',
    realName: '',
    attachs: [],
    attach: '',
    materialId: '',
  }
}
// 本地上传
const initLocalForm = () => {
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
const tableOption = [
  {
    label: '创建时间',
    prop: 'createTime',
  },
  {
    label: '浏览次数',
    prop: 'views',
    width: '100',
  },
]

export { initForm, tableOption, rules, initLocalForm }
