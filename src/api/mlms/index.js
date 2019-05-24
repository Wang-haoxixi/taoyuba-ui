// 资源模块通用接口
import request from '@/router/axios'

// 评论
export function commentMaterial (obj) {
  return request({
    url: '/mlms/comment/create/review',
    method: 'post',
    data: obj,
  })
}

export function getCommentPage (obj) {
  return request({
    url: '/mlms/comment/page',
    method: 'get',
    params: obj,
  })
}
