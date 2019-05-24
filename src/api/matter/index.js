import request from '@/router/request'

export function countByArea () {
  return request({
    url: '/mat/release/countByArea',
    method: 'get',
  })
}