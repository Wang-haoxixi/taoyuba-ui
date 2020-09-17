import request from '@/router/axios'
const prefixUrl = '/tmlms/tybcrewsyslog'

export function getCrewSyslog (params) {
  return request({
    url:`${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
//上船记录
export function getCrewAllSyslog (params) {
  return request({
    url:`${prefixUrl}/newPage`,
    method: 'get',
    params: params,
  })
}
export function getSyslogByidcard (idcard) {
  return request({
    url:`${prefixUrl}/getByidcard/${idcard}`,
    method: 'get',
    params: idcard,
  })
}


// export function creatShipManager (data) {
//   return request({
//     url: `${prefixUrl}/save`,
//     method: 'post',
//     data,
//   })
// }

// export function getShipManagerInfo (id) {
//   return request({
//     url:`${prefixUrl}/${id}`,
//     method: 'get',
//   })
// }

// export function updateShipManager (data) {
//   return request({
//     url: `${prefixUrl}/update`,
//     method: 'post',
//     data,
//   })
// }

// export function deleteShipManager (id) {
//   return request({
//     url: `${prefixUrl}/del/${id}`,
//     method: 'post',
//   })
// }

// export function getShipManagerByShipNo (shipNo) {
//   return request({
//     url:`${prefixUrl}/findByShipno`,
//     method: 'get',
//     params: {
//       shipNo: shipNo,
//     },
//   })
// }