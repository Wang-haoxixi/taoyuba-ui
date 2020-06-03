import request from '@/router/axios'
const prefixUrl = '/tybship/tybshipinoutport'

export function getPortList (params) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: params,
    })
} 
export function addPort (obj) {
    return request({
      url: `${prefixUrl}/save`,
      method: 'post',
      data: obj,
    })
} 
export function updatePort (obj) {
    return request({
      url: `${prefixUrl}/update`,
      method: 'post',
      data: obj,
    })
} 
export function getPortById (portId) {
    return request({
      url: `${prefixUrl}/${portId}`,
      method: 'get',
      params: portId,
    })
} 
// export function addCrew (obj) {
//     return request({
//         url: `${prefixUrl}/save`,
//         method: 'post',
//         data: obj,
//     })
// } 
// export function getCrewById ( idcard ) {
//     return request({
//         url: `${prefixUrl}/getByidcard/${idcard}`,
//         method: 'get',
//     })
// } 
// export function detailShipCrew (id) {
//     return request({
//         url: `${prefixUrl}/${id}`,
//         method: 'get',
//     })
// } 

// export function delShipCrew (id) {
//     return request({
//         url: `${prefixUrl}/del/${id}`,
//         method: 'post',
//     })
// } 