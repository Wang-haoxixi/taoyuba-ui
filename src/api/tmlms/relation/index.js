import request from '@/router/axios'

const prefixUrl = '/tmlms/relationship'
// @/api/wel/index
export function getPage (query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}

export function getPageById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function removePage (query) {
  return request({
    url: `${prefixUrl}/remove`,
    method: 'post',
    params: query,
  })
}

export function updatePage (query) {
  return request({
    url: `${prefixUrl}/edit`,
    method: 'post',
    data: query,
  })
}

export function createPage (query) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: query,
  })
}

export function getPageLast (query) {
  return request({
    url: `${prefixUrl}/getLast`,
    method: 'get',
    params: query,
  })
}