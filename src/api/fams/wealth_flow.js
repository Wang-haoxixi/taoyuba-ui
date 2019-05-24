import request from '@/router/axios'

const prefixUrl = '/fams/wealth_flow'
// @/api/fams/wealth_flow
export function getWealthFlowPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}