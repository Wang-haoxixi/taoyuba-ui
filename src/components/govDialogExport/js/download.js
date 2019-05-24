import request from '@/router/request'

export default function exportDownload ({url, method = 'post', data = {}, title = ''}) {
  return new Promise((resolve, reject) => {
    return request({
      url: url,
      method: method,
      headers: {
        responseType: 'arraybuffer',
      },
      data: data,
      responseType: 'blob',
      timeout: 60 * 60 * 1000,
    }).then((response) => {
      downloadExport({title: title, response}).then((res) => {
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    }).catch(err=>{
      reject(err)
    })
  })
}
// excel下载文件解析
function contentDispositionAnalysis (contentDisposition) {
  let obj = {}
  let list = contentDisposition.split('; ')
  list.forEach(item=>{
    let n = item.split('=')
    if (n[1]) {
      obj[n[0]] = n[1]
    } else {
      obj[n[0]] = n[0]
    }
  })
  obj.suffix = obj.filename.split('.')[1]
  return obj
}

function downloadExport ({title = '', response}) {
  let contentInfo = contentDispositionAnalysis(response.headers['content-disposition'].replace(/"/g, ""))
  return new Promise((resolve) => {
    let headers = response.headers
    let blob = new Blob([response.data], {
      type: headers['content-type'],
    })
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    if (!title) {
      link.download = contentInfo.filename
    } else {
      link.download = `${title}.${contentInfo.suffix}`
    }
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, `${title}.${contentInfo.suffix}`)
      resolve()
      return
    }
    if (document.all) {
      link.click()
    } else {
      let e = document.createEvent("MouseEvents")
      e.initEvent("click", true, true)
      link.dispatchEvent(e)
    }
    // link.click()
    resolve()
  })
}
