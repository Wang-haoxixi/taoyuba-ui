import request from '@/router/axios'

const prefixUrl = '/dataclean'
// @/api/dataclean/clean_pool
export function getListTCPage (opts) {
  return request({
    url: `${prefixUrl}/clean_pool/page`,
    method: 'get',
    params: opts,
  })
}
export function getListTCDetailById (id) {
  return request({
    url: `${prefixUrl}/clean_pool/${id}`,
    method: 'get',
  })
}
export function putListTC (obj) {
  return request({
    url: `${prefixUrl}/clean_pool/update`,
    method: 'post',
    data: obj,
  })
}

export function postListTC (obj) {
  return request({
    url: `${prefixUrl}/clean_pool/create`,
    method: 'post',
    data: obj,
  })
}

export function deleteListTCBatch (ids) {
  return request({
    url: `${prefixUrl}/clean_pool/delete`,
    method: 'post',
    data: ids,
  })
}

export function deleteListTCById (id) {
  return request({
    url: `${prefixUrl}/clean_pool/delete/${id}`,
    method: 'post',
  })
}
