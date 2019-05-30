import request from '@/router/axios'

const prefixUrl = 'tybhrms/crew'

export function getPositionPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function deletePositionById (id) {
  return request({
    url: `${prefixUrl}/delete/` +id,
    method: 'post',
    data: id,
  })
}

export function addPosition (data) {
  return request({
    url: `${prefixUrl}/add`,
    method: 'post',
    data: data,
  })
}

export function getPositionById (id) {
  return request({
    url: `${prefixUrl}/` + id,
    method: 'get',
    params: id,
  })
}

export function putPosition (obj, publish) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'put',
    params: {
      publish,
    },
    data: obj,
  })
}