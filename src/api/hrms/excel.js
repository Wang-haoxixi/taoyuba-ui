import request from '@/router/axios'

const prefixUrl = '/hrms'
// @/api/hrms/excel
export function postExcelExport (fileds) {
  return request({
    url: `${prefixUrl}/excel/export`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
    data: fileds,
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = '导出信息.xls'
    link.click()
  })
}