import request from '@/router/axios'
const materialUrl = '/mlms/material'

// 材料
export function getReceiverList (params) {
  return request({
    url: `${materialUrl}/page`,
    method: 'get',
    params: params,
  })
}

// 项目-全部
export function getProjectAll (params) {
  return request({
    url: '/prms/iepProjectInformation/getList',
    method: 'get',
    params: params,
  })
}

// 项目-分页
export function getProjectList (obj) {
  return request({
    url: '/prms/iepProjectInformation/page',
    method: 'get',
    params: obj,
  })
}
