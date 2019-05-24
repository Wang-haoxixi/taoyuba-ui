import request from '@/router/request'
import {baseUrl} from './index'
let baseName = `${baseUrl}/dnainfoitem`
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
