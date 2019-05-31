import request from '@/router/axios'

const prefixUrl = 'tybhrms/resume'

export function getResumePage (query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}

export function deleteResumeById (id) {
  return request({
    url: `${prefixUrl}/delete/` +id,
    method: 'post',
    data: id,
  })
}

export function addResume (data) {
  return request({
    url: `${prefixUrl}/add`,
    method: 'post',
    data: data,
  })
}

export function getResumeById (id) {
  return request({
    url: `${prefixUrl}/` + id,
    method: 'get',
    params: id,
  })
}

export function putResume (obj, publish) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'put',
    params: {
      publish,
    },
    data: obj,
  })
}