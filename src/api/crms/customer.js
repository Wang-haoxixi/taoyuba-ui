import request from '@/router/axios'
const prefixUrl = '/crm/customer'
import Qs from 'qs'
//客户page

export function getCustomerPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
    paramsSerializer: function (params) {
      return Qs.stringify(params, { indices: false })
    },
  })
}
//客户详情
export function getCustomerById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}
//新增客户
export function postCustomer (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}
//编辑客户
export function putCustomer (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
//删除客户
export function deleteCustomerBatch (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}
// 添加协助人
export function AddCollaborator (query) {
  return request({
    url: `${prefixUrl}/create/collaboration`,
    method: 'post',
    data: query,
  })
}
//获取协作人列表
export function getCollaboratorPage (id, query) {
  return request({
    url: `${prefixUrl}/page/collaboration/${id}`,
    method: 'get',
    params: query,
  })
}
//转移客户
export function TransferCustomers (query) {
  return request({
    url: `${prefixUrl}/transfer`,
    method: 'post',
    data: query,
  })
}
//客户名称新增查重
export function checkName (query) {
  return request({
    url: `${prefixUrl}/nameExists`,
    method: 'get',
    params: query,
  })
}
//市场经理
export function getMarket (query) {
  return request({
    url: `${prefixUrl}/clientMarket`,
    method: 'get',
    params: query,
  })
}
//我的客户和协作客户列表
export function getMyorcollList (query) {
  return request({
    url: `${prefixUrl}/myorcoll/list`,
    method: 'get',
    params: query,
  })
}
