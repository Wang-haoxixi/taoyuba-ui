import request from '@/router/request'

const prefixUrl = '/tms'
// @/api/tms/excel
export function getTagExcelExport () {
  return request({
    url: `${prefixUrl}/excel/export`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = '标签导出信息.xls'
    link.click()
  })
}

// 提交
export function getModelExcel () {
  request({
    url: `${prefixUrl}/excel/model_download`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = '导入模板.xls'
    link.click()
  })
}