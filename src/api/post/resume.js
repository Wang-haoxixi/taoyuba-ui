import request from '@/router/axios'
import {exportDownload} from '@/util/export'

const prefixUrl = 'tybhrms/resume'
const Url='tmlms/shipownerRecruit'
export function getResumePage (query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}

export function getResumeMyCerts (query) {
  return request({
    url: `${prefixUrl}/getMyCerts`,
    method: 'get',
    params: query,
  })
}

export function statusAgent (switchs,resumeId) {
  return request({
      url: `${prefixUrl}/review?status=${switchs}&resumeId=${resumeId}`,
      method: 'post',
  })
}

export function deleteResumeById (id) {
  return request({
    url: `${prefixUrl}/delete/` +id,
    method: 'post',
    data: id,
  })
}

export function addResume (data) {
  return request({
    url: `${prefixUrl}/add`,
    method: 'post',
    data: data,
  })
}

export function getResumeById (id) {
  return request({
    url: `${prefixUrl}/` + id,
    method: 'get',
    params: id,
  })
}

export function putResume (obj, publish) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'put',
    params: {
      publish,
    },
    data: obj,
  })
}

export function exportExcel (ids) {
  return exportDownload({
    url: 'tybhrms/tybExcelExport/resume',
    data: ids,
    title: '简历信息',
  })
}

//船老大招聘
export function getList (query) {
  return request({
    url: `${Url}/page`,
    method: 'get',
    params: query,
  })
}

export function deleteById (id) {
  return request({
    url: `${Url}/delete/` +id,
    method: 'post',
    data: id,
  })
}

export function getById (id) {
  return request({
    url: `${Url}/` +id,
    method: 'get',
    dparamsata: id,
  })
}

export function update (data) {
  return request({
    url: `${Url}/update`,
    method: 'post',
    data: data,
  })
}

export function create (data) {
  return request({
    url: `${Url}/create`,
    method: 'post',
    data: data,
  })
}

export function change (data) {
  return request({
    url: 'tybship/tybship/findmyship/'+data,
    method: 'get',

  })
}



