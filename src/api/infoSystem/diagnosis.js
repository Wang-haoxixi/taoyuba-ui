import request from '@/router/request'
import exportDownload from '@/util/export'

const baseUrl ="/survey/dnasystemdiagnostics"

// 导出的数据
export function getExportData () {
  return request({
    url: `/directory/dirExcel/getFields`,
    method: 'get',
  })
}

// 信息资源模板导出
export function getExportDemo (params) {
  return exportDownload({url: `/directory/govresrc/model_download`, data: params})
}

// 所属系统名称
export function getSysId () {
  return request({
    url: `/survey/system/vo/map`,
    method: 'get',
  })
}

// 获取诊断table
export function diagnosisTableList (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}


// 新增诊断
export function createDiagnosis (params) {
  return request({
    url: `${baseUrl}/save`,
    method: 'post',
    data: params || {},
  })
}

// 删除诊断
export function deleteDiagnosis (params) {
  return request({
    url: `${baseUrl}/delete/${params.id}`,
    method: 'post',
    // data: params || {},
  })
}

// 获取单条诊断详情
export function getPageList (params) {
  return request({
    url: `${baseUrl}/select/${params.id}`,
    method: 'get',
  })
}

// 单挑系统诊断
export function getDiagnostics (params) {
  return request({
    url: `${baseUrl}/diagnostics/${params.id}`,
    method: 'get',
  })
}

// 修改单条诊断详情
export function updateDiagnosis (params) {
  // console.log("发送请求1111",params)
  return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data: params || {},
  })
}

// 创建诊断条件
export function createCondition (params) {
  // console.log("发送请求1111",params)
  return request({
    url: `${baseUrl}/createCondition`,
    method: 'post',
    data: params || {},
  })
}

//创建查询条件打开或者关闭
export function updateDiagnosisCreateCondition (params) {
  return request({
    url: `${baseUrl}/createCondition`,
    method: 'post',
    data: params || {},
  })
}
