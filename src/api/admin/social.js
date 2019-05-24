import request from '@/router/request'

// 获取用户列表数据
export function getSocialList (params) {
  return request({
    url: '/admin/social/page',
    method: 'get',
    params: params,
  })
}
// 新增
export function createSocial (params) {
  return request({
    url: '/admin/social/create',
    method: 'post',
    data: params,
  })
}
// 编辑
export function updateSocial (params) {
  return request({
    url: '/admin/social/update',
    method: 'post',
    data: params,
  })
}
// 删除
export function deleteSocial (id) {
  return request({
    url: '/admin/social/delete/' + id,
    method: 'post',
  })
}

