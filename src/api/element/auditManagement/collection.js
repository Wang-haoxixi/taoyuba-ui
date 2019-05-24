import request from '@/router/request'

export function getMainTableData (params) {
  params.collectStatus = '2'
  return request({
    url: `/directory/dnacollects/page`,
    method: 'get',
    params: params || {},
  })
}

export function auditPass (data) {
  return request.post('/directory/dnacollects/audit', data)
}

export function auditReject (data) {
  return request.post('/directory/dnacollects/audit', data)
}