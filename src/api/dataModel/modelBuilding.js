import request from '@/router/request'
const baseUrl = '/datamodel/dnamodeldbs'

export function getDbPage (listQuery) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: listQuery,
  })
}

export function modelEditSave (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

export function modelCreateSave (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

export function modelDbDelete (id) {
  return request.post(`${baseUrl}/logicDelete/${id}`)
}