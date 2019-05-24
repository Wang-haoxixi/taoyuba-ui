import request from '@/router/request'

export function fetchList (query) {
  return request({
    url: '/gen/generator/page',
    method: 'get',
    params: query,
  })
}

export function handleDown (table) {
  return new Promise(resolve=>{
    request({
      url: '/gen/generator/code',
      method: 'post',
      data: table,
      responseType: 'arraybuffer',
    }).then(response => {
      // 处理返回的文件流
      const blob = new Blob([response.data], { type: 'application/zip' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = table.tableName + '.zip'
      link.click()
      resolve()
    })
  })
}
