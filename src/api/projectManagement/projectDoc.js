import request from '@/router/request'
const baseUrl = "/proj/dnaprojectdoc"

//分页查询
export function getDocPage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}

//修改
export function updateDoc (formData) {
  return request.post(`${baseUrl}/update`, formData)
}

export function updateDocAll (formData) {
  return request.post(`${baseUrl}/updateAll`, formData)
}

//获取不同阶段的上传内容
export function getDocUploadForm (type) {
  return request({
    url: `${baseUrl}/getDocUploadForm/${type}`,
    method: 'get',
  })
}

//查看文档上传
export function getProjectDoc (params) {
  return request({
    url: `${baseUrl}/getProjectDoc`,
    method: 'get',
    params: params || {},
  })
}

//查看项目跟踪
export function getProjectTrack (params) {
  return request({
    url: `${baseUrl}/getProjectTrack`,
    method: 'get',
    params: params || {},
  })
}

//项目文档查看
export function checkProjectStage (params) {
  return request({
    url: `${baseUrl}/getProjectStage`,
    method: 'get',
    params: params || {},
  })
}

//项目阶段统计条状图
export function getBarChart () {
  return request({
    url: `${baseUrl}/getProjectStageStatisticsList`,
    method: 'get',
  })
}

//上传控件获取所有阶段的页面
export function getAllPhaseForm () {
  return request({
    url: `${baseUrl}/getDocAllUploadForm`,
    method: 'get',
  })
}
