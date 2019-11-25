import request from '@/router/axios'
const prefixUrl = '/tybhrms/tybtrainlesson'

export function getLessonPage (query) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: query,
    })
  }