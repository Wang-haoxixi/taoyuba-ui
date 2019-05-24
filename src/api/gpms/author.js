import request from '@/router/axios'
const prefixUrl = '/prms/iepProjectAuthorization'

export function getAuthorList (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${prefixUrl}/edit`,
    method: 'post',
    data: obj,
  })
}

export function deleteDate (id) {
  let ids = typeof id == 'object' ? id : [id]
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function getDetailById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

// 审批列表
export function getApproveList (obj) {
  return request({
    url: `${prefixUrl}/projectApproval`,
    method: 'get',
    params: obj,
  })
}