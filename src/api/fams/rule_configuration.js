import request from '@/router/axios'

const prefixUrl = '/fams/rule_configuration'
// @/api/fams/rule_configuration

export function getConfigurationPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    data: obj,
  })
}