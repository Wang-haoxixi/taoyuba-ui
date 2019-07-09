import request from '@/router/axios'

const prefixUrl = '/hrms/databuspayload'

export function getDataBuspayLoad (query) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: query,
    })
  }