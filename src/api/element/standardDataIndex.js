import request from '@/router/request'

export function getList (params) {
  return request.get('/directory/govdbs/page', {
    params: params,
  })
}

export function create (formData) {
  return request.post('/directory/govdbs/create', formData)
}

export function update (formData) {
  return request.post('/directory/govdbs/update', formData)
}

export function logicDelete (id) {
  return request.post(`/directory/govdbs/logicDelete/${id}`)
}
