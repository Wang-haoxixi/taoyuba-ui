import request from '@/router/axios'

const prefixUrl = '/fams/invoice_notification'
// @/api/fams/invoice_notification

export function getInvoiceNotificationPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    data: obj,
  })
}