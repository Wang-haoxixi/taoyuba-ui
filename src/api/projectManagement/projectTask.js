import request from '@/router/request'
const baseUrl = "/proj/dnaprojecttask"

//分页查询
export function getTaskPage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}

//新增
export function createTask (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//修改
export function updateTask (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

// 删除
export function deleteTask (params) {
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

//任务协同图
export function taskSynergy (params) {
  return request({
    url: `${baseUrl}/getCollaborationVOList`,
    method: 'get',
    params: params || {},
  })
}