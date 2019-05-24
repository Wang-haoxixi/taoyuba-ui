import request from '@/router/request'

const prefixUrl = '/mat/matmatter'
// 获取树形表单数据
export function getTagPage (opts) {
  return request({
    url: `${prefixUrl}/page`,
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
