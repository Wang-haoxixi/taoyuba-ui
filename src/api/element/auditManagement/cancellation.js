import request from '@/router/request'

// 获取主表数据
export function getMainTableData (params) {
  params.status = '4'
  return request.get('/directory/govresrc/page', {
    params: params,
  })
}

export function auditPass (id) {
  return request.post('/directory/govresrc/update-status', {id: id, status: '6'})
}

export function auditReject (data) {
  data.status = '5'
  return request.post('/directory/govresrc/update-status', data)
}

export function getSystemList () {
  return request.get('/survey/system/vo/map')
}

export function getInfoList (id) {
  return request.get('/directory/govelement/page', {
    params: {resId: id},
  })
}