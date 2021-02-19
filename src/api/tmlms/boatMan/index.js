import request from '@/router/axios'
const prefixUrl = '/tmlms/crew'     
import {exportDownload} from '@/util/export'

export function getCrew (query) {
    return request({
        url: `${prefixUrl}/Page`,
        method: 'get',
        params: query,
    })
}
export function countCrew (shipId) {
    return request({
        url: `${prefixUrl}/countWithShip?shipId=${shipId}`,
        method: 'get',
        params: shipId,
    })
}
export function getCrewByShipId (shipId) {
    return request({
        url: `${prefixUrl}/findByShipId?shipId=${shipId}`,
        method: 'get',
        params: shipId,
    })
}
export function getCrewRegiste (param) {
    return request({
        url: `${prefixUrl}/pageWithShip`,
        method: 'get',
        params: param,
    })
}
export function getshipLogPage (param) {
    return request({
        url: `${prefixUrl}/shipLogPage`,
        method: 'get',
        params: param,
    })
}
export function checkCrewRelation (list) {
    return request({
        url: `${prefixUrl}/checkMoreRelations`,
        method: 'post',
        data: list,
    })
}
export function getCrewByName (name) {
    return request({
        url: `${prefixUrl}/findByCrewname?realName=${name}`,
        method: 'get',
        params: name,
    })
}
export function saveCrew (data,type) {
    return request({
        url: `${prefixUrl}/create?type=${type}`,
        method: 'post',
        data: data,
    })
}
export function saveCrewBatch (data,type) {
    return request({
        url: `${prefixUrl}/batchCreate?type=${type}`,
        method: 'post',
        data: data,
        timeout: 1000 * 60 * 5,
    })
}
export function deleteCrew (id) {
    return request({
        url: `${prefixUrl}/delete?idcard=${id}`,
        method: 'post',
    })
}
export function deleteCrewRelation (idcard,shipId) {
    return request({
        url: `${prefixUrl}/deleteRelation?idcard=${idcard}&&shipId=${shipId}`,
        method: 'post',
    })
}
export function getCrewDetail (id) {
    return request({
        url: `${prefixUrl}/detail?userId=${id}`,
        method: 'get',
    })
}
export function getAllArea (id) {
    return request({
        url: `admin/region/wholeInfoList?areaCode=${id}`,
        method: 'get',
    })
}
export function editCrew (data,type) {
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
export function statusCrew (switchs,userId) {
    return request({
        url: `${prefixUrl}/review?status=${switchs}&userId=${userId}`,
        method: 'post',
    })
}
export function detailCrew (id) {
    return request({
        url: `${prefixUrl}/getCrewByidcard?idcard=${id}`,
        method: 'get',
    })
}

export function uploadPic (data) {
    return request({
      url: 'admin/file/upload/avatar',
      method: 'post',
      data: data,
    })
}

export function getCrewData (id) {
    return request({
        url: `${prefixUrl}/idcardcheck?idcard=${id}`,
        method: 'get',
    })
}

export function getIdcardCheck (id) {
    return request({
        url: `${prefixUrl}/idcardcheck?idcard=${id}`,
        method: 'get',
    })
}

export function exportExcel (params, title = '船员信息') {                                          
    return exportDownload({
      url: 'tmlms/tybmlmsExcelExport/downloadCrew',
      data: params,                 
      title: title,
    })
  }

export function getPageByBad (params) {
    return request({
        url: `${prefixUrl}/badPage`,
        method: 'get',
        params: params,
    })
}
export function updatePageBatchByBad (params) {
    return request({
        url: `${prefixUrl}/badUpdateBatch`,
        method: 'post',
        data: params,
    })
}

export function uploadImgBase64 (params) {
    return request({
        url: `${prefixUrl}/uploadBaseImage`,
        method: 'post',
        data: params,
    })
}
