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

export function getAreacode (name) {
  return request({
    url: `${prefixUrl}/getareacode/` + name,
    method: 'get',
  })
}

export function getAllArea (id) {
  return request({
      url: `admin/region/wholeInfoList?areaCode=${id}`,
      method: 'get',
  })
}

export function getAllAreaName (id) {
  return request({
      url: `admin/region/wholeInfo?areaCode=${id}`,
      method: 'get',
  })
}