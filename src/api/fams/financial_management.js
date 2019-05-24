import request from '@/router/axios'

const prefixUrl = '/fams/financial_management'
// @/api/fams/financial_management

export function getFinancialManagementPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    data: obj,
  })
}

export function reviewApprovaBatch (obj) {
  return request({
    url: `${prefixUrl}/status/batch`,
    method: 'post',
    data: obj,
  })
}

export function getFinancialManagementById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}