import request from '@/router/request'
const baseUrl = '/proj/dnaprojectknowledgebase'
import exportDownload from '@/util/export'

//分页
export function getPage (params) {
  return request({
    url: `${baseUrl}/page`,
    method: 'get',
    params: params || {},
  })
}

//新增
export function addKnowledge (formData) {
  return request ({
    url: `${baseUrl}/create`,
    method: 'post',
    data: formData,
  })
}

//修改
export function updateKnowledge (formData) {
  return request({
    url: `${baseUrl}/update`,
    method: 'post',
    data: formData,
  })
}

//删除
export function deleteKnowledge (data) {
  return request({
    url: `${baseUrl}/delete`,
    method: 'post',
    data: data,
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

//详情增加浏览量
export function increasePageviews (params) {
  return request ({
    url: `${baseUrl}/increasePageviews`,
    method: 'post',
    data: params,
  })
}

//下载全部文件
export function downloadAll ({params,title}) {
  return exportDownload({
    url: `${baseUrl}/batchDownload`,
    method: 'post',
    data: params || {},
    title,
  })
}

//导入至知识库
export function importKnowledge (params) {
  return request ({
    url: `${baseUrl}/fileMigration`,
    method: 'post',
    data: params,
  })
}
