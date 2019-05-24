import request from '@/router/axios'
const prefixUrl = '/mlms/channel_material/honor'

// 获得资质库总数
export const getHonorCount = (params) => {
  return request({
    url: `${prefixUrl}/count`,
    method: 'get',
    params: params,
  })
}

// 获得选项卡
export const getHonorSign = (params) => {
  return request({
    url: `${prefixUrl}/getSign`,
    method: 'get',
    params: params,
  })
}

// 获得资质库分页（包含模糊搜索）
export const getHonorPage = (params) => {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: params,
  })
}
