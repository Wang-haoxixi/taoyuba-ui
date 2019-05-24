import request from '@/router/request'
import {downloadExport} from '@/util/util'

export default function exportDownload ({url, method = 'post', data = {}, title = ''}) {
  return new Promise((resolve) => {
    return request({
      url: url,
      method: method,
      headers: {
        responseType: 'arraybuffer',
      },
      timeout: 60 * 1000  * 30,
      data: data,
      responseType: 'blob',
    }).then((response) => {
      downloadExport({title: title, response}).then(() => {
        resolve()
      })
    })
  })
}
