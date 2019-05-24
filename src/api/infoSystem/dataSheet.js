import request from '@/router/request'
import exportDownload from '@/util/export'

const baseUrl = '/survey/dnatables'

export function getList (params) {
  return request.get(`${baseUrl}/getVoPage`, {
    params: params,
  })
}

export function deleteSheet (id) {
  return request.post(`${baseUrl}/delete/${id}`)
}

export function exportData (data = {}) {
  return exportDownload({url: `/survey/dnatables/tableexportData`, data, title: `数据表导出 ${new Date().getTime()}`})
}

export function buildCatalog (id) {
  return request.post(`${baseUrl}/create/${id}`)
}

export function editSheet (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

export function getFieldList (id) {
  return request({
    url: `${baseUrl}/seleteColsList/${id}`,
    method: 'post',
  })
}

export function batchDelete (ids) {
  return request.post(`${baseUrl}/allDelete`, ids)
}
