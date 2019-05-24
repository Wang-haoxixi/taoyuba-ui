import request from '@/router/request'
import {baseUrl} from './index'
import exportDownload from '@/util/export'
let baseName = `${baseUrl}/dnadtele`
// 获取列表
export function getPage (params) {
  return request({
    url: `${baseName}/page`,
    method: 'get',
    params: params,
  })
}

// 新增
export function createData (params) {
  return request({
    url: `${baseName}/create`,
    method: 'post',
    data: params || {},
  })
}

// 编辑
export function updateData (params) {
  return request({
    url: `${baseName}/update`,
    method: 'post',
    data: params || {},
  })
}

// 批量删除
export function deleteBatch (params) {
  return request({
    url: `${baseName}/delete/batch`,
    method: 'post',
    data: params || [],
  })
}

// 导出时需要的数据
export function getExport () {
  return request({
    url: `${baseName}/fieldList`,
    method: 'get',
  })
}
// 模板导出
export function getExportDemo (params) {
  return exportDownload({url: `${baseName}/model_download`, data: params})
}
