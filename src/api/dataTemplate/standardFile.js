import {baseUrl} from './index'
import request from '@/router/request'
import exportDownload from '@/util/export'
let baseName = `${baseUrl}/dnastddoc`

// 获取列表
export function getPage (params) {
  return request({
    url: `${baseName}/page`,
    method: 'get',
    params: params || {},
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
// 改变状态
export function changeState (params) {
  return request({
    url: `${baseName}/changeState`,
    method: 'post',
    data: params || [],
  })
}

// 标准
export function getStandard () {
  return request({
    url: `${baseName}/list`,
    method: 'get',
  })
}
// 根据领域分类ID获取标准文件列表
export function getStandardByDomainClassification (params) {
  return request({
    url: `${baseName}/stdDocList`,
    method: 'get',
    params: params || {},
  })
}
// 根据标准文件ID获取数据集和代码集列表
export function getDataByStandard (params) {
  return request({
    url: `${baseName}/dtcdCollList`,
    method: 'get',
    params: params || {},
  })
}

//根据标准文件ID获取提供方和领域
export function getStandardInfoById (params) {
  return request({
    url: `${baseName}/stdDocInfo/${params.id}`,
    method: 'get',
    // params: params || {},
  })
}
//下载
export function downloadData ({params, title}) {
  return exportDownload({url: `${baseName}/download`,method: 'post',data: params, title})
}
