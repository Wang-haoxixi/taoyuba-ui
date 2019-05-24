import request from '@/router/axios'

export function postGuide (obj) {
  return request({
    url: '/cbs/guide/create',
    method: 'post',
    data: obj,
  })
}

export function getGuidePage (query) {
  return request({
    url: '/cbs/guide/page',
    method: 'get',
    params: query,
  })
}

export function getGuideById (id) {
  return request({
    url: `/cbs/guide/${id}`,
    method: 'get',
  })
}

export function putGuide (obj) {
  return request({
    url: '/cbs/guide/update',
    method: 'post',
    data: obj,
  })
}

export function deleteGuideById (id) {
  return request({
    url: `/cbs/guide/delete/${id}`,
    method: 'post',
  })
}

export function deleteGuide (ids) {
  return request({
    url: '/cbs/guide/delete',
    method: 'post',
    data: ids,
  })
}

export function submitGuide (id) {
  return request({
    url: `/cbs/guide/submit/${id}`,
    method: 'get',
  })
}

export function reviewGuide (id, body) {
  return request({
    url: `/cbs/guide/review/${id}`,
    method: 'post',
    data: body,
  })
}

export function batchReviewGuide (ids, body) {
  return request({
    url: '/cbs/guide/review',
    method: 'post',
    data: {
      ...body,
      ids,
    },
  })
}

export function publishGuide (id) {
  return request({
    url: `/cbs/guide/review/${id}`,
    method: 'post',
    data: {
      status: 5,
    },
  })
}
export function getGuideList (ids) {
  return request({
    url: '/cbs/guide/getGuideList',
    method: 'post',
    data: ids,
  })
}

export function getListByGuidIds (ids) {
  return request({
    url: '/cbs/guide/getListByGuidIds',
    method: 'post',
    data: ids,
  })
}
