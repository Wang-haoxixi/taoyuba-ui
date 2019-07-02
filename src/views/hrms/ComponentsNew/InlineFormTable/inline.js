import request from '@/router/axios'

const prefixUrl = '/hrms/relation'
// @/api/hrms/employee_profile
export function post (obj, relationName, type, rid) {
  return request({
    url: `${prefixUrl}/${relationName}/create`,
    method: 'post',
    params: {
      type,
      id: rid,
    },
    data: obj,
  })
}
export function put (obj, relationName) {
  return request({
    url: `${prefixUrl}/${relationName}/update`,
    method: 'post',
    data: obj,
  })
}
export function del (id, relationName) {
  return request({
    url: `${prefixUrl}/${relationName}/delete/${id}`,
    method: 'post',
  })
}