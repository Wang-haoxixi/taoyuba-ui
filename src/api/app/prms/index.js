import request from '@/router/axios'
const prefixUrl = '/prms/channel_project'

export const getProjectList = (id) => {
  return request({
    url: `${prefixUrl}/project_list/${id}`,
    method: 'get',
  })
}