import request from '@/router/axios'

const prefixUrl = '/tms'
// @/api/tms/tag-type
export function getTagTypeList () {
  return request({
    url: `${prefixUrl}/tag_type/list`,
    method: 'get',
  })
}
export function getTagTypeParents (id = '') {
  return request({
    url: `${prefixUrl}/tag_type/parents`,
    method: 'get',
    params: { id },
  })
}

export function getTagTypePage (opts) {
  return request({
    url: `${prefixUrl}/tag_type/page`,
    method: 'get',
    params: opts,
  })
}

export function putTagType (tag) {
  return request({
    url: `${prefixUrl}/tag_type/update`,
    method: 'post',
    data: tag,
  })
}

export function postTagType (tag) {
  return request({
    url: `${prefixUrl}/tag_type/create`,
    method: 'post',
    data: tag,
  })
}

export function deleteTagTypeById (id) {
  return request({
    url: `${prefixUrl}/tag_type/delete/${id}`,
    method: 'post',
  })
}
