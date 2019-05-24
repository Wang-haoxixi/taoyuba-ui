import request from '@/router/request'
//获取所属部门树形结构数据
export function getDeptTree (query) {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
    params: query,
  })
}

