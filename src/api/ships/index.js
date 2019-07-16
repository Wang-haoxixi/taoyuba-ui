import request from '@/router/axios'
const prefixUrl = '/tybship/tybship'

export function getShipList (params) {
  return request({
    url: `${prefixUrl}/otherpage`,
    method: 'get',
    params: params,
  })
}     

export function getShipDetail (id) {      
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })    
}        

export function createShip (data) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data,
  })
}

export function updateShip (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data,
  })
}

export function deleteShip (id) {
  return request({
    url: `${prefixUrl}/del/${id}`,
    method: 'post',
  })
}
                                                                                     
export function getRogionList (pid) {
  return request({
    url: `/tybship/tybregion/parent/${pid}`,
    method: 'get',
  })
}

export function getMyShipList (params) {
  return request({
    url: `${prefixUrl}/mypage`,
    method: 'get',
    params: params,
  })
}   

export function getShipNames (name) {
  return request({
    url: `${prefixUrl}/findship/${name}`,
    method: 'get',
  })
} 

export  function  findMyship (name) {
  return request({
    url: `${prefixUrl}/findmyship/${name}`,
    method: 'get',
  })
}






















