import request from '@/router/axios'
const prefixUrl = '/tybhrms/tybtrain'

export function getClassPage (query) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: query,
    })
  }

  export function saveClass (data) {
    return request({
      url: `${prefixUrl}/save`,
      method: 'post',
      data: data,
    })
  }