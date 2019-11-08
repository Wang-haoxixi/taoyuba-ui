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

  export function deleteClass (id) {
    return request({
      url: `${prefixUrl}/del/${id}`,
      method: 'post',
    })
  }

  export function detailClass (id) {
    return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
    })
  }

  export function updateClass (data) {
    return request({
      url: `${prefixUrl}/update`,
      method: 'post',
      data: data,
    })
  }