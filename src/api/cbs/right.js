import request from '@/router/axios'

export function getRightPage (query) {
  const q = {
    type: 1,
  }
  const newQuery = { ...q, ...query }
  return request({
    url: '/cbs/guide/page',
    method: 'get',
    params: newQuery,
  })
}
