import request from '@/router/axios'

const prefixUrl = '/fams/g_c_journal'
// @/api/fams/g_c_journal

export function getGCJournalPage (obj) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    data: obj,
  })
}