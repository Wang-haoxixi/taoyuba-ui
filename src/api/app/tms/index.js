import request from '@/router/axios'
const prefixUrl = '/tms/channel_tag'

export const getTagsList = (params) => {
  return request({
    url: `${prefixUrl}/list`,
    method: 'get',
    params: params,
  })
}

// 推荐主题
export const getRectagsList = (params) => {
  return request({
    url: `${prefixUrl}/rectags`,
    method: 'get',
    params: params,
  })
}
