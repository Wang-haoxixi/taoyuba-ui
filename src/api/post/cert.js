import request from '@/router/axios'
const prefixUrl = 'tmlms/crew_cert'

export function post (data) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: data,
  })
}

export function put (data) {
  return request({
    url: `${prefixUrl}/edit`,
    method: 'post',
    data: data,
  })
}

export function del (id) {
  return request({
    url: `${prefixUrl}/remove`,
    method: 'post',
    params: {
      certId:id,
    },
  })
}

export function getMyCerts (id) {
  return request({
    url: `${prefixUrl}/myCerts`,
    method: 'get',
    params: {
        userId:id,
    },
  })
}

export function getCertPage (query) {
  return request ({
    url:`${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}

export function deleteCertByuserId (id) {
  return request({
    url: `${prefixUrl}/` +id,
    method: 'post',
    data: id,
  })
}