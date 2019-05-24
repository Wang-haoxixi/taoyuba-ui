import request from '@/router/axios'

export function getMobileCode (mobile) {
  return request({
    url: `/admin/mobile/${mobile}`,
    method: 'get',
  })
}