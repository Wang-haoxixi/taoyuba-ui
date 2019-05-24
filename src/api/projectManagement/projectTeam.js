import request from '@/router/request'
const baseUrl = '/proj/dnaprojectteam'

//分页
export function getProjectTeamPage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}

//创建项目团队
export function createTeam (formData) {
  return request.post(`${baseUrl}/create`, formData)
}  

//修改项目团队
export function updateTeam (formData) {
  return request.post(`${baseUrl}/update`, formData)
}  

//删除
export function deleteTeam (params) {
  return request.post(`${baseUrl}/delete`, params)
}

//编辑时获取base64的图片
export function getLogo (params) {
  return request({
    url: `${baseUrl}/getLogo`,
    method: 'get',
    params: params || {},
  })
}