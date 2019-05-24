import request from '@/router/axios'

const prefixUrl = '/admin/wel'
// @/api/wel/index
export function getAside () {
  return request({
    url: `${prefixUrl}/aside`,
    method: 'get',
  })
}

export function getIndex () {
  return request({
    url: `${prefixUrl}/index`,
    method: 'get',
  })
}

export function getMaterials () {
  return request({
    url: '/mlms/material/wel/list',
    method: 'get',
  })
}

export function getPending (type) {
  return request({
    url: `${prefixUrl}/pending/list`,
    method: 'get',
    params: {
      type,
    },
  })
}

export function getContractList (query) {
  return request({
    url: '/crm/cms/wel/contract/list',
    method: 'get',
    params: query,
  })
}

export function getCustomerList (query) {
  return request({
    url: '/crm/cms/wel/customer/list',
    method: 'get',
    params: query,
  })
}
