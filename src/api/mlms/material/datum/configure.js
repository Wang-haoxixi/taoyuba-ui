import request from '@/router/axios'
const prefixUrl = '/mlms/materiallevel'

export function getTableData (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function getConfigureTree () {
  return request({
    url: `${prefixUrl}/tree`,
    method: 'get',
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteDate (id) {
  let ids = typeof id === 'object' ? id : [id]
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

// 重名验证
export function validateName (name) {
  return request({
    url: `${prefixUrl}/get/name/${name}`,
    method: 'post',
  })
}
