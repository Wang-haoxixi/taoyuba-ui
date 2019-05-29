import request from '@/router/axios'

const prefixUrl = 'admin/region'

export function getArea (id) {
  return request({
    url: `${prefixUrl}/area?parentCode=${id}`,
    method: 'get',
  })
}

export function getInfo (code) {
  return request({
    url: `${prefixUrl}/getinfo/` + code,
    method: 'get',
  })
}