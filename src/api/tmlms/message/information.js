import request from '@/router/axios'

const prefixUrl = '/tmlms/sysMsg'
// @/api/wel/index
export function getPage (query) {
  return request({
    url: `${prefixUrl}/page`,
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

export function getCount (query) {
  return request({
    url: `${prefixUrl}/count`,
    method: 'get',
    params: query,
  })
}

