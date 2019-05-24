import request from '@/router/request'

const itemUrl = '/gvs/item'

// 待确认
export function getUnconfirmData (query) {
  return request({
    url: `${itemUrl}/confirm_page`,
    method: 'get',
    params: query,
  })
}
// 确认、拒绝操作
export function itemOperation (obj) {
  return request({
    url: `${itemUrl}/confirm_operation`,
    method: 'post',
    data: obj,
  })
}
// 已确认 //责任清单
export function getConfirmData (query) {
  return request({
    url: `${itemUrl}/confirmed_page`,
    method: 'get',
    params: query,
  })
}
// 申请撤回
export function applyBack (id) {
  return request({
    url: `${itemUrl}/revoke/`+id,
    method: 'post',
  })
}
// 撤回列表
export function getBackData (query) {
  return request({
    url: `${itemUrl}/revoke_page`,
    method: 'get',
    params: query,
  })
}
// 撤回审核列表
export function auditingRevokePage (query) {
  return request({
    url: `${itemUrl}/auditing_revoke_page`,
    method: 'get',
    params: query,
  })
}
// 撤回同意
export function agreeRevoke (id) {
  return request({
    url: `${itemUrl}/agree_revoke/`+id,
    method: 'post',
  })
}
// 撤回拒绝
export function refuseRevoke (id) {
  return request({
    url: `${itemUrl}/refuse_revoke/`+id,
    method: 'post',
  })
}
// 重置责任部门列表
export function getResetData (query) {
  return request({
    url: `${itemUrl}/reset_page`,
    method: 'get',
    params: query,
  })
}
// 重置责任部门
export function resetDept (obj) {
  return request({
    url: `${itemUrl}/reset_dept`,
    method: 'post',
    data: obj,
  })
}
// 需求响应
export function supplyResData (query) {
  return request({
    url: `${itemUrl}/respond_page`,
    method: 'get',
    params: query,
  })
}
// 需求响应详情
export function getConfirmDetailData (id) {
  return request({
    url: `${itemUrl}/`+id,
    method: 'get',
  })
}