import request from '@/router/request'

const baseUrl = '/survey/dnacolumns'

export function getList (params) {
  return request.get(`${baseUrl}/getVoPage`, {
    params: params,
  })
}

export function deleteFields (id) {
  return request.post(`${baseUrl}/delete/${id}`)
}

export function updateFields (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

export function batchDelete (ids) {
  return request.post(`${baseUrl}/allDelete`, ids)
}
