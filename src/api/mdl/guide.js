import request from '@/router/axios'

export function getGuidePage (query) {
  return request({
    url: '/mdl/guide/page',
    method: 'get',
    params: query,
  })
}

export function getGuideById (id) {
  return request({
    url: `/mdl/guide/${id}`,
    method: 'get',
  })
}

export function deleteGuide (ids) {
  return request({
    url: '/mdl/guide/delete',
    method: 'post',
    data: ids,
  })
}

export function deleteGuideById (id) {
  return request({
    url: `/mdl/guide/delete/${id}`,
    method: 'post',
  })
}
