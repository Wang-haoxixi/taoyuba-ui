import request from '@/router/axios'

const prefixUrl = '/admin/org'
// @/api/goms/org
export function getOrgBySelf () {
  return request({
    url: `${prefixUrl}`,
    method: 'get',
  })
}

export function getOrgById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function getOrgLogList (current) {
  return request({
    url: `${prefixUrl}/log_list`,
    method: 'get',
    params: {
      current,
    },
  })
}

export function putOrg (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function getOrgNoAdminUserList () {
  return request({
    url: `${prefixUrl}/no_admin_user/list`,
    method: 'get',
  })
}

export function unSetOrgAdmin (id) {
  return request({
    url: `${prefixUrl}/unset/admin/${id}`,
    method: 'get',
  })
}

export function setOrgAdmin (id) {
  return request({
    url: `${prefixUrl}/set/admin/${id}`,
    method: 'get',
  })
}

export function toggleOrgOpen () {
  return request({
    url: `${prefixUrl}/update/open`,
    method: 'get',
  })
}

export function validOrgName (name) {
  return request({
    url: `${prefixUrl}/repeat/${name}`,
    method: 'get',
  })
}

export function getOrgList (name) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: {
      name,
    },
  })
}

export function addObj (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function applyObj (obj) {
  return request({
    url: `${prefixUrl}/apply`,
    method: 'post',
    data: obj,
  })
}

export function pullUser (ids) {
  return request({
    url: `${prefixUrl}/pull`,
    method: 'post',
    data: ids,
  })
}

export function passJoins (obj) {
  return request({
    url: `${prefixUrl}/pass/joins`,
    method: 'post',
    data: obj,
  })
}