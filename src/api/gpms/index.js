import request from '@/router/axios'
const prefixUrl = '/prms/iepProjectInformation'

export function getTableData (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

// 供给邮件关联使用，与上面的链接一模一样
export function getProjectList (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}`,
    method: 'post',
    data: obj,
  })
}

// 编辑 -- 立项申请、审批
export function updateData (obj) {
  return request({
    url: `${prefixUrl}/edit`,
    method: 'post',
    data: obj,
  })
}

// 详情
export function getDataDetail (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function deleteData (id) {
  let ids = typeof id === 'object' ? id : [id]
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

// 审批列表
export function getApprovalList (obj) {
  return request({
    url: `${prefixUrl}/projectApproval`,
    method: 'get',
    params: obj,
  })
}

