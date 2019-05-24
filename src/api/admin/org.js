import request from '@/router/axios'

export function getOrgList (name) {
  return request({
    url: '/admin/org/list',
    method: 'get',
    params: {
      name,
    },
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/org/create',
    method: 'post',
    data: obj,
  })
}

export function fetchList (query) {
  return request({
    url: '/admin/org/page',
    method: 'get',
    params: query,
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/org/update',
    method: 'post',
    data: obj,
  })
}

export function delObj (id) {
  return request({
    url: '/admin/org/delete/' + id,
    method: 'post',
  })
}

export function reviewById (obj) {
  return request({
    url: '/admin/org/review/batch',
    method: 'post',
    data: obj,
  })
}

export function applyObj (obj) {
  return request({
    url: '/admin/org/apply',
    method: 'post',
    data: obj,
  })
}

export function applyPersonList (id) {
  return request({
    url: `/admin/org/apply/list/${id}`,
    method: 'get',
  })
}

export function passPerson (obj) {
  return request({
    url: '/admin/org/pass/join',
    method: 'post',
    data: obj,
  })
}

export function orgDetail () {
  return request({
    url: '/admin/org',
    method: 'get',
  })
}

export function gomsOpen () {
  return request({
    url: '/admin/org/update/open',
    method: 'post',
  })
}

export function gomsUserPage (query) {
  return request({
    url: '/admin/org/user/page',
    method: 'get',
    params: query,
  })
}
export function gomsRolePage (query) {
  return request({
    url: '/admin/role/org/page',
    method: 'get',
    params: query,
  })
}

export function userLock (id) {
  return request({
    url: `/admin/org/lock/${id}`,
    method: 'post',
    data: id,
  })
}

export function unSetManager (id) {
  return request({
    url: `/admin/org/unset/manager/${id}`,
    method: 'post',
  })
}
export function setManager (id) {
  return request({
    url: `/admin/org/set/manager/${id}`,
    method: 'post',
  })
}

export function gomsPass (id) {
  return request({
    url: `/admin/org/pass/join/${id}`,
    method: 'post',
    data: id,
  })
}
export function gomsReject (id) {
  return request({
    url: `/admin/org/reject/join/${id}`,
    method: 'post',
    data: id,
  })
}
export function userUnLock (id) {
  return request({
    url: `/admin/org/unlock/${id}`,
    method: 'post',
    data: id,
  })
}
export function delGomsUser (id) {
  return request({
    url: `/admin/org/fire/${id}`,
    method: 'post',
    data: id,
  })
}

export function delAllGomsUser (ids) {
  return request({
    url: '/admin/org/fires',
    method: 'post',
    data: ids,
  })
}
export function updateGomsUser (obj) {
  return request({
    url: '/admin/org/update/user/role',
    method: 'post',
    data: obj,
  })
}

export function getRoleOrgList () {
  return request({
    url: '/admin/role/org/list',
    method: 'get',
  })
}
export function getGomsInfo (id) {
  return request({
    url: `/admin/org/${id}`,
    method: 'get',
  })
}