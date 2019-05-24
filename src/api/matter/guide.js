import request from '@/router/request'

const prefixUrl = '/mat/matguide'
// 获取树形表单数据
export function getData (opts) {
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

export function deleteTagById (ids) {
  return request({
    url: `${prefixUrl}/del`,
    method: 'post',
    data: ids,
  })
}
