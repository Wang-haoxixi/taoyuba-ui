import request from '@/router/request'

const baseUrl = '/gvs/item'

// 列表
export function getPage (params) {
  return request({
    url: `${baseUrl}/withdrawn_page`,
    method: 'get',
    params: params || {},
  })
}

// 提交
export function submitData (params) {
  return request({
    url: `${baseUrl}/withdrawn_update`,
    method: 'post',
    data: params || {},
  })
}

// 删除
export function deleteData (id) {
  return request({
    url: `${baseUrl}/withdrawn_delete/${id}`,
    method: 'post',
  })
}

