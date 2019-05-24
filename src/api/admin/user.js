import request from '@/router/axios'

// const prefixUrl = '/admin/user'

export function fetchList (query) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params: query,
  })
}

export function resetPassByUserId (id) {
  return request({
    url: `/admin/user/reset/password/${id}`,
    method: 'get',
  })
}

export function gomsNoJoinUserPage (query) {
  return request({
    url: '/admin/user/no_join/page',
    method: 'get',
    params: query,
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: obj,
  })
}

export function getObj (id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get',
  })
}

export function delObj (id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete',
  })
}

export function putUser (obj) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    data: obj,
  })
}

export function getDetails (obj) {
  return request({
    url: '/admin/user/details/' + obj,
    method: 'get',
  })
}
export function setOrg (id) {
  return request({
    url: '/admin/user/set/org/' + id,
    method: 'post',
  })
}