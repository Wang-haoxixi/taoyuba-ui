import request from '@/router/axios'

const visitUrl = '/crm/visitingRecord'
const visitLog = '/crm/meeting'


// 联系记录查询
export function fetchVisitList (params) {
  return request({
    url: `${visitUrl}/page`,
    method: 'get',
    params: params,
  })
}
// 联系记录-编辑
export function updateVisit (obj) {
  return request({
    url: `${visitUrl}/update`,
    method: 'post',
    data: obj,
  })
}
// 联系记录-新增
export function createVisit (obj) {
  return request({
    url: `${visitUrl}/create`,
    method: 'post',
    data: obj,
  })
}
// 联系记录-删除
export function deleteVisit (contactId) {
  return request({
    url: `${visitUrl}/delete/batch/${contactId}`,
    method: 'post',
    data: contactId,
  })
}
//联系记录通过id查询
export function contactById (contactId) {
  return request({
    url: `${visitUrl}/delete/batch/${contactId}`,
    method: 'post',
    data: [contactId],
  })
}
// 删除
export function contactBatchById (ids) {
  return request({
    url: `${visitUrl}delete/batch/${ids}`,
    method: 'post',
    data: [ids],
  })
}
// 拜访日志-查询
export function fetchVisitLog (params) {
  return request({
    url: '/mlms/meeting/page/visitList',
    method: 'get',
    params: params,
  })
}
// 拜访日志-通过id查询
export function fetchVisitLogById (id) {
  return request({
    url: `${visitLog}/page`,
    method: 'get',
    params: id,
  })
}
// 拜访日志-新增
export function createVisitLog (obj) {
  return request({
    url: `${visitLog}/create`,
    method: 'post',
    data: obj,
  })
}
// 拜访日志-编辑
export function updateVisitLog (obj) {
  return request({
    url: `${visitLog}/update`,
    method: 'post',
    data: obj,
  })
}
//拜访日志-删除
export function deleteVisitLog (id) {
  return request({
    url: `${visitLog}/delete/batch`,
    method: 'post',
    data: [id],
  })
}
//拜访日志发送
export function visitSend (id) {
  return request({
    url: `/mlms/meeting/send/${id}`,
    method: 'post',
  })
}





