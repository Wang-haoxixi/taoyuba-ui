import request from '@/router/axios'
const prefixUrl = '/mlms/projectreport'

export function getTableData (params) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'post',
    data: params,
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
