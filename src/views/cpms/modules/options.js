// org config options
const dictsMap = {
  schedule: {
    1: '立项',
    2: '研发中',
    3: '测试',
    4: '验收中',
    5: '已上架',
  },
}

const columnsMap = [
]

const Column = {
  id: '',
  name: '', // 名字
  imageUrl: '', // logo
  synopsis: '', // 简介
  userRelationCharges: [], // 负责人s
}

const initForm = () => {
  return {
    id: '', // ID
    imageUrl: '', // logo
    number: '', // 编号
    name: '', // 名称
    type: '', // 类别
    website: '', // 测试地址
    guidePrice: '', // 模块指导价
    preferentialPrice: '', // 模块优惠价
    synopsis: '', // 简介
    description: '', // 介绍
    schedule: 1,//研发进度（1-立项，2-研发中，3-测试，4-验收中，5-已上架）
    versions: [],//版本集合
    productRelations: [],//产品关联集合
    technologyRelations: [],//技术关联集合
    materialRelations: [],//材料关联集合
    userRelationCharges: [],//负责人集合
    userRelationDemands: [],//需求方集合
    userRelationTechnologys: [],//技术经理集合
    userRelationProducts: [],//产品经理集合
    userRelationTeams: [],//团队成员集合
    tagKeywords: [],//关联标签
  }
}

const toDtoForm = (row) => {
  const newForm = { ...row }
  newForm.userCharges = row.userRelationCharges.map(m => m.id)
  newForm.userDemands = row.userRelationDemands.map(m => m.id)
  newForm.userTechnologys = row.userRelationTechnologys.map(m => m.id)
  newForm.userProducts = row.userRelationProducts.map(m => m.id)
  newForm.userTeams = row.userRelationTeams.map(m => m.id)

  newForm.products = row.productRelations.map(m => m.id)
  newForm.technologys = row.technologyRelations.map(m => m.id)
  newForm.materials = row.materialRelations.map(m => m.id)

  delete newForm.userRelationCharges
  delete newForm.userRelationDemands
  delete newForm.userRelationTechnologys
  delete newForm.userRelationProducts
  delete newForm.userRelationTeams
  delete newForm.productRelations
  delete newForm.technologyRelations
  delete newForm.materialRelations

  return newForm
}

const initSearchForm = () => {
  return {
    type: '',
    schedule: '',
  }
}

const rules = {
  imageUrl: [
    { required: true, message: '请上传图片', trigger: 'blur' },
  ],
  number: [
    { required: true, message: '请填写模块编号', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请填写模块名称', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请选择模块分类', trigger: 'blur' },
  ],
  website: [
    { required: true, message: '请选择测试地址', trigger: 'blur' },
  ],
  guidePrice: [
    { required: true, message: '请填写模块指导价', trigger: 'blur' },
  ],
  preferentialPrice: [
    { required: true, message: '请填写模块优惠价', trigger: 'blur' },
  ],
  tagKeywords: [
    { type: 'array', min: 3, message: '标签至少 3 个', trigger: 'change' },
    { type: 'array', required: true, message: '请填写标签', trigger: 'change' },
  ],
  synopsis: [
    { required: true, message: '请填写模块简介', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请填写模块介绍', trigger: 'blur' },
  ],
  userRelationCharges: [
    { required: true, type: 'array', message: '请填写负责人', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, Column, initForm, toDtoForm, initSearchForm, rules }
