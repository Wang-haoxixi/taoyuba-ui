import request from '@/router/request'
const baseUrl = '/proj/dnaprojectmilestone'

// 列表
export function getProjectMilestonePage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}
// 新增
export function createMilestone (formData) {
  return request({
    url: `${baseUrl}/create`,
    method: 'post',
    data: formData,
  })
}
// 修改
export function updateMilestone (formData) {
  return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data: formData,
  })
}
// 删除
export function deleteMilestone (params) {
  return request({
    url: `${baseUrl}/delete/batch`,
    method: 'post',
    data: params || {},
  })
}
// 获取所属项目下拉选
export function getProjectSelect () {
  return request({
    url: `/proj/dnaproject/getNameForSelect`,
    method: 'get',
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

// 下载模板
export function getExportDemo (params) {
  return request({
    url: `${baseUrl}/downloadTemplate`,
    method: 'post',
    headers: {
      responseType: 'arraybuffer',
    },
    data: params || {},
    responseType: 'blob',
  })
}

// 操作日志查看
export function checkOperLog (params) {
  return request({
    url: `/proj/dnaprojectoperlog/page`,
    method: 'get',
    params: params || {},
  })
}

// 部门用户
export function getDeptUser () {
  return request({
    url: `/admin/user/getUserDept`,
    method: 'get',
  })
}