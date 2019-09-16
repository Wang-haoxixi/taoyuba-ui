import request from '@/router/axios'
const prefixUrl = '/tmlms/ship_owner'           
import {exportDownload} from '@/util/export'

export function getShipowner (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function saveShipowner (data,type) {
    return request({
        url: `${prefixUrl}/create?type=${type}`,
        method: 'post',
        data: data,
    })
}
export function deleteShipowner (id) {
    return request({
        url: `${prefixUrl}/delete?idcard=${id}`,
        method: 'post',
    })
}
export function getShipownerDetail (id) {
    return request({
        url: `${prefixUrl}/detail?userId=${id}`,
        method: 'get',
    })
}
export function getShipownerByidcard (idcard) {
    return request({
        url: `${prefixUrl}/getDetail?idcard=${idcard}`,
        method: 'get',
    })
}
export function getAllArea (id) {
    return request({
        url: `admin/region/wholeInfoList?areaCode=${id}`,
        method: 'get',
    })
}
export function editShipowner (data,type) {
    return request({
        url: `${prefixUrl}/edit?type=${type}`,
        method: 'post',
        data: data,
    })
}
export function getAllAreaName (id) {
    return request({
        url: `admin/region/wholeInfo?areaCode=${id}`,
        method: 'get',
    })
}
export function statusShipowner (switchs,userId) {
    return request({
        url: `${prefixUrl}/review?status=${switchs}&userId=${userId}`,
        method: 'post',
    })
}
export function statusShipownerByidcard (switchs,idcard) {
    return request({
        url: `${prefixUrl}/newReview?status=${switchs}&idcard=${idcard}`,
        method: 'post',
    })
}

export function uploadPic (data) {
  return request({
    url: 'admin/file/upload/avatar',
    method: 'post',
    data: data,
  })
}

export function getIdcardCheck (idcard) {
    return request({
        url: `${prefixUrl}/idcardcheck`,
        method: 'get',
        params: {
          idcard: idcard,
        },
    }) 
}

export function newEditShipowner (data,type) {
    return request({
        url: `${prefixUrl}/newedit?type=${type}`,
        method: 'post',
        data: data,
    })
}

export function exportExcel (params) {                                    
    return exportDownload({
      url: 'tmlms/tybmlmsExcelExport/downloadOwner',
      data: params,                             
      title: '船东信息',
    })
  }