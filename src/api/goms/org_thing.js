import request from '@/router/axios'

const prefixUrl = '/admin/org_thing'
//组织大事记
export function geOrgPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}
export function reviewApprovaBatch (obj) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: 'post',
    data: obj,
  })
}
export function addObj (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
export function putOrg (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
export function deleteJobById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}
export function deleteJobBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}