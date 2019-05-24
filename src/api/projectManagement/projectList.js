import request from '@/router/request'
const baseUrl = '/proj/dnaproject'
import exportDownload from '@/util/export'

export function getProjectListAll () {
  return request({
    url: `/proj//project/listAll`,
    method: 'get',
  })
}

export function getMainTableData (params = {}) {
  return request.get('/zqq/projectManagement/projectList/list', {
    params: params,
  })
}
export function getChildrenList (params = {}) {
  return request.get('/zqq/projectManagement/projectList/childrenList', {
    params: params,
  })
}

//新增阶段配置的表单字段
export function getNewPhaseForm (moduleType) {
  return request({
    url: `${baseUrl}/getNewPhaseForm/${moduleType}`,
    method: 'get',
  })
}

//新增阶段配置的查询字段
export function getFormProps () {
  return request({
    url: `${baseUrl}/getNewPhaseQuery`,
    method: 'get',
  })
}

//分页查询
export function getProjectListPage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params,
  })
}

//新增项目
export function createProject (formData) {
  return request.post(`${baseUrl}/create`, formData)
}

//获取表格展示字段
export function getTableProps () {
  return request({
    url: `${baseUrl}/getNewPhaseTable`,
    method: 'get',
  })
}

//修改项目
export function updateProject (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

//删除
export function deleteProject (params) {
  return request({
    url: `${baseUrl}/delete/batch`,
    method: 'post',
    data: params || {},
  })
}

//项目统计
export function selectProjectTitle () {
  return request({
    url: `${baseUrl}/selectProjectTitle`,
    method: 'get',
  })
}

// 操作日志
export function checkOperLog (params) {
  return request({
    url: `/proj/dnaprojectoperlog/page`,
    method: 'get',
    params: params || {},
  })
}

// 基本信息
export function getProjectInfo (params) {
  return request({
    url: `${baseUrl}/getProjectInfo`,
    method: 'get',
    params: params || {},
  })
}

//下载
export function downloadFile ({params,title}) {
  return exportDownload({
    url: `${baseUrl}/download`,
    method: 'post',
    data: params || {},
    title,
  })
}

//项目统计头部统计
export function getStatisticsTitle () {
  return request({
    url: `${baseUrl}/getProjectStatistics`,
    method: 'get',
  })
}

//项目状态统计
export function getProjectType (params) {
  return request({
    url: `${baseUrl}/getProjectType`,
    method: 'get',
    params: params,
  })
}

//项目统计的项目清单
export function projectListPage (params) {
  return request({
    url: `${baseUrl}/projectListPage`,
    method: 'get',
    params: params,
  })
}

//查询父级项目
export function getProjectParentForSelect () {
  return request({
    url: `${baseUrl}/getProjectParentForSelect`,
    method: 'get',
  })
}

//审核项目
export function auditProject (formData) {
  return request.post(`${baseUrl}/review`, formData)
}