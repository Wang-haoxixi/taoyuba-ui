import request from '@/router/axios'

const prefixUrl = '/fams/billing'
// @/api/fams/billing

export function getMyBillingPage (query) {
  return request({
    url: `${prefixUrl}/my/page`,
    method: 'get',
    params: query,
  })
}
// 财务管理
export function getBillingPage (query) {
  return request({
    url: `${prefixUrl}/financial_page`,
    method: 'get',
    params: query,
  })
}

export function getBillingById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function postBilling (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putBilling (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function referBillingById (id) {
  return request({
    url: `${prefixUrl}/refer/${id}`,
    method: 'post',
  })
}

export function withdrawBillingById (id) {
  return request({
    url: `${prefixUrl}/withdraw/${id}`,
    method: 'post',
  })
}

export function deleteBillingById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function deleteBillingBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function rejectBilling (obj) {
  return request({
    url: `${prefixUrl}/financial_refuse`,
    method: 'post',
    data: obj,
  })
}

export function passBilling (obj) {
  return request({
    url: `${prefixUrl}/financial_agree`,
    method: 'post',
    data: obj,
  })
}
