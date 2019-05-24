import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/admin/dict/page',
    method: 'get',
    params: query,
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/dict/',
    method: 'post',
    data: obj,
  })
}

export function getObj (id) {
  return request({
    url: '/admin/dict/' + id,
    method: 'get',
  })
}

export function getChild (id) {
  return request({
    url: '/admin/dict/child/' + id,
    method: 'get',
  })
}

export function postChild (obj) {
  return request({
    url: '/admin/dict/child/create',
    method: 'post',
    data: obj,
  })
}

export function putChild (obj) {
  return request({
    url: '/admin/dict/child/update',
    method: 'post',
    data: obj,
  })
}

export function deleteChildById (id) {
  return request({
    url: `/admin/dict/child/delete/${id}`,
    method: 'post',
  })
}

export function delObj (row) {
  return request({
    url: '/admin/dict/' + row.id,
    method: 'delete',
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/dict/',
    method: 'put',
    data: obj,
  })
}

export function remote (type) {
  return request({
    url: '/admin/dict/type/' + type,
    method: 'get',
  })
}

export const loadAllDictMap = () => {
  return request({
    url: '/admin/dict/all_map',
    method: 'get',
  })
}