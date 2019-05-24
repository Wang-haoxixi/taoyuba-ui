import request from '@/router/request'
const baseUrl = '/proj/dnaprojectuser'

//分页
export function getProjectUserPage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}

//获取系统用户详细信息
export function getUser (params) {
  return request({
    url: `${baseUrl}/selectUserVO`,
    method: 'get',
    params: params || {},
  })
}

//创建项目人员
export function createUser (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//修改项目人员
export function updateUser (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

//删除
export function deleteUser (params) {
  return request.post(`${baseUrl}/delete`, params)
}

//获取项目人员下拉选
export function selectUserList () {
  return request({
    url: `${baseUrl}/selectUserList`,
    method: 'get',
  })
}