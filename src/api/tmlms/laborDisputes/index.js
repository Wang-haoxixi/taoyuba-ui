import request from '@/router/axios'
const prefixUrl = '/tmlms/dispute'

export function getPage (params) {
    return request({
        url: `${prefixUrl}/getPage`,
        method: 'get',
        params: params,
    })
}

export function createPage (params) {
  return request({
      url: `${prefixUrl}/create`,
      method: 'post',
      data: params,
  })
}

export function editPage (params) {
  return request({
      url: `${prefixUrl}/edit?type=${params.type}`,
      method: 'post',
      data: params,
  })
}

export function removePage (id) {
  return request({
      url: `${prefixUrl}/remove/${id}`,
      method: 'post',
  })
}

export function getPageById (id) {
  return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
  })
}