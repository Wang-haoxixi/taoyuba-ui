import request from '@/router/axios'

export function exportDownload ({url, method = 'post', data = {}, title = ''}) {
    // console.log(url)
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
  
 function downloadExport ({ title = '', response }) {
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