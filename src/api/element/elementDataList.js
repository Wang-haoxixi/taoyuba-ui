import request from '@/router/request'

export function getList (params) {
  return request.get('/directory/govresrc/infoStatistics', {
    params: params,
  })
}