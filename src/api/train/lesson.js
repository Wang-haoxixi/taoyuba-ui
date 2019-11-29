import request from '@/router/axios'
const prefixUrl = '/tybhrms/tybtrainlesson'

export function getLessonPage (query) {
    return request({
      url: `${prefixUrl}/page`,
      method: 'get',
      params: query,
    })
  }

  export function lessonById (id) {
    return request({
      url: `${prefixUrl}/${id}`,
      method: 'get',
    })
  } 