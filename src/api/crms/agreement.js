import request from '@/router/axios'
const prefixUrl = '/mlms/contract'
const crmUrl = '/crm/contract'
//合同列表
export function getAgreementPage (params) {
  return request({
    url: `${prefixUrl}/MyClient/page`,
    method: 'get',
    params: params,
  })
}
// 新增
export function postAgreement (obj) {
  return request({
    url: `${crmUrl}/create`,
    method: 'post',
    data: obj,
  })
}
// 修改
export function putAgreement (obj) {
  return request({
    url: `${crmUrl}/update`,
    method: 'post',
    data: obj,
  })
}
//通过id查询
export function agreementById (id) {
  return request({
    url: `${crmUrl}/${id}`,
    method: 'get',
  })
}
// 删除
export function deleteAgreementById (id) {
  return request({
    url: `${crmUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}

