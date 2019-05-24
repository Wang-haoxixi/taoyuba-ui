import request from '@/router/axios'

const prefixUrl = '/dataclean'
// @/api/dataclean/data_pool
export function getDataPoolPage (id, opts) {
  const option = {
    ...opts,
    fieldId: id,
  }
  return request({
    url: `${prefixUrl}/data_pool/page`,
    method: 'get',
    params: option,
  })
}
export function postDataPool (id, opts) {
  return request({
    url: `${prefixUrl}/data_pool/create/${id}`,
    method: 'post',
    data: opts,
  })
}

export function putDataPool (id, opts) {
  return request({
    url: `${prefixUrl}/data_pool/update/${id}`,
    method: 'post',
    data: opts,
  })
}

export function deleteDataPool (id) {
  return request({
    url: `${prefixUrl}/data_pool/delete/${id}`,
    method: 'post',
  })
}

export function deleteDataPoolBatch (ids) {
  return request({
    url: `${prefixUrl}/data_pool/delete`,
    method: 'post',
    data: ids,
  })
}
