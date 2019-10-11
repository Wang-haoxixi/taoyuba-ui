import request from '@/router/axios'
const prefixUrl = '/tmlms/tybcontractcancel'

export function addContractCancel (data) {
  return request({
    url:`${prefixUrl}/save`,
    method: 'post',
    data: data,
  })
}

export function getContractCancelList (query) {
  return request({
      url: `${prefixUrl}/newpage`,
      method: 'get',
      params: query,
  })
}

export function getContractCancel (id) {
  return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
  })
}

export function updateContractCancel (data) {
  return request({
    url:`${prefixUrl}/update`,
    method: 'post',
    data: data,
  })
}

export function disallowContract (id) {
  return request({
    url:`${prefixUrl}/review`,
    method: 'post',
    params: {
      cancelId : id,
    },
  })
}
