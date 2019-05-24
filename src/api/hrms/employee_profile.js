import request from '@/router/axios'

const prefixUrl = '/hrms/employee_profile'
// @/api/hrms/employee_profile
export function getEmployeeProfilePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getEmployeeProfileById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function getEmployeeProfileSelf () {
  return request({
    url: `${prefixUrl}/self`,
    method: 'get',
  })
}

export function putEmployeeProfile (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function getGrowthFile (id) {
  return request({
    url: `${prefixUrl}/growth_file/${id}`,
    method: 'get',
  })
}

export function postInduction (obj) {
  return request({
    url: `${prefixUrl}/induction`,
    method: 'post',
    data: obj,
  })
}

export function postPositive (obj) {
  return request({
    url: `${prefixUrl}/positive`,
    method: 'post',
    data: obj,
  })
}

export function postDeparture (obj) {
  return request({
    url: `${prefixUrl}/departure`,
    method: 'post',
    data: obj,
  })
}

export function postTransfer (obj) {
  return request({
    url: `${prefixUrl}/transfer`,
    method: 'post',
    data: obj,
  })
}
