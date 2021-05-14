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
    url: 'admin/tybad/pageAndSort',
    method: 'get',
    params: query,
  })
}
export function createPicPage (query) {
  return request({
    url: 'admin/tybad/add',
    method: 'post',
    data: query,
  })
}
export function updatePicPage (query) {
  return request({
    url: 'admin/tybad/update',
    method: 'post',
    data: query,
  })
}
export function getPicById (id) {
  return request({
    url: `admin/tybad/${id}`,
    method: 'get',
  })
}
export function removePicPage (id) {
  return request({
    url: `admin/tybad/delete/${id}`,
    method: 'post',
  })
}

export function getColumnPage (params) {
  return request({
    url: '/tmlms/e_ac_column/page',
    method: 'get',
    params: params,
  })
}

export function addColumn (data) {
  return request({
    url: '/tmlms/e_ac_column/saveOrUpdate',
    method: 'post',
    data: data,
  })
}

export function detail (id) {
  return request({
    url: `/tmlms/e_ac_column/${id}`,
    method: 'get',
  })
}

export function getPage (params) {
  return request({
    url: '/tmlms/e_ac/page',
    method: 'get',
    params: params,
  })
}

export function getDetail (id) {
  return request({
    url: `/tmlms/e_ac/${id}`,
    method: 'get',
  })
}

export function addColumnNew (data) {
  return request({
    url: '/tmlms/e_ac/saveOrUpdate',
    method: 'post',
    data: data,
  })
}