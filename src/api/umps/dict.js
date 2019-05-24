import request from '@/router/request'

export function getDictList (params) {
  return request({
    url: '/admin/dict/dictPage',
    method: 'get',
    params: params,
  })
}

export function postDict (dict) {
  return request({
    url: '/admin/dict/create',
    method: 'post',
    data: dict,
  })
}

export function getDictById (id) {
  return request({
    url: '/admin/dict/' + id,
    method: 'get',
  })
}
export function getDictListByNumber (number) {
  return request({
    url: '/admin/dict/list/' + number,
    method: 'get',
  })
}

export function getDictChildById (id) {
  return request({
    url: '/admin/dictValue/dictValueParents/' + id,
    method: 'get',
  })
}

export function postDictChild (obj) {
  return request({
    url: '/admin/dictValue/create',
    method: 'post',
    data: obj,
  })
}

export function putDictChild (obj) {
  return request({
    url: '/admin/dictValue/update',
    method: 'post',
    data: obj,
  })
}

export function getDictChildByMid (id) {
  return request({ url: `/admin/dictValue/${id}`, method: 'get' })
}

export function deleteChildDictById (row) {
  return request({ url: '/admin/dictValue/delete/' + row.id, method: 'post' })
}
export function deleteDict (row) {
  return request({
    url: '/admin/dict/delete/' + row.id,
    method: 'post',
  })
}

export function putDict (dict) {
  return request({
    url: '/admin/dict/update',
    method: 'post',
    data: dict,
  })
}

export function remote (type) {
  return request({
    url: '/admin/dict/list/' + type,
    method: 'get',
  })
}
// getDictExcelExportByType
export function getDictExcelExportByType (type) {
  const typeMap = {
    'dict_export': '字典导出信息',
    'dict_value_export': '字典值导出信息',
  }
  return request({
    url: `/admin/excel/${type}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
  }).then(response => {
    // 处理返回的文件流
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${typeMap[type]}.xls`
    link.click()
  })
}
