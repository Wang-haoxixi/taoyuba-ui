import request from '@/router/axios'

const prefixUrl = '/tmlms/bulletin'
// @/api/wel/index
export function getPage (query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}
export function getPageById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
export function createPosPage (query) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: query,
  })
}