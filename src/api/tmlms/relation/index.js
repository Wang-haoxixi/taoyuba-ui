import request from '@/router/axios'

const prefixUrl = '/tmlms/relationship'
// @/api/wel/index
export function getPage (query) {
  return request({
    url: `${prefixUrl}/getPage`,
    method: 'get',
    params: query,
  })
}

export function getPageById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function removePage (query) {
  return request({
    url: `${prefixUrl}/remove`,
    method: 'post',
    params: query,
  })
}

export function updatePage (query) {
  return request({
    url: `${prefixUrl}/edit`,
    method: 'post',
    data: query,
  })
}

export function createPage (query) {
  return request({
    url: `${prefixUrl}/create`,
    method: 'post',
    data: query,
  })
}

export function getPageLast (query) {
  return request({
    url: `${prefixUrl}/getLast`,
    method: 'get',
    params: query,
  })
}

export function exportPage (data) {
  return new Promise((resolve, reject) => {
    request({
      url: '',
      method: 'post',
      data,
      responseType: 'arraybuffer',
    }).then(response => {
      let filename = response.headers['content-disposition'].split(';')[1]
      filename = decodeURIComponent(filename.split('=')[1])
      // filename = decodeURIComponent(filename.split('"')[1])
      const blob = new Blob([response.data])
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.style.display = 'none'
      link.click()
      resolve()
    }).catch(() => {
      reject()
    })
  })
}