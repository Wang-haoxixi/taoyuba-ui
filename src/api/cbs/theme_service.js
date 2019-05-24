import request from '@/router/axios'

export function getThemePage (query) {
  return request({
    url: '/cbs/theme/page',
    method: 'get',
    params: query,
  })
}

export function getThemeById (id) {
  return request({
    url: `/cbs/theme/${id}`,
    method: 'get',
  })
}

export function getFlowChartById (id) {
  return request({
    url: `/cbs/theme/flow_chart/${id}`,
    method: 'get',
  })
}

export function postTheme (obj) {
  return request({
    url: '/cbs/theme/create',
    method: 'post',
    data: obj,
  })
}

export function putTheme (obj) {
  return request({
    url: '/cbs/theme/update',
    method: 'post',
    data: obj,
  })
}

export function deleteThemeById (id) {
  return request({
    url: `/cbs/theme/delete/${id}`,
    method: 'post',
  })
}

export function deleteTheme (ids) {
  return request({
    url: '/cbs/theme/delete',
    method: 'post',
    data: ids,
  })
}

export function submitTheme (id) {
  return request({
    url: `/cbs/theme/submit/${id}`,
    method: 'get',
  })
}

export function reviewTheme (id, body) {
  return request({
    url: `/cbs/theme/review/${id}`,
    method: 'post',
    data: body,
  })
}

export function publishTheme (id) {
  return request({
    url: `/cbs/theme/review/${id}`,
    method: 'post',
    data: {
      status: 5,
    },
  })
}

export function batchReviewTheme (ids, body) {
  return request({
    url: '/cbs/theme/review',
    method: 'post',
    data: {
      ...body,
      ids,
    },
  })
}