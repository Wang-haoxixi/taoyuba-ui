import request from '@/router/request'

const prefixUrl = '/zqq/mould'
// 获取正常表单数据
export function getTagPage (opts) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: opts,
  })
}

// 获取树形表单数据
export function getTreeData (opts) {
  return request({
    url: `${prefixUrl}/treelist`,
    method: 'get',
    params: opts,
  })
}

export function postTag (obj) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data: obj,
  })
}

export function deleteTagById (ids) {
  return request({
    url: `${prefixUrl}/del`,
    method: 'post',
    data: ids,
  })
}
