import request from '@/router/axios'

const crmsUrl = 'crm/customer'
// 资讯-新增
export function createConsultation (obj) {
  return request({
    url: `${crmsUrl}/create`,
    method: 'post',
    data: obj,
  })
}