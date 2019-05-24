import request from '@/router/request'
const baseUrl = '/datamodel/dnamodelstandarddata'
const baseDetailUrl = '/datamodel/dnamodelstandarddetail'

// 获取标准数据元
export function getPage (listQuery) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: listQuery,
  })
}

//获取标准数据元子表
export function getDetailPage (listQuery) {
  return request({
    url: `${baseDetailUrl}/page`,
    method: 'get',
    params: listQuery,
  })
}

//逻辑删除
export function logicDelete (id) {
  return request.post(`${baseUrl}/logicDelete/${id}`)
}
