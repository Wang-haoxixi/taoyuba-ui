import request from '@/router/axios'

const prefixUrl = '/dataclean'
// @/api/dataclean/rule
export function getRulePage (opts) {
  return request({
    url: `${prefixUrl}/data_rule/page`,
    method: 'get',
    params: opts,
  })
}

export function getRuleList () {
  return request({
    url: `${prefixUrl}/data_rule/list`,
    method: 'get',
  })
}
export function getRuleDetailById (id) {
  return request({
    url: `${prefixUrl}/data_rule/${id}`,
    method: 'get',
  })
}
export function putRule (obj) {
  return request({
    url: `${prefixUrl}/data_rule/update`,
    method: 'post',
    data: obj,
  })
}

export function postRule (obj) {
  return request({
    url: `${prefixUrl}/data_rule/create`,
    method: 'post',
    data: obj,
  })
}

export function deleteRuleBatch (ids) {
  return request({
    url: `${prefixUrl}/data_rule/delete`,
    method: 'post',
    data: ids,
  })
}

export function deleteRuleById (id) {
  return request({
    url: `${prefixUrl}/data_rule/delete/${id}`,
    method: 'post',
  })
}

export function getRuleOption (id) {
  return request({
    url: `${prefixUrl}/data_rule/key/${id}`,
    method: 'get',
  })
}
