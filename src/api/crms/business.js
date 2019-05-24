import request from '@/router/axios'

const crmsUrl = '/crm/business'

export function getBusinessList (query) {
  return request({
    url: `${crmsUrl}/page`,
    method: 'get',
    params: query,
  })
}
//商机新增查重
export function checkBusinessName (query) {
  return request({
    url: `${crmsUrl}/page/name`,
    method: 'get',
    params: query,
  })
}
// 新增商机
export function postBusiness (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}
//创建客户
export function createById (query) {
  return request({
    url: `${crmsUrl}/update/isCreate`,
    method: 'post',
    params: query,
  })
}
// 修改商机
export function putBusiness (obj) {
  return request({
    url: `${crmsUrl}/update`,
    method: 'post',
    data: obj,
  })
}
// 通过id查询商机
export function getBusinessById (id) {
  return request({
    url: `${crmsUrl}/${id}`,
    method: 'get',
  })
}
// 删除
export function deleteBusinessById (id) {
  return request({
    url: `${crmsUrl}/delete/batch/${id}`,
    method: 'post',
    data: [id],
  })
}

// 认领
export function claimById (obj) {
  return request({
    url: `${crmsUrl}/update/receive`,
    method: 'post',
    data: obj,
  })
}

// 拒绝认领
export function refuseClaim (id) {
  return request({
    url: `${crmsUrl}/claim/${id}`,
    method: 'post',
  })
}

// 取消认领
export function cancelClaim (obj) {
  return request({
    url: `${crmsUrl}/update/cancelReceive`,
    method: 'post',
    data: obj,
  })
}
//发送消息
export function sendMessage (query) {
  return request({
    url: '/ims/system_message/send',
    method: 'post',
    params: query,
  })
}
//商机浏览量
export function businessView (obj) {
  return request({
    url: `${crmsUrl}/update/view`,
    method: 'post',
    params: obj,
  })
}