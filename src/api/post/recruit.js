import request from '@/router/axios'

const prefixUrl = 'tybhrms/tybrecruit'

export function getRecruitPage (query) {
  return request ({
    url:`${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function deleteRecruitById (id) {
  return request({
    url: `${prefixUrl}/` +id,
    method: 'post',
    data: id,
  })
}

export function addRecruit (data) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data: data,
  })
}

export function getRecruitById (id) {
  return request({
    url: `${prefixUrl}/` + id,
    method: 'get',
    params: id,
  })
}

export function putRecruit (obj, publish) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    params: {
      publish,
    },
    data: obj,
  })
}