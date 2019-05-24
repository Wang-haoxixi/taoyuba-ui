import request from '@/router/axios'

const prefixUrl = '/ims/announcement'
// @/api/ims/announcement
export function getAnnouncementPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getAnnouncementById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function postAnnouncement (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function putAnnouncement (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function readAnnouncementBatch (ids) {
  return request({
    url: `${prefixUrl}/read_or_set/batch`,
    method: 'post',
    data: ids,
    params: {
      type: 8,
    },
  })
}
