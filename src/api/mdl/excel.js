import request from '@/router/axios'

export function downloadModel (modelId) {
  const type = {
    type: modelId,
  }
  return request({
    url: '/mdl/excel/down_models',
    method: 'post',
    params: type,
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    let filename = response.headers['content-disposition'].split(';')[2]
    filename = decodeURIComponent(filename.split('=')[1])
    filename = decodeURIComponent(filename.split('"')[1])
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    console.log(link)
    link.click()
  })
}
