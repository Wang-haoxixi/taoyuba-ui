import request from '@/router/axios'

const crmseUrl = '/crm/statistical'

export function getMybusiness (params) {
  return request({
    url: `${crmseUrl}/my/business`,
    method: 'get',
    params: params,
  })
}