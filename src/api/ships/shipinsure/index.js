import request from '@/router/axios'
const prefixUrl = '/tybship/tybshipinsure'


export function getShipinsureDetail (id) {      
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })    
}        

export function createShipinsure (data) {   
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data,
  })
}

export function updateShipinsure (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data,
  })
}

export function deleteShipinsure (id) {
  return request({
    url: `${prefixUrl}/del/${id}`,
    method: 'post',
  })
}

export  function  getByShipId (id) {
    return  request({   
        url: `${prefixUrl}/getbyshipid/${id}`,
        method: 'get',
     })
}
                                                                                     
























