import request from '@/router/axios'
const prefixUrl = '/tybhrms/tybtrainsign'

export function getSignPage (params) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: params,
    })
  }
