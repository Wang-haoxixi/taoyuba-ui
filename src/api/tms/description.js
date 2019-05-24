import request from '@/router/axios'

const prefixUrl = '/tms'
// @/api/tms/tag
export function getTagDescriptionPageByTagId (id) {
  return request({
    url: `${prefixUrl}/description/page/${id}`,
    method: 'get',
  })
}
export function putTagDesc (obj) {
  return request({
    url: `${prefixUrl}/description/update`,
    method: 'post',
    data: obj,
  })
}
export function deleteTagDescById (id) {
  return request({
    url: `${prefixUrl}/description/delete/${id}`,
    method: 'post',
  })
}
