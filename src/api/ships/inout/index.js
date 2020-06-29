import request from '@/router/axios'
const prefixUrl = '/tybship/tybshipinout'
import {exportDownload} from '@/util/export'

export function outList (params) {
    return request({
    url: `${prefixUrl}/page?inoutType=1`,
    method: 'get',
    params: params,
})
}
export function inList (params) {
    return request({
    url: `${prefixUrl}/page?inoutType=2`,
    method: 'get',
    params: params,
})
}
export function getInoutListById (id) {
    return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
    params: id,
})
}
export function getInoutListByShipId (shipId) {
    return request({
    url: `${prefixUrl}/getByshipId/${shipId}`,
    method: 'get',
    params: shipId,
})
}
export function getCrewCert (inoutId,shipId) {
    return request({
    url: `tmlms/crew_cert/shipInout?inoutId=${inoutId}&shipId=${shipId}`,
    method: 'get',
    params:{inoutId,shipId},
})
}
export function getShipCrew (inoutId) {
    return request({
    url: `tybship/tybshipinoutcrew/getShipCrewByinout/${inoutId}`,
    method: 'get',
    params:inoutId,
})
}
export function getFishByInoutId (inoutId) {
    return request({
    url: `tybship/tybshipinoutfish/getFishrecord/${inoutId}`,
    method: 'get',
    params:inoutId,
})
}

export function exportExcel (params) {                                          
    return exportDownload({
      url: 'tybship/tybshipExcelExport/downShipInout',
      data: params,                 
      title: '进出港记录',
    })
  }
// export function addPort (obj) {
//     return request({
//       url: `${prefixUrl}/save`,
//       method: 'post',
//       data: obj,
//     })
// } 
// export function updatePort (obj) {
//     return request({
//       url: `${prefixUrl}/update`,
//       method: 'post',
//       data: obj,
//     })
// } 
// export function getPortById (portId) {
//     return request({
//       url: `${prefixUrl}/${portId}`,
//       method: 'get',
//       params: portId,
//     })
// } 
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