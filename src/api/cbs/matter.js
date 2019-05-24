import request from '@/router/axios'

export function getMatterTree (query) {
  return request({
    url: '/cbs/matter/tree',
    method: 'get',
    params: query,
  })
}

export function getMatterNRPage (query) {
  return request({
    url: '/cbs/matter/nr_page',
    method: 'get',
    params: query,
  })
}

export function getMatterById (id) {
  return request({
    url: `/cbs/matter/${id}`,
    method: 'get',
  })
}

export function postMatter (obj) {
  return request({
    url: '/cbs/matter/create',
    method: 'post',
    data: obj,
  })
}

export function putMatter (obj) {
  return request({
    url: '/cbs/matter/update',
    method: 'post',
    data: obj,
  })
}

export function deleteMatterById (id) {
  return request({
    url: `/cbs/matter/delete/${id}`,
    method: 'post',
  })
}
export function deleteMatterByIds (ids) {
  return request({
    url: '/cbs/matter/delete',
    method: 'post',
    data: ids,
  })
}

export function submitMatter (id) {
  return request({
    url: `/cbs/matter/submit/${id}`,
    method: 'get',
  })
}

export function reviewMatter (id, body) {
  return request({
    url: `/cbs/matter/review/${id}`,
    method: 'post',
    data: body,
  })
}
export function batchReviewMatter (ids, body) {
  return request({
    url: '/cbs/matter/review',
    method: 'post',
    data: {
      ...body,
      ids,
    },
  })
}

export function publishMatter (id) {
  return request({
    url: `/cbs/matter/review/${id}`,
    method: 'post',
    data: {
      status: 5,
    },
  })
}

export function templateMatter (id) {
  return request({
    url: `/cbs/matter/template/${id}`,
    method: 'post',
  })
}

export function cancelTemplateMatter (id) {
  return request({
    url: `/cbs/matter/cancel_template/${id}`,
    method: 'post',
  })
}
