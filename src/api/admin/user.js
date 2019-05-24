import request from '@/router/request'
// 获取用户列表数据
export function getUserList (query) {
  return request({
    url: '/admin/user/userPage',
    method: 'get',
    params: query,
  })
}
// 删除
export function deleteUser (id) {
  return request({
    url: '/admin/user/delete/' + id,
    method: 'post',
  })
}
