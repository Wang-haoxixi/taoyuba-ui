import request from '@/router/axios'
const prefixUrl = '/ims/email'
const receiverUrl = '/ims/email_receiver'
const starUrl = '/ims/email_star'

// 收件箱
export function getReceiverList (params) {
  return request({
    url: `${prefixUrl}/receiver_page`,
    method: 'get',
    params: params,
  })
}

// 已发送
export function getSendList (params) {
  return request({
    url: `${prefixUrl}/send_page`,
    method: 'get',
    params: params,
  })
}

// 星标邮件
export function getStarList (params) {
  return request({
    url: `${prefixUrl}/star_page`,
    method: 'get',
    params: params,
  })
}

// 草稿
export function getDraftList (params) {
  return request({
    url: `${prefixUrl}/draft_page`,
    method: 'get',
    params: params,
  })
}

// 邮件详情
export function getEmailById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

// 新建邮件
export function createEmail (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 更新邮件
export function updateEmail (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

// 删除邮件
export function deleteEmailById (id) {
  return request({
    url: `${prefixUrl}/delete/${id}`,
    method: 'post',
  })
}

// 发件箱、草稿箱-批量删除邮件
export function deleteEmailByIds (ids) {
  return request({
    url: `${prefixUrl}/delete`,
    method: 'post',
    data: ids,
  })
}

// 收件箱批量删除
export function deleteEmailReceiver (ids) {
  return request({
    url: `${receiverUrl}/delete`,
    method: 'post',
    data: ids,
  })
}

// 收件箱单条删除
export function deleteEmailReceiverById (id) {
  return request({
    url: `${receiverUrl}/delete/${id}`,
    method: 'post',
  })
}

// 星标功能
export function emailStarById (id) {
  return request({
    url: `${starUrl}/sign/${id}`,
    method: 'post',
  })
}

// 标记已读
export function isReadeById (id) {
  return request({
    url: `${receiverUrl}/is_reade/${id}`,
    method: 'post',
  })
}

// 批量标记已读
export function isReadeBatch (ids) {
  return request({
    url: `${receiverUrl}/is_reade`,
    method: 'post',
    data: ids,
  })
}
