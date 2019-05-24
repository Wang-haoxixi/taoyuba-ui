import request from '@/router/axios'

export function getServicePage (query) {
  const q = {
    type: 2,
  }
  const newQuery = { ...q, ...query }
  return request({
    url: '/cbs/guide/page',
    method: 'get',
    params: newQuery,
  })
}

export function postService (obj) {
  return request({
    url: '/cbs/guide/create',
    method: 'post',
    data: obj,
  })
}
