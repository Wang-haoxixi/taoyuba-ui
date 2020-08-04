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

export  function  findMyship (name) {
  return request({
    url: `${prefixUrl}/findmyship/${name}`,
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
    title: '渔船信息',
  })
}
export function exportShipExcel (params) {                                    
  return exportDownload({
    url: 'tmlms/tybmlmsExcelExport/downShipCrew',
    data: params,                             
    title: params.shipName,
  })
}


















