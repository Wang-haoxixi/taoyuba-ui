
import request from '@/router/request'

const materialUrl = '/gvs/item'

// 待确认
export function getUnconfirmMaterial (query) {
  return request({
    url: `${materialUrl}/confirm_page`,
    method: 'get',
    params: query,
  })
}
// 确认、拒绝操作
export function materialOperation (obj) {
  return request({
    url: `${materialUrl}/confirm_operation`,
    method: 'post',
    data: obj,
  })
}
// 已确认
export function getConfirmData (query) {
  return request({
    url: `${materialUrl}/confirmed_page`,
    method: 'get',
    params: query,
  })
}
// 申请撤回
export function applyBack (id) {
  return request({
    url: `${materialUrl}/revoke/`+id,
    method: 'post',
  })
}
// 撤回列表
export function getBackData (query) {
  return request({
    url: `${materialUrl}/revoke_page`,
    method: 'get',
    params: query,
  })
}
// 撤回审核列表
export function auditingRevokePage (query) {
  return request({
    url: `${materialUrl}/auditing_revoke_page`,
    method: 'get',
    params: query,
  })
}
// 撤回同意
export function agreeRevoke (id) {
  return request({
    url: `${materialUrl}/agree_revoke/`+id,
    method: 'post',
  })
}
// 撤回拒绝
export function refuseRevoke (id) {
  return request({
    url: `${materialUrl}/refuse_revoke/`+id,
    method: 'post',
  })
}
// 重置责任部门列表
export function getResetData (query) {
  return request({
    url: `${materialUrl}/reset_page`,
    method: 'get',
    params: query,
  })
}
// 重置责任部门
export function resetDept (obj) {
  return request({
    url: `${materialUrl}/reset_dept`,
    method: 'post',
    data: obj,
  })
}
// 需求响应
export function supplyResData (query) {
  return request({
    url: `${materialUrl}/respond_page`,
    method: 'get',
    params: query,
  })
}
// 需求响应详情
export function getConfirmDetailData (id) {
  return request({
    url: `${materialUrl}/`+id,
    method: 'get',
  })
}
