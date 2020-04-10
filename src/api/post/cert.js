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

export function detal (id) {
  return request({
    url: `${prefixUrl}/detail`,
    method: 'get',
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

export function getCertPage (query,data) {
  return request ({
    url:`${prefixUrl}/getPage`,
    method: 'get',
    params: query,
    data:data,
  })
}

export function deleteCertById (id) {
  return request({
    url: `${prefixUrl}/` +id,
    method: 'post',
    data: id,
  })
}

export  function  getMyPage (params) {
      return  request({
        url:`${prefixUrl}/getotherPage`,
        method:'get',
        params:params,
    })  
}
export function getMyCretList (id) {
  return request({
    url:`${prefixUrl}/mycertlist`,
    method: 'get',
    params: {
      idcard: id,
    },
  })
}

export  function  checkShipCert (shipId) {        
  return request({
    url: `${prefixUrl}/certStandard/` +shipId,
    method: 'get',
  })
}



