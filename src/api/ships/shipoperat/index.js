import request from '@/router/axios'
const prefixUrl = '/tybship/tybshipmanager'

export function getShipManagerList (params) {
  return request({
    url:`${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
export function getOperatorList (shipName) {
  return request({
    url:`/tmlms/tybshiphaver/getShiphaver?shipName=${shipName}`,
    method: 'get',
  })
}
export function creatShipManager (data) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data,
  })
}

export function getShipManagerInfo (id) {
  return request({
    url:`${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function updateShipManager (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data,
  })
}

export function deleteShipManager (id) {
  return request({
    url: `${prefixUrl}/del/${id}`,
    method: 'post',
  })
}

export function getShipManagerByShipNo (shipNo) {
  return request({
    url:`${prefixUrl}/findByShipno`,
    method: 'get',
    params: {
      shipNo: shipNo,
    },
  })
}