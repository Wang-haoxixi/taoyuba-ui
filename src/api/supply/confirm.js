import request from '@/router/request'

const confirmUrl = '/gvs/confirm'
// 需求响应详情
export function getConfirmDetailData (id) {
  return request({
    url: `${confirmUrl}/`+id,
    method: 'get',
  })
}
// 是否数源部门
export function confirmUpd (obj) {
  return request({
    url: `${confirmUrl}/upd`,
    method: 'post',
    data: obj,
  })
}
// 重置数源部门
export function resetDept (obj) {
  return request({
    url: `${confirmUrl}/reset`,
    method: 'post',
    data: obj,
  })
}
