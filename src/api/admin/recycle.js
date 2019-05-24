import request from '@/router/request'

// 城市
export function getDbPage (params) {
  return request({
    url: '/admin/dept/tree',
    method: 'post',
    data: params || {},
  })
}
