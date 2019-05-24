import { mergeByFirst } from '@/util/util'
const initForm = () => {
  return {
    clientId: '',
    clientName: '', //客户名称
    clientTypeKey: [], //客户类型
    districtType: '', // 区域类型
    businessTypeKey: [], // 业务类型
    specificBusinessType: '', //具体业务类型
    clientRela: '', //客户关系
    followUpStatus: '', // 跟进状态
    marketManager: '', // 市场经理
    Manager: '',
    lastTime: '', // 距离上次拜访已有(全部客户没有但依然存着)
    iepClientRespDept: {
      id: '',
      name: '',
    }, //负责部门
    companyUrl: '', //单位网址
    companyFunction: '', //单位职能
    contractAddress: '', //单位地址
    otherDesc: '', //其他说明
    tags: [],
    collaborations: [],
    assertionsSave: 1,
  }
}
// 全部客户搜索
const allSearchForm = () => {
  return {
    type: '',
    clientName: '',
    districtType: '',
    clientRela: '',
    followUpStatus: '',
    businessTypeKey: [],
    marketManager: '',
    deptName: '',
  }
}
// 我的客户/协作客户搜索
const initSearchForm = () => {
  return {
    type: '',
    clientName: '',
    districtType: '',
    clientRela: '',
    followUpStatus: '',
    businessTypeKeyString: '',
    timeSerach: '',
  }
}
const formToDto = form => {
  const newForm = mergeByFirst(initSearchForm(), form)
  return newForm
}
export { initSearchForm, allSearchForm, initForm, formToDto }
