import request from '@/router/axios'
const prefixUrl = '/mlms/contract'

export function getContractPage (params) {
  return request({
    url: `${prefixUrl}/page/outContract`,
    method: 'get',
    params: params,
  })
}

export function postContract (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putContract (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

//只删除客户
export function deleteContractById (id) {
  return request({
    url: `${prefixUrl}/deleteRelation/batch`,
    method: 'post',
    data: [id],
  })
}

//删除全部
export function deleteContract (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}


export function getDataById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
