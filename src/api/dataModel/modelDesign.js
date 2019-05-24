import request from '@/router/request'
import exportDownload from '@/util/export'

const baseUrlBD = '/datamodel/dnamodeldbs'
const baseUrlSheet = '/datamodel/dnamodeltable'
const baseUrlColl = '/datamodule/dnadtcoll'
const baseUrlField = '/datamodel/dnamodelfield'
const baseUrlDtEle = '/datamodule/dnadtele'
const baseUrlStandardData = '/datamodel/dnamodelstandarddata'


export function getMainTableData (params) {
  return request.get(`${baseUrlSheet}/page`, {
    params: params,
  })
}

export function getModelTableData (params) {
  return request.get(`${baseUrlColl}/page`, {
    params: params,
  })
}

export function getDbList () {
  return request.get(`${baseUrlBD}/getDbSelect`)
}

// 模型设计标准新增表及字段
export function saveTableField (formData) {
  return request.post(`${baseUrlSheet}/saveTableField`, formData)
}

// 模型设计修改表及字段
export function updateTableField (formData) {
  return request.post(`${baseUrlSheet}/updateTableField`, formData)
}

// 模型设计获取字段分页
export function getFieldData (params) {
  return request.get(`${baseUrlField}/page`, {
    params: params,
  })
}

// 逻辑删除模型设计
export function deleteTableField (id) {
  return request.post(`${baseUrlSheet}/logicDelete/${id}`)
}

// 查看sql
export function querySql (id) {
  return request.get(`${baseUrlSheet}/createTableSql/${id}`)
}

// 导出excel
export function exportExcel (data) {
  return exportDownload({url: `${baseUrlSheet}/downloadData`, data: data})
}

// 模型数据元page
export function getModelDataEleTableData (params) {
  return request.get(`${baseUrlDtEle}/page`, {
    params: params,
  })
}

// 标准数据元page
export function getModelStandardDataPage (params) {
  return request.get(`${baseUrlStandardData}/page`, {
    params: params,
  })  
}