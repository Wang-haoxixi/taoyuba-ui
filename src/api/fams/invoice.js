import request from '@/router/axios'

const prefixUrl = '/fams/invoice'
// @/api/fams/invoice

export function getMyInvoicePage (query) {
  return request({
    url: `${prefixUrl}/my/page`,
    method: 'get',
    params: query,
  })
}
// 财务管理
export function getInvoicePage (query) {
  return request({
    url: `${prefixUrl}/financial_page`,
    method: 'get',
    params: query,
  })
}
// 个人审批发票
export function getMyInvoiceApprovalPage (query) {
  return request({
    url: `${prefixUrl}/primary_page`,
    method: 'get',
    params: query,
  })
}

export function getInvoiceById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function postInvoice (obj, isPublish = false) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: {isPublish,...obj},
  })
}

export function putInvoice (obj, isPublish = false) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: {isPublish,...obj},
  })
}

export function referInvoiceById (id) {
  return request({
    url: `${prefixUrl}/refer/${id}`,
    method: 'post',
  })
}

export function withdrawInvoiceById (id) {
  return request({
    url: `${prefixUrl}/withdraw/${id}`,
    method: 'post',
  })
}

export function deleteInvoiceById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

export function deleteInvoiceBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

export function rejectInvoice (obj) {
  return request({
    url: `${prefixUrl}/financial_refuse`,
    method: 'post',
    data: obj,
  })
}

export function passInvoice (obj) {
  return request({
    url: `${prefixUrl}/financial_agree`,
    method: 'post',
    data: obj,
  })
}

export function myRejectInvoice (obj) {
  return request({
    url: `${prefixUrl}/primary_refuse`,
    method: 'post',
    data: obj,
  })
}

export function myPassInvoice (obj) {
  return request({
    url: `${prefixUrl}/primary_agree`,
    method: 'post',
    data: obj,
  })
}