import request from '@/router/axios'

export function downloadModel () {
  return request({
    url: '/crm/crms/iepclientinfoexcel/download',
    method: 'post',
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    let filename = response.headers['content-disposition'].split(';')[1]
    filename = decodeURIComponent(filename.split('=')[1])
    // filename = decodeURIComponent(filename.split('"')[1])
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.style.display = 'none'
    console.log(link)
    link.click()
  })
}