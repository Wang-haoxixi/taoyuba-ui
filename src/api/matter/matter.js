import request from '@/router/request'

const prefixUrl = '/mat/matmatter'
// 获取树形表单数据
export function getTreeData (opts) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: opts,
  })
}

export function saveTag (obj) {
  return request({
    url: `${prefixUrl}`,
    method: 'post',
    data: obj,
  })
}

export function postTag (obj) {
  return request({
    url: `${prefixUrl}/upd`,
    method: 'post',
    data: obj,
  })
}

// 提交、审核
export function auditTag (obj) {
  return request({
    url: `${prefixUrl}/audit`,
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
