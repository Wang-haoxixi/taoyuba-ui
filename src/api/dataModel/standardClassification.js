import request from '@/router/request'
const baseUrl = '/datamodel/dnamodelclassification'
const baseStandardDataUrl = '/datamodel/dnamodelstandarddata'

// 获取标准分类数据
export function getPage (listQuery) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: listQuery,
  })
}

//获取标准数据源数据
export function getStandardDataPage (listQuery) {
  return request({
    url: `${baseStandardDataUrl}/page`,
    method: 'get',
    params: listQuery,
  })
}

//新增标准分类
export function addClassification (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//修改标准分类
export function updateClassification (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

//逻辑删除标准分类
export function logicDelete (id) {
  return request.post(`${baseUrl}/logicDelete/${id}`)
}

//批量逻辑删除标准分类
export function batchLogicDelete (ids) {
  return request.post(`${baseUrl}/batchLogicDelete/`, ids)
}