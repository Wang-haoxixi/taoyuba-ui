import request from '@/router/request'
// import exportDownload from '@/util/export'

// 获取城市级联字典
export function getCityDict () {
  return request.get('/admin/city/tree')
}

// 获取详情数据
export function getSearchDetail (id) {
  return request.get(`/survey/system/${id}`)
}

// 搜索页面主表数据
export function getSearchTableData (listQuery) {
  return request.get('/survey/search/page', {
    params: listQuery,
  })
}

// 审核页面主表数据
export function getSystemTableData (listQuery) {
  return request.get('/survey/system/page', {
    params: listQuery,
  })
}

// 获取详情数据
export function getSystemDetail (id) {
  return request.get(`/survey/system/${id}`)
}

// 审核通过
export function systemReview (id, type) {
  if (type === 'batch') {
    return request.post('/survey/system/review/batch', id)
  } else {
    return request.post(`/survey/system/review/${id}`)
  }
}
// 审核驳回
export function systemReject (id, reason, type) {
  if (type === 'batch') {
    return request.post('/survey/system/reject/batch', {
      ids: id,
      reason: reason,
    })
  } else {
    return request.post(`/survey/system/reject/${id}`, {
      reason: reason,
    })
  }
}

// 系统注册

// 提交
export function systemSubmit (id) {
  return request.post(`/survey/system/submit/${id}`)
}
// 删除
export function systemDelete (id) {
  return request.post(`/survey/system/delete/${id}`)
}
// 新增
export function systemNewly (data) {
  data.status = 'E'
  return request.post('/survey/system/create', data)
}
// 编辑
export function systemEdit (data) {
  data.status = 'E'
  return request.post('/survey/system/update', data)
}
// 草稿
export function systemDraft (data, status) {
  data.status = 'B'
  if(status === 'newly') {
    return request.post('/survey/system/create', data)
  } else {
    return request.post('/survey/system/update', data)
  }
}
// 目录编制保存
export function saveRelation (id,data) {
  return request.post(`/survey/system/saveRelation/${id}`, data)
}
// 导出
// export function systemExport (data) {
//   return exportDownload({url: `/directory/dirExcel/download_data`, data: data})
// }

export function getExportDemo (params) {
  // return request.post('/survey/system/model_download')
  return request({
    url: `/survey/system/model_download`,
    method: 'post',
    headers: {
      responseType: 'arraybuffer',
    },
    data: params || {},
    responseType: 'blob',
  })
}
