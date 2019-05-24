import request from '@/router/axios'
// @/api/hrms/post_type
export function getCommonList (url, name) {
  return request({
    url: `/${url}/list`,
    method: 'get',
    params: {
      name,
    },
  })
}

export function getCommonPage (url, params) {
  return request({
    url: `/${url}`,
    method: 'get',
    params,
  })
}

export function downloadFile (file) {
  request({
    url: '/admin/file/' + file.url,
    method: 'get',
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = file.name
    document.body.appendChild(link)
    link.style.display = 'none'
    link.click()
  })
}

export function downloadUrl (url) {
  request({
    url: '/admin/file/' + url,
    method: 'get',
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = url
    document.body.appendChild(link)
    link.style.display = 'none'
    link.click()
  })
}
