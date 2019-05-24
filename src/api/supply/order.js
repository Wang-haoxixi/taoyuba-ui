import request from '@/router/request'

let baseName = `/gvs/item`

// 获取列表
export function getPage (params) {
  return request({
    url: `${baseName}/page`,
    method: 'get',
    params: params || {},
  })
}

// 需求清单
export function getPageByDemand (query) {
  return request({
    url: `${baseName}/demand_page`,
    method: 'get',
    params: query,
  })
}

// 负面清单
export function getPageByNegative (query) {
  return request({
    url: `${baseName}/negative_page`,
    method: 'get',
    params: query,
  })
}
