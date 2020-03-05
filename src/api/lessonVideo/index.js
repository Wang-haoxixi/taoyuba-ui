import request from '@/router/axios'
const prefixUrl = '/tybhrms/tyblessonvideo'

export function getVideolist (params) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}     

export function getVideoDetail (id) {   
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })    
}        

export function createVideo (data) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data,
  })
}

export function updateVideo (data) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data,
  })
}

export function deleteVideo (id) {    
  return request({
    url: `${prefixUrl}/del/${id}`,
    method: 'post',
  })
}





















