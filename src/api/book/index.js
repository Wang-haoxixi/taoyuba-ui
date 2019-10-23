import request from '@/router/axios'
const prefixUrl = '/tybhrms/tybbook'

export function createBook (data) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data: data,
  })
}

export function getBookList (params) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: params,
    })
  }

  export function getBookDetail (id) {
    return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
    })
  }

  export function delBook (id) {
    return request({
      url: `${prefixUrl}/del/${id}`,
      method: 'post',
    })
  }

  export function updateBook (data) {
    return request({
      url: `${prefixUrl}/update`,
      method: 'post',
      data: data,
    })
  }