import request from '@/router/axios'
const prefixUrl = '/crm/channel_client'

// 本周新增
export const getNewClientList = (params) => {
  return request({
    url: `${prefixUrl}/getThisWeekClient`,
    method: 'get',
    params: params,
  })
}

// 合作次数最多
export const getCoopClientList = (params) => {
  return request({
    url: `${prefixUrl}/getMostCoopClient`,
    method: 'get',
    params: params,
  })
}

// 客户库列表
export const getCustomList = (params) => {
  return request({
    url: `${prefixUrl}/getIndexPage`,
    method: 'get',
    params: params,
  })
}

export const getLatestList = (params) => {
  return request({
    url: `${prefixUrl}/latest`,
    method: 'get',
    params: params,
  })
}

export const getPopularList = (params) => {
  return request({
    url: `${prefixUrl}/popular`,
    method: 'get',
    params: params,
  })
}

export const getBusinessPage = (params) => {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: params,
  })
}

// 组织客户集合
export const getClientList = (id) => {
  return request({
    url: `${prefixUrl}/client_list/${id}`,
    method: 'get',
  })
}
