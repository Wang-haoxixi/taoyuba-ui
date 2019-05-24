import request from '@/router/request'
const baseUrl = '/proj/dnaprojectrole'
export function getProjectRolePage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}

//新增
export function createRole (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//修改
export function updateRole (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

//删除
export function deleteRole (params) {
  return request.post(`${baseUrl}/delete`, params)
}

//启用禁用
export function updateStatus (params) {
  return request.post(`${baseUrl}/changeStatusById`, params)
}

//批量启用或禁用
export function batchChangeStatus (params) {
  return request.post(`${baseUrl}/batchChangeStatus`,params)
}

//角色下拉选
export function getRoleSelect () {
  return request({
    url: `${baseUrl}/selectRoleList`,
    method: 'get',
  })
}

//获取角色权限
export function projectMenu (params) {
  return request({
    url: `/admin/menu/getProjectTree`,
    method: 'get',
    params: params,
  })
}

//获取已经勾选的权限
export function getProjectRole (params) {
  return request({
    url: `${baseUrl}/selectRoleMenu`,
    method: 'get',
    params: params || {},
  })
}

//更新勾选的权限
export function updateRoleMenu (params) {
  return request.post(`${baseUrl}/updateRoleMenu`, params)
}

//获取登录用户的菜单
export function selectUserMenu (params) {
  return request({
    url: `${baseUrl}/selectUserMenu`,
    method: 'get',
    params: params || {},
  })
}

//获取登录用户的权限
export function selectUserPermission (params) {
  return request({
    url: `${baseUrl}/selectNowRolePermission`,
    method: 'get',
    params: params || {},
  })
}