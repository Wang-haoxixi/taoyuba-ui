import request from '@/router/axios'

const prefixUrl = '/tms/tag'
// @/api/tms/index
export function getTagList (query) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: query,
  })
}