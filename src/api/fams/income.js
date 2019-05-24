import request from '@/router/axios'

const prefixUrl = '/fams/income'
// @/api/fams/income

export function getIncomePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function postIncome (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function getIncomeById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}