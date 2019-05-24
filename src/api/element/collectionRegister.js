import request from '@/router/request'
import exportDownload from '@/util/export'

export function getMainTableData (params) {
  return request({
    url: `/directory/dnacollects/page`,
    method: 'get',
    params: params || {},
  })
}

// 重新生成归集
export function reGenerate (formData) {
  formData.collectStatus = '2'
  return new Promise((resolve, reject)=>{
    request.post('/directory/dnacollects/update', formData).then(res=>{
      if(res.data.data === false) {
        reject(res.msg)
      } else {
        resolve()
      }
    })
  })
}

// 生成归集
export function generate (formData) {
  formData.collectStatus = '2'
  return new Promise((resolve, reject)=>{
    request.post('/directory/dnacollects/update', formData).then(res=>{
      if(res.data.data === false) {
        reject(res.data.msg)
      } else {
        resolve()
      }
    })
  })
}

// 实施
export function implementation (id) {
  return request.post('/', {id: id})
}

// 重新实施
export function reImplementation (id) {
  return request.post('/', {id: id})
}

// 导出
export function exportData (data = {}) {
  return exportDownload({url: `directory/dirExcel/download_colectdata`, data})
}

// SQL语句查询
export function getSqlMap (id) {
  return request.post('/directory/dnacollects/querySql', {id: id})
}