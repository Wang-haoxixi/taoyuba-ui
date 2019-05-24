import request from '@/router/axios'

const prefixUrl = '/fams/total'
// @/api/fams/total
export function getTotal () {
  return request({
    url: `${prefixUrl}`,
    method: 'get',
  })
}

export function reward (obj) {
  return request({
    url: `${prefixUrl}/reward`,
    method: 'post',
    data: obj,
  })
}