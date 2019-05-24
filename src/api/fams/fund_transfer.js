import request from '@/router/axios'

const prefixUrl = '/fams/fund_transfer'
// @/api/fams/fund_transfer

export function getFundTransferPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getFundTransferById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function revokeFundTransferById (id) {
  return request({
    url: `${prefixUrl}/revoke/${id}`,
    method: 'get',
  })
}

export function finishFundTransferById (id) {
  return request({
    url: `${prefixUrl}/finish/${id}`,
    method: 'get',
  })
}

export function confirmFundTransferById (id) {
  return request({
    url: `${prefixUrl}/confirm/${id}`,
    method: 'get',
  })
}

export function postFundTransfer (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
