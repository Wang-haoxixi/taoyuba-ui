import request from '@/router/request'
import exportDownload from '@/util/export'

// 获取页面
export function getTagTypePage (listQuery) {
  return request({
    url: `/directory/dnainterfaces/page`,
    method: 'get',
    params: listQuery,
  })
}

// 获取下拉资源
export function getDeptList () {
  return request({
    url: `/admin/dept/list`,
    method: 'get',
  })
}

export function informationList () {
  return request({
    url: `/directory/govresrc/select_options`,
    method: 'get',
  })
}

// 导出下载
export function exportData (data = {}) {
  return exportDownload({url: `/directory/dnainterfaces/download_data`, data})
}
// 新增
export function createInterface (data) {
  data.auditState = '1'
  return request.post('/directory/dnainterfaces/create', data)
}
// 编辑
export function updateInterface (data) {
  data.auditState = '1' 
  return request.post('/directory/dnainterfaces/update', data)
}

// 审查
export function audit (data) {
  return request.post('/directory/dnainterfaces/audit', data)
}

// 接口 提交
export function interFaceSubmit (data) {
  return request.post('/directory/dnainterfaces/audit', data)
}