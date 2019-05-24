import request from '@/router/axios'
const prefixUrl = '/mlms/meeting'
const catalogueUrl = '/mlms/catalogue'

export function getTableData (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: obj,
  })
}

// 我发布的
export function getTablePersonal (obj) {
  return request({
    url: `${prefixUrl}/page/personal`,
    method: 'get',
    params: obj,
  })
}

// 我参与的
export function getTableMyInvolved (obj) {
  return request({
    url: '/mlms/meeting/MyInvolved/page',
    method: 'get',
    params: obj,
  })
}

// 我收到的
export function getTableMyReceived (obj) {
  return request({
    url: '/mlms/meeting/MyReceived/page',
    method: 'get',
    params: obj,
  })
}

export function getDataById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function createData (obj) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: obj,
  })
}

export function updateData (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}

export function deleteData (ids) {
  if (typeof ids == 'number') {
    ids = [ids]
  }
  console.log('ids: ', ids)
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}

// 收藏
export function createCollect (obj) {
  return request({
    url: '/mlms/farelation/create',
    method: 'post',
    data: obj,
  })
}

// 收藏的列表
export function collectList () {
  return request({
    url: `${catalogueUrl}/tree`,
    method: 'get',
  })
}

// 收藏列表新增
export function createCollectList (obj) {
  return request({
    url: `${catalogueUrl}/create`,
    method: 'post',
    data: obj,
  })
}

// 复制
export function copyData (id) {
  return request({
    url: `${prefixUrl}/copy/${id}`,
    method: 'get',
  })
}

// 发送
export function meetingSend (id) {
  return request({
    url: `${prefixUrl}/send/${id}`,
    method: 'post',
  })
}

// 获取本周统计数据
export function getCount (obj) {
  return request({
    url: `${prefixUrl}/getCount`,
    method: 'post',
    data: obj,
  })
}
