import request from '@/router/axios'

export function getThemePage (query) {
  return request({
    url: '/mdl/theme/page',
    method: 'get',
    params: query,
  })
}

export function getThemeById (id) {
  return request({
    url: `/mdl/theme/${id}`,
    method: 'get',
  })
}

export function deleteTheme (ids) {
  return request({
    url: '/mdl/theme/delete',
    method: 'post',
    data: ids,
  })
}
export function getFlowChartById (id) {
  return request({
    url: `/mdl/theme/flow_chart/${id}`,
    method: 'get',
  })
}
export function deleteThemeById (id) {
  return request({
    url: `/mdl/theme/delete/${id}`,
    method: 'post',
  })
}
