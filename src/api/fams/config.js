import request from '@/router/axios'

const prefixUrl = '/fams/config'
// @/api/fams/config

export function getOneConfig () {
  return request({
    url: `${prefixUrl}/1`,
    method: 'get',
  })
}