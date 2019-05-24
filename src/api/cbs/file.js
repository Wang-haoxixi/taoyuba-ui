import request from '@/router/axios'

export function getFilePage (query) {
  return request({
    url: '/cbs/file/page',
    method: 'get',
    params: query,
  })
}

export function downloadFile (name) {
  request({
    url: '/cbs/file/download',
    method: 'post',
    params: {
      newFileName: name,
    },
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    let filename = response.headers['content-disposition'].split(';')[1]
    filename = decodeURIComponent(filename.split('=')[1])
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
  })
}

export function deleteFile (name) {
  return request({
    url: '/cbs//file/deleteFile',
    method: 'post',
    params: {
      newFileName: name,
    },
  })
}
