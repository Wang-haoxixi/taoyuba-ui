import request from '@/router/axios'
const prefixUrl = '/tmlms/crew'

export function getEmployees (realName) {
  return request({
    url: `${prefixUrl}/Page`,
    method: 'get',
    params: {
      realName,
      size: 10000,
    },
  })
}