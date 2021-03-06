import request from '@/router/axios'
import {exportDownload} from '@/util/export'

const prefixUrl = 'tybhrms/tybrecruit'

export function getRecruitPage (query) {
  return request ({
    url:`${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getMyRecruitPage (query) {
  return request ({
    url:`${prefixUrl}/mypage`,
    method: 'get',
    params: query,
  })
}

export function deleteRecruitById (id) {
  return request({
    url: `${prefixUrl}/` +id,
    method: 'post',
    data: id,
  })
}

export function addRecruit (data) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data: data,
  })
}

export function getRecruitById (id) {
  return request({
    url: `${prefixUrl}/` + id,
    method: 'get',
    params: id,
  })
}

export function putRecruit (obj, publish) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    params: {
      publish,
    },
    data: obj,
  })
}

export function exportExcel (ids) {
  return exportDownload({
    url: 'tybhrms/tybExcelExport/recruit',
    data: ids,
    title: '招聘信息',
  })
}

export function exportExcelPeople (userType,title,trainMeetId) {
  return exportDownload({
    url: `/tmlms/tybmlmsExcelExport/sign_export?userType=${ userType }&trainMeetId=${ trainMeetId }`,
    title: title,
    method: 'get',
  })
}
// 通过渔船名查找相关信息
export function getInfoByShipName (shipName) {
  return request ({
    url:`/tybship/tybship/findmyship/${shipName}`,
    method: 'get',
  })
}