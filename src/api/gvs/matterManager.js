import request from '@/router/request'
import exportDownload from '@/util/export'
const prefixUrl = '/gvs'
export function getListBackAudit (query) {
  return request({
    url: `${prefixUrl}/query/listBackAudit`, //查询撤回审核列表
    method: 'get',
    params: query,
  })
}

export function getListDetail (query) {
  return request({
    url: `${prefixUrl}/query/listDetail`, //查询需求明细列表
    method: 'get',
    params: query,
  })
}

export function getListResetSdept (query) {
  return request({
    url: `${prefixUrl}/query/listResetSdept`, //查询重置列表
    method: 'get',
    params: query,
  })
}

export function postResetSdept (obj) {
  return request({
    url: `${prefixUrl}/confirm/upd`, //部门确认选择
    method: 'post',
    data: obj,
  })
}

export function postConfirm (obj) {
  return request({
    url: `${prefixUrl}/confirm/back`, //操作
    method: 'post',
    data: obj,
  })
}

export function getExport (params) {
  return exportDownload({
    url: `${prefixUrl}/shareDemandDetailsExcel/download`,
    data: params,
  })
}
