import request from '@/router/axios'

const prefixUrl = '/tybhrms/databuspayload'

export function getDataBuspayLoad (query) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: query,
    })
  }