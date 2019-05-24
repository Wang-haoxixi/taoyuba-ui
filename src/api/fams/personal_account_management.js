import request from '@/router/axios'

const prefixUrl = '/fams/personal_account_management'
// @/api/fams/rule_configuration

export function getPersonalAccountManagementPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    data: obj,
  })
}