import request from '@/router/axios'
const prefixUrl = '/tybhrms/tybtrainsign'

export function getSignPage (query) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: query,
    })
  }
