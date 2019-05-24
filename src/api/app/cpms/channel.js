import request from '@/router/axios'
const prefixUrl = '/cpms/channel_product'

export const getDetailsPage = (params) => {
  return request({
    url: `${prefixUrl}/details_page`,
    method: 'get',
    params: params,
  })
}

export const getModulePage = (params) => {
  return request({
    url: `${prefixUrl}/module_page`,
    method: 'get',
    params: params,
  })
}

// 组织详情产品集合
export const getDetailsList = (id) => {
  return request({
    url: `${prefixUrl}/details_list/${id}`,
    method: 'get',
  })
}

// 资源库资源统计
export const getResourceCount = () => {
  return request({
    url: `${prefixUrl}/resource_count`,
    method: 'get',
  })
}

// 频道页员工感想列表
export function getThoughtsList () {
  return request({
    url: `${prefixUrl}/thoughts_list`,
    method: 'get',
  })
}
