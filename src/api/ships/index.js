import request from '@/router/axios'      
import {exportDownload} from '@/util/export'
const prefixUrl = '/tybship/tybship'

export function getShipList (params) {
  return request({
    url: `${prefixUrl}/otherpage`,
    method: 'get',
    params: params,
  })
}
export function changeShip (shipId,villageId) {
  return request({
    url: `${prefixUrl}/updateVillage?shipId=${shipId}&&villageId=${villageId}`,
    method: 'post',
    // params: params,
  })
}
// export function getFixOrgIds (shipId,orgId ) {
//   return request({
//     url: `${prefixUrl}/getFixOrgIds?shipId=${shipId}&&orgId=${orgId}`,
//     method: 'get',
//     // params: params,
//   })
// }
export function getFixOrgIds () {
  return request({
    url: '/admin/org/page',
    method: 'get',
  })
}
export function changeOrgIds (shipId,orgId ) {
  return request({
    url: `${prefixUrl}/updateOrgId?shipId=${shipId}&&orgId=${orgId}`,
    method: 'post',
    // params: params,
  })
}
export function getShipByShipId (shipId) {
  return request({
    url: `${prefixUrl}/${shipId}`,
    method: 'get',
    params: shipId,
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
export function getShipNamesWithOutOrg (name) {
  return request({
    url: `${prefixUrl}/findshipWithOutOrg/${name}`,
    method: 'get',
  })
} 

export  function  findMyship (name) {
  return request({
    url: `/tmlms/tybship/findmyship/${name}`,
    method: 'get',
  })
}
export  function  findorgShip (orgId,shipName) {
  return request({
    url: `${prefixUrl}/findorgShip?orgId=${orgId}&&shipName=${shipName}`,
    method: 'get',
  })
}
export function getShipByShipNo (shipNo) {
  return request({
    url: `${prefixUrl}/searchByshipNo`,
    method: 'get',
    params: {
      shipNo: shipNo,
    },
  })    
} 
export function getVillageShipList (params) {
  return request({
      url: `${prefixUrl}/newpage`,
      method: 'get',
      params: params,
  })
}

export function getVillageShipListV2 (params) {
  return request({
      url: `${prefixUrl}/newpageV2`,
      method: 'get',
      params: params,
  })
}
export function getShipCrew (params) {
  return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: params,
  })
}
export function exportExcel (params) {                                    
  return exportDownload({
    url: 'tybship/tybshipExcelExport/downShipInfo',
    data: params,                             
    title: '????????????',
  })
}
export function exportShipExcel (params) {                                    
  return exportDownload({
    url: 'tmlms/tybmlmsExcelExport/downShipCrew',
    data: params,                             
    title: '???????????????-'+params.shipName,
  })
}
export function exportRecord (params) {                                    
  return exportDownload({
    url: 'tmlms/tybmlmsExcelExport/downShipCrewRecord',
    data: params,                             
    title: '?????????????????????-'+params.shipName,
  })
}
export function exportShipNameExcel (params) {                                    
  return exportDownload({
    url: 'tmlms/tybmlmsExcelExport/downShipCrewTwoOld ',
    data: params,                             
    title: '???????????????-'+params.shipName,
  })
}
export function exportContractModel (params) {                                    
  return exportDownload({
    url: 'tmlms/tybmlmsExcelExport/downContractModel',
    data: params,                             
    title: params.shipName,
  })
}
// ??????????????????
export function tybOrderPage (params) {                                    
  return request({
    url: 'tmlms/tyb_order/page',
    method: 'get',
    params: params,
  })
}

// ??????????????????
export function tybOrderPageDetail (params) {                                    
  return request({
    url: 'tmlms/tyb_order/getById',
    method: 'get',
    params: params,
  })
}
// ??????
export function agree (data) {                                  
  return request({
    url: 'tmlms/tyb_order/agree',
    method: 'post',
    data: data,
  })
}
// ?????????
export function noAgree (data) {                                  
  return request({
    url: 'tmlms/tyb_order/reject',
    method: 'post',
    data: data,
  })
}

export function tybPortRecord (params) {
  return request({
    url: '/tmlms/tybPortRecord/page',
    method: 'get',
    params: params,
  })
}

export function lastRecord (params) {
  return request({
    url: '/tmlms/tybPortRecord/lastRecord',
    method: 'get',
    params: params,
  })
}

export function getCrewByRecordId (params) {
  return request({
    url: '/tmlms/tybPortRecord/getCrewByRecordId',
    method: 'get',
    params: params,
  })
}

export function infoShip (shipId) {
  return request({
    url: `/tybship/tybship/info/${shipId}`,
    method: 'get',
  })
}

export function certStandard (shipId) {
  return request({
    url: `/tmlms/crew_cert/certStandard/${shipId}`,
    method: 'get',
  })
}

export function investigationReport (shipName) {
  return request({
    url: `/tmlms/investigationReport/pageByShipName?shipName=${shipName}`,
    method: 'get',
  })
}

export function countContractByShipId (shipId) {
  return request({
    url: `/tmlms/crew/countContractByShipId?shipId=${shipId}`,
    method: 'get',
  })
}

export function countContractByShipPage (params) {
  return request({
    url: '/tmlms/tybPortRecord/page',
    method: 'get',
    params: params,
  })
}

export function pageByShipName (params) {
  return request({
    url: '/tmlms/tybTroubleshootReport/pageByShipNo',
    method: 'get',
    params: params,
  })
}

export function ByShipName (params) {
  return request({
    url: '/tmlms/tyb_order/pageByShipName',
    method: 'get',
    params: params,
  })
}

export function verification (params) {
  return request({
    url: '/tmlms/verification/page',
    method: 'get',
    params: params,
  })
}

export function getById (id) {
  console.log(id)
  return request({
    url: `/tmlms/tyb_order/getById?id=${id.id}`,
    method: 'get',
  })
}
export function postExcelExport (fileds) {
  return request({
    url: '/tmlms/tybmlmsExcelExport/downVerification',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
    data: fileds,
  }).then(response => {
    // ????????????????????????
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = '????????????.xls'
    link.click()
  })
}
// export function getCrewByRecordId (recordId) {
//   return request({
//     url: '/tmlms/tybPortRecord/getCrewByRecordId',
//     method: 'get',
//     params: { recordId: recordId },
//   })
// }

















