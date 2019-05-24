import request from '@/router/request'

export function GetMenu () {
  return request({
    // url: '/zqq/menus',
    url: '/admin/menu/userMenu',
    method: 'get',
  })
}
export function GetMockMenu () {
  return request({
    url: '/admin/menu/userMockMenu',
    method: 'get',
  })
}
