import request from '@/router/axios'

const prefixUrl = '/fams/withdraw'
// @/api/fams/withdraw

export function getWithdrawPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getMyWithdrawPage (query) {
  return request({
    url: `${prefixUrl}/my/page`,
    method: 'get',
    params: query,
  })
}

export function postWithdraw (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function passWithdrawBatch (obj) {
  return request({
    url: `${prefixUrl}/pass/batch`,
    method: 'post',
    data: obj,
  })
}

export function rejectWithdrawBatch (obj) {
  return request({
    url: `${prefixUrl}/reject/batch`,
    method: 'post',
    data: obj,
  })
}

export function grantWithdrawBatch (obj) {
  return request({
    url: `${prefixUrl}/grant/batch`,
    method: 'post',
    data: obj,
  })
}