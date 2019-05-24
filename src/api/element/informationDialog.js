import request from '@/router/request'

export function getPageList (params) {
  return request.get('/directory/govelement/page', {
    params: params,
  })
}

export function repeatInformationName (formData) {
  return request.post('/directory/govresrc/repeat', formData)
}