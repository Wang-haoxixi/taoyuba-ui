import request from '@/router/axios'
const prefixUrl = '/tmlms/tybTroubleshootReport'

export function getShipInfo (params) {
  return request({
    url: '/tmlms/tybship/allPage',
    method: 'get',
    params: params,
  })
}

export function getPage (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}

export function getPageByShipNo (params) {
  return request({
    url: `${prefixUrl}/pageByShipNo`,
    method: 'get',
    params: params,
  })
}

export function getPageById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function createPage (params) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data: params,
  })
}

export function updatePage (params) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: params,
  })
}
