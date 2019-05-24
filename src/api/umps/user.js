import request from '@/router/request'

export function getUserPage (query) {
  return request({
    url: '/admin/user/userPage',
    method: 'get',
    params: query,
  })
}
export function getUserRelationList (query) {
  return request({
    url: '/admin/user/selectRelation',
    method: 'get',
    params: query,
  })
}

export function getUserAdminList (query) {
  return request({
    url: '/admin/user/admin',
    method: 'get',
    params: query,
  })
}

export function postUser (obj) {
  return request({
    url: '/admin/user/create',
    method: 'post',
    data: obj,
  })
}

export function getUserById (id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get',
  })
}

export function deleteUser (id) {
  return request({
    url: '/admin/user/delete/' + id,
    method: 'post',
  })
}

export function lockUser (id) {
  return request({
    url: '/admin/user/lock/' + id,
    method: 'put',
  })
}

export function putUser (obj) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    data: obj,
  })
}

export function editorUser (obj) {
  return request({
    url: '/admin/user/editInfo',
    method: 'get',
    data: obj,
  })
}

// 用户验证
export function UserVerification (username) {
  return request({
    url: '/admin/user/check?username=' + username,
    method: 'post',
  })
}