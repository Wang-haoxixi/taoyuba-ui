import request from '@/router/axios'

export function getMatterReviewPage (query) {
  return request({
    url: '/cbs/matter/page',
    method: 'get',
    params: query,
  })
}
