import request from '@/router/axios'
const prefixUrl = '/crm/customer'

export const getCustomList = (params) => {
  return request({
    url: `${prefixUrl}/getIndexPage`,
    method: 'get',
    params: params,
  })
}

export const getNewClientList = (params) => {
  return request({
    url: `${prefixUrl}/getThisWeekClient`,
    method: 'get',
    params: params,
  })
}

export const getCoopClientList = (params) => {
  return request({
    url: `${prefixUrl}/getMostCoopClient`,
    method: 'get',
    params: params,
  })
}
