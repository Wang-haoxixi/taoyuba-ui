import request from '@/router/request'

export function roleList () {
  return request({
    url: '/admin/role/roleList',
    method: 'get',
  })
}

export function fetchList (query) {
  return request({
    url: '/admin/role/rolePage',
    method: 'get',
    params: query,
  })
}

export function deptRoleList (deptId) {
  return request({
    url: '/admin/role/roleList/' + deptId,
    method: 'get',
  })
}

export function getObj (id) {
  return request({
    url: '/admin/role/' + id,
    method: 'get',
  })
}

export function addObj (obj) {
  return request({
    url: '/admin/role/create',
    method: 'post',
    data: obj,
  })
}

export function putObj (obj) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: obj,
  })
}

export function delObj (id) {
  return request({
    url: '/admin/role/delete/' + id,
    method: 'post',
  })
}

export function permissionUpd (roleId, menuIds) {
  return request({
    url: '/admin/role/update/roleMenuUpd',
    method: 'post',
    params: {
      roleId: roleId,
      menuIds: menuIds,
    },
  })
}

export function fetchRoleTree (roleName) {
  return request({
    url: '/admin/menu/roleTree/' + roleName,
    method: 'get',
  })
}

export function fetchDeptTree (query) {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
    params: query,
  })
}

export function checkName (obj) {
  return request({
    url: '/admin/user/check',
    method: 'post',
    data: obj,
  })
}

// 回收箱列表
export function getPageRecycle (params) {
  return request({
    url: '/admin/role/recycle_bin',
    method: 'get',
    params: params || {},
  })
}

// 回收箱还原
export function reductionRecycle (params) {
  return request({
    url: '/admin/role/reduction',
    method: 'post',
    data: params || {},
  })
}

// 回收箱删除
export function deleteRecycle (params) {
  return request({
    url: '/admin/role/real_delete',
    method: 'post',
    data: params || {},
  })
}
