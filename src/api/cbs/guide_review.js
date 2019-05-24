import request from '@/router/axios'

export function getGuideReviewPage (query) {
  const q = {
    auditState: 2,
  }
  const newQuery = { ...q, ...query }
  return request({
    url: '/cbs/guide/page',
    method: 'get',
    params: newQuery,
  })
}
