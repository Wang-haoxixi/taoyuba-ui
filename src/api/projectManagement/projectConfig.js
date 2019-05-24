import request from '@/router/request'
const baseUrl = '/proj/dnaprojectconfig'
export function getProjectConfigPage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}

//新增
export function createConfig (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//修改
export function updateConfig (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

//删除
export function deleteConfig (id) {
  return request.post(`${baseUrl}/logicDelete/${id}`)
}

//字典下拉
export function getDictSelect () {
  return request({
    url: `/admin/dict/getDictSelect`,
    method: 'get',
  })
}

//字段重复校验
export function checkField (params) {
  return request({
    url: `${baseUrl}/checkField`,
    method: 'get',
    params: params || {},
  })
}


