import request from '@/router/axios'

const prefixUrl = '/tybhrms/databuspayload'

export function getDataBuspayLoad (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getLastData (query) {
  return request({
    url: `${prefixUrl}/getlast`,
    method: 'get',
    params: query,
  })
}