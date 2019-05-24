import request from '@/router/axios'
const prefixUrl = '/cpms/iephrthoughts'

export function thoughtsCreate (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function getThoughtsList (obj) {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: obj,
  })
}

export function getThoughtsPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

export function thoughtsDelete (obj) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: obj,
  })
}
