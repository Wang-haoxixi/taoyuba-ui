import request from '@/router/axios'

const prefixUrl = '/hrms/administrative_approval'
// @/api/hrms/wel
function getAdministrativeApprovalPage (query, activeIndex) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: { ...query, activeIndex },
  })
}
export function getExaminApprovalPage (query) {
  return getAdministrativeApprovalPage(query, 1)
}

export function getAlreadyApprovalPage (query) {
  return getAdministrativeApprovalPage(query, 2)
}

export function getInitiatePage (query) {
  return getAdministrativeApprovalPage(query, 3)
}

export function getCCPage (query) {
  return getAdministrativeApprovalPage(query, 4)
}

export function getApprovalInitiateById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function getApprovalList () {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
  })
}

export function postApproval (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putApproval (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function putApprovalInitiate (obj, publish) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    params: {
      publish,
    },
    data: obj,
  })
}

export function deleteApprovalById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function submitApprovalBatch (ids) {
  return request({
    url: `${prefixUrl}/submit/batch`,
    method: 'post',
    data: ids,
  })
}

export function submitApprovalById (id) {
  return request({
    url: `${prefixUrl}/submit/batch`,
    method: 'post',
    data: [id],
  })
}
export function cancelApprovalBatch (ids) {
  return request({
    url: `${prefixUrl}/cancel/batch`,
    method: 'post',
    data: ids,
  })
}

export function cancelApprovalById (id) {
  return request({
    url: `${prefixUrl}/cancel/batch`,
    method: 'post',
    data: [id],
  })
}

export function reviewApprovaBatch (obj) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: 'post',
    data: obj,
  })
}


export function deliverApprovaBatch (obj) {
  return request({
    url: `${prefixUrl}/deliver/batch`,
    method: 'post',
    data: obj,
  })
}

