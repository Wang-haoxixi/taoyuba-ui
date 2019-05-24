import request from '@/router/axios'
const prefixUrl = '/admin/channel_admin'

// 组织风采
export const getRectagsOrgList = () => {
  return request({
    url: `${prefixUrl}/org_list`,
    method: 'get',
  })
}

// 组织详情
export const getOrgDetail = (id) => {
  return request({
    url: `${prefixUrl}/org/${id}`,
    method: 'get',
  })
}
