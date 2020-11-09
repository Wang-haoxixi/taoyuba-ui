import request from '@/router/axios'

export function getPosList (query) {
  return request({
    url: 'admin/tybadpos/page',
    method: 'get',
    params: query,
  })
}
export function createPosPage (query) {
  return request({
    url: 'admin/tybadpos/add',
    method: 'post',
    data: query,
  })
}
export function updatePosPage (query) {
  return request({
    url: 'admin/tybadpos/update',
    method: 'post',
    data: query,
  })
}
export function getPosById (id) {
  return request({
    url: `admin/tybadpos/${id}`,
    method: 'get',
  })
}
export function removePosPage (id) {
  return request({
    url: `admin/tybadpos/delete/${id}`,
    method: 'post',
  })
}



export function getPicList (query) {
  return request({
    url: 'admin/pageAndSort/page',
    method: 'get',
    params: query,
  })
}
export function createPicPage (query) {
  return request({
    url: 'admin/pageAndSort/add',
    method: 'post',
    data: query,
  })
}
export function updatePicPage (query) {
  return request({
    url: 'admin/pageAndSort/update',
    method: 'post',
    data: query,
  })
}
export function getPicById (id) {
  return request({
    url: `admin/pageAndSort/${id}`,
    method: 'get',
  })
}
export function removePicPage (id) {
  return request({
    url: `admin/pageAndSort/delete/${id}`,
    method: 'post',
  })
}