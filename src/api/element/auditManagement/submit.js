import request from '@/router/request'

// 获取主表数据
export function getMainTableData (params) {
  params.status = '7'
  return request.get('/directory/govresrc/page', {
    params: params,
  })
}

export function submitPass (id) {
  return request.post('/directory/govresrc/update-status', {id: id, status: '3'})
}

export function submitReject (data) {
  data.status = '8'
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