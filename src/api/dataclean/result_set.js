import request from '@/router/axios'

const prefixUrl = '/dataclean'
// @/api/dataclean/result_set
export function getResultSetPage (id, opts) {
  const option = {
    ...opts,
    fieldId: id,
  }
  return request({
    url: `${prefixUrl}/result_set/page`,
    method: 'get',
    params: option,
  })
}

export function getAfterComparePage (opts) {
  return request({
    url: `${prefixUrl}/result_set/after_comparison`,
    method: 'get',
    params: opts,
  })
}

export function getBeforeComparePage (opts) {
  return request({
    url: `${prefixUrl}/result_set/before_comparison`,
    method: 'get',
    params: opts,
  })
}

export function getCleaningItemById (id) {
  return request({
    url: `${prefixUrl}/result_set/cleaning_item/${id}`,
    method: 'get',
  })
}

export function clearBufferById (id) {
  return request({
    url: `${prefixUrl}/result_set/clear_buffer/${id}`,
    method: 'get',
  })
}

export function clearDataById (id) {
  return request({
    url: `${prefixUrl}/result_set/clear/${id}`,
    method: 'get',
  })
}
