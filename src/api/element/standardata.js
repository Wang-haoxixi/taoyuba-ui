import request from '@/router/request'
import exportDownload from '@/util/export'

const baseUrl = '/directory'

// 获取主表数据
export function getTableDataList (listQuery) {
  return request.get(`${baseUrl}/govtable/page`, {
    params: listQuery,
  })
}

// 删除主表数据
export function tableDelete (id) {
  return request.post(`${baseUrl}/govtable/logicDelete/${id}`)
}

// 编辑主表
export function tableEdit (formData) {
  return request.post(`${baseUrl}/govtable/update`, formData)
}

// 新增主表
export function tableNewly (formData) {
  return request.post(`${baseUrl}/govtable/create`, formData)
}

// 获取字表数据
export function getFieldsDataList (listQuery) {
  return request.get(`${baseUrl}/govfield/pageByTableId`, {
    params: listQuery,
  })
}

// 新增子表
export function fieldsNewly (formData, pid) {
  formData.tableId = pid
  return request.post(`${baseUrl}/govfield/create`, formData)
}

// 删除子表
export function fieldsDelete (id) {
  return request.post(`${baseUrl}/govfield/logicDelete/${id}`)
}

// 编辑字表
export function fieldsEdit (formData, pid) {
  formData.tableId = pid
  return request.post(`${baseUrl}/govfield/update`, formData)
}

// 下载模板
export function getExportDemo (params) {
  return request({
    url: `${baseUrl}/govtable/model_download`,
    method: 'post',
    headers: {
      responseType: 'arraybuffer',
    },
    data: params || {},
    responseType: 'blob',
  })
}

export function exportData (data) {
  return exportDownload({url: `${baseUrl}/govtable/download_data`, data: data})
}

export function querySql (id) {
  return request.post(`${baseUrl}/govtable/createTableSql`, {id: id})
}

export function downloadSql (id, name) {
  return exportDownload({url: `${baseUrl}/govtable/download_sql`, data: {id: id}, title: `${name}表SQL`})
}