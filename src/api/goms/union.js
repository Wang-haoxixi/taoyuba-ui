import request from '@/router/axios'

const prefixUrl = '/admin/union'
// @/api/goms/union
export function getUnionPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getUnionBySelf () {
  return request({
    url: `${prefixUrl}`,
    method: 'get',
  })
}

export function getUnionLogList (current) {
  return request({
    url: `${prefixUrl}/log_list`,
    method: 'get',
    params: {
      current,
    },
  })
}

export function getUnionOrgList () {
  return request({
    url: `${prefixUrl}/org/list`,
    method: 'get',
  })
}

export function getUnionNoOrgList () {
  return request({
    url: `${prefixUrl}/no_union_org/list`,
    method: 'get',
  })
}

export function removeOrgById (id) {
  return request({
    url: `${prefixUrl}/org/remove/${id}`,
    method: 'get',
  })
}

export function addOrgById (id) {
  return request({
    url: `${prefixUrl}/org/add/${id}`,
    method: 'get',
  })
}

export function putUnion (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function postUnion (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function unSetUnionAdmin (id) {
  return request({
    url: `${prefixUrl}/unset/admin/${id}`,
    method: 'get',
  })
}

export function setUnionAdmin (id) {
  return request({
    url: `${prefixUrl}/set/admin/${id}`,
    method: 'get',
  })
}

export function getOrgMessage () {
  return request({
    url: `${prefixUrl}/org/message`,
    method: 'get',
  })
}

export function agreeOrgMessage (id) {
  return request({
    url: `${prefixUrl}/agree/join/union/${id}`,
    method: 'get',
  })
}

export function refuseOrgMessage (id) {
  return request({
    url: `${prefixUrl}/refuse/join/union/${id}`,
    method: 'get',
  })
}

export function reviewById (obj) {
  return request({
    url: `${prefixUrl}/review/batch`,
    method: 'post',
    data: obj,
  })
}


export function putObj (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function delObj (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}

export function getUserPage (query) {
  return request({
    url: `${prefixUrl}/user/page`,
    method: 'get',
    params: query,
  })
}