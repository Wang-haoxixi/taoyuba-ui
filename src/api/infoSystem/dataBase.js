import request from '@/router/request'
import exportDownload from '@/util/export'

const baseUrl = '/survey'

// 获取主表数据
export function getTableList (params) {
  return request({
    url: `${baseUrl}/dnadbs//getVoPage`,
    method: 'get',
    params: params || {},
  })
}

// 测试数据库连接
export function testDatabaseConnect (data) {
  return request.post(`${baseUrl}/dnadbs/tryLink`, data)
}

// 连接数据库后获取表数据
export function getChoseTableData (data) {
  return request.post(`${baseUrl}/dnadbs/linkDb`, data)
}

// 连接数据库后保存库表字段
export function saveChoseDB (data) {
  return request({
    url: `${baseUrl}/dnadbs/linkSaveDate`,
    method: 'post',
    data: data || {},
    timeout: 10 * 60 * 1000,
  })
}

export function updateDatas (data) {
  return request.post(`${baseUrl}/dnadbs/update`, data)
}

export function deleteBDs (id) {
  return request.post(`${baseUrl}/dnadbs/delete/${id}`)
}

// 下载模板
export function getExportDemo () {
  return exportDownload({url: `/survey/dnadbs/model_download`, data: {}, title: `数据库模板 ${new Date().getTime()}`})
}

// 导出
export function exportData (data = {}) {
  return exportDownload({url: `/survey/dnadbs/exportData`, data, title: `数据库导出 ${new Date().getTime()}`})
}

// 下载错误文件
export function exportWrongFile (name) {
  return exportDownload({
    url: '/survey/dnadbs/err_download',
    data: {name: name},
    title: `错误文件 ${new Date().getTime()}`,
  })
}

//批量删除
export function batchDelete (ids) {
  return request.post(`/survey/dnadbs/allDelete`, ids)
}
//根据ids获取数据库信息
export function getDbs (data) {
  return request({
    url: `${baseUrl}/dnadbs/ids`,
    method: 'post',
    data: data,
  })
}

//获取dbsList
export function getDbsBySystemId (id) {
  return request.get(`/survey/system/getDbsBySystemId/${id}`)
}
