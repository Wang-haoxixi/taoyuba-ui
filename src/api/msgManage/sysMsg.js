import request from '@/router/request'
const baseUrl = '/msg/govsysmsg'

//列表
export function fetchList (listQuery) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: listQuery,
  })
}

//查看
export function getInfo (id) {
  return request.post(`${baseUrl}/info/${id}`) 
}