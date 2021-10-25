import request from '@/router/axios'

export function getPage (query) {
    return request({
      url: 'tmlms/tybship/pageForRelation',
      method: 'get',
      params: query,
    })
  }