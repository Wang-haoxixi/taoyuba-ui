import request from '@/router/axios'
const prefixUrl = '/tybhrms/tybtrainapply'

export function getApplyPage (query) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: query,
    })
  }
  export function reviewApply (id, status) {
    return request({
      url: `${prefixUrl}/review`,
      method: 'post',
      params: {
        id: id,
        status: status,
      },
    })
  }
