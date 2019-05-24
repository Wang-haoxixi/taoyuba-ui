import request from '@/router/axios'

export function getFormReviewPage (query) {
  return request({
    url: '/cbs/form_review/page',
    method: 'get',
    params: query,
  })
}

export function reviewForm (id, body) {
  return request({
    url: `/cbs/material/review/${id}`,
    method: 'post',
    data: body,
  })
}

export function batchReviewForm (ids, body) {
  return request({
    url: '/cbs/material/review',
    method: 'post',
    data: {
      ...body,
      ids,
    },
  })
}

export function publishForm (id) {
  return request({
    url: `/cbs/material/review/${id}`,
    method: 'post',
    data: {
      status: 5,
    },
  })
}