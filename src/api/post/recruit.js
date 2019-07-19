import request from '@/router/axios'

const prefixUrl = 'tybhrms/tybrecruit'

export function getRecruitPage (query) {
  return request ({
    url:`${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getMyRecruitPage (query) {
  return request ({
    url:`${prefixUrl}/mypage`,
    method: 'get',
    params: query,
  })
}

export function deleteRecruitById (id) {
  return request({
    url: `${prefixUrl}/` +id,
    method: 'post',
    data: id,
  })
}

export function addRecruit (data) {
  return request({
    url: `${prefixUrl}/save`,
    method: 'post',
    data: data,
  })
}

export function getRecruitById (id) {
  return request({
    url: `${prefixUrl}/` + id,
    method: 'get',
    params: id,
  })
}

export function putRecruit (obj, publish) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    params: {
      publish,
    },
    data: obj,
  })
}

export function exportExcel (ids) {
  return exportDownload({
    url: 'tybhrms/tybExcelExport/recruit',
    data: ids,
    title: '招聘信息',
  })
}

export  function exportDownload ({url, method = 'post', data = {}, title = ''}) {
  console.log(url)
  return new Promise((resolve) => {
    return request({
      url: url,
      method: method,
      headers: {
        responseType: 'arraybuffer',
      },
      data: data,
      responseType: 'blob',
    }).then((response) => {
      downloadExport({title: title, response}).then(() => {
        resolve()
      })
    })
  })
}

export function downloadExport ({ title = '', response }) {
  let contentInfo = contentDispositionAnalysis(
    response.headers['content-disposition'].replace(/"/g, '')
  )
  return new Promise(resolve => {
    let headers = response.headers
    let blob = new Blob([response.data], {
      type: headers['content-type'],
    })
    // ie 兼容
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, title)
    } else {
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      if (!title) {
        link.download = contentInfo.filename
      } else {
        link.download = `${title}.${contentInfo.suffix}`
      }
      document.body.appendChild(link)
      link.style.display = 'none'
      link.click()
    }

    resolve()
  })
}

function contentDispositionAnalysis (contentDisposition) {
  let obj = {}
  let list = contentDisposition.split(';')
  list.forEach(item => {
    let val = item.replace(/^\s+|\s+$/g, '')
    let n = val.split('=')
    if (n[1]) {
      obj[n[0]] = n[1]
    } else {
      obj[n[0]] = n[0]
    }
  })
  obj.suffix = obj.filename.split('.')[1]
  return obj
}