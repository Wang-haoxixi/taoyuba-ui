import request from '@/router/axios'

const prefixUrl = '/ims/email'
// @/api/ims/email
export function getImsWel () {
  return request({
    url: `${prefixUrl}/unread_list`,
    method: 'get',
  })
}
