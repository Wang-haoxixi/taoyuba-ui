import request from '@/router/axios'
const prefixUrl = '/ims/channel_notification'

export const getNotificationList = (params) => {
  return request({
    url: `${prefixUrl}/notification_list`,
    method: 'get',
    params: params,
  })
}