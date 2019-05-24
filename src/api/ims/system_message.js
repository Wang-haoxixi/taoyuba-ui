import request from '@/router/axios'

const prefixUrl = '/ims/system_message'
// @/api/ims/system_message
export function getSystemMessagePage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function getTypeCountMap () {
  return request({
    url: `${prefixUrl}/type_count_map`,
    method: 'get',
  })
}

export function getSystemMessageById (id) {
  return request({
    url: `${prefixUrl}/${id}`,
    method: 'get',
  })
}

export function readSystemMessageBatch (ids) {
  return request({
    url: `${prefixUrl}/read_or_set/batch`,
    method: 'post',
    data: ids,
    params: {
      type: 8,
    },
  })
}
