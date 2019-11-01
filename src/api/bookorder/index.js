import request from  '@/router/axios'    
const prefixUrl = '/tybhrms/tybbookorder'

export function saveBookOrder (data) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data,
  })
} 

export function getBookOrderList (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
} 

export function getBookOrderDetail (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
} 

export function cancelBookOrder (id) {
  return request({
    url: `${prefixUrl}/cancel/${id}`,
    method: 'post',
  })
}