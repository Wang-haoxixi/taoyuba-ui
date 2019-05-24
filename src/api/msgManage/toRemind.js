import request from '@/router/request'
const baseUrl = '/msg/govmsgdoremind'

//分页
export function fetchList (listQuery) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: listQuery,
  })
}

//批量已读
export function batchRead (ids) {
  return request.post(`${baseUrl}/batchRead`, ids)
}
