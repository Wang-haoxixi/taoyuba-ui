import request from '@/router/request'
const baseUrl = "/proj/dnaprojectweekly"

//分页查询
export function getWeeklyPage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}

//根据项目id获取项目里程碑和年度目标
export function getMilestone (id) {
  return request.get(`/proj/dnaprojectmilestone/getMilestoneByProjectId/${id}`)
}

//新增
export function createWeekly (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//修改
export function updateWeekly (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

// 删除
export function deleteWeekly (params) {
  return request({
    url: `${baseUrl}/delete/batch`,
    method: 'post',
    data: params || {},
  })
}

//导出
export function exportExcel (params) {
  return request({
    url: `${baseUrl}/exportExcel`,
    method: 'post',
    data: params || {},
    responseType: 'blob',
  })
}

