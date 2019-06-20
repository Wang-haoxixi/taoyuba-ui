/**
 * 新增阅卷管理API请求接口
 */

import request from '@/router/axios'
/**
 * 获取阅卷管理列表页
 * @param {Object} params 参数
 */
export function getExamReadingList (params) {
    return request({
        url: '/exms/grade/page',
        method: 'get',
        params: params,
    })
}

/**
 * 删除
 */
export function deleteById (id) {
    return request({
      url: 'exms',
      method: 'post',
      data: id,
    })
  }
  
  /**
  * 批量删除
  */
  export function deleteIdAll (ids) {
    return request({
      url: 'exms',
      method: 'post',
      data: ids,
    })
  }
  

/**
 *根据id判断是否可以进行笔试阅卷
 */
export function judgeWrittenById (id) {
    return request({
      url: '/exms/grade/check',
      method: 'post',
      data: id,
    })
}

/**
 *根据id获取笔试阅卷信息
 */
export function passWrittenById (params) {
  return request({
    url: '/exms/grade/makding',
    method: 'post',
    data: params,
  })
}


/**
 * 提交选择题判分表单
 */
export function passChoiceById (params) {
    return request({
      url: 'exms',
      method: 'post',
      data: params,
    })
}

/**
 * 提交面试表单
 */
export function passInterviewById (params) {
    return request({
      url: 'exms',
      method: 'post',
      data: params,
    })
}

/**
 * 发放证书
 */
export function sendCertificateById (params) {
  return request({
    url: 'exms',
    method: 'post',
    data: params,
  })
}

/**
 * 一键收卷
 */
export function rollingPaperById (params) {
  return request({
    url: 'exms',
    method: 'post',
    data: params,
  })
}

/**
 * 完成阅卷
 */
export function  overPapersById (params) {
  return request({
    url: 'exms',
    method: 'post',
    data: params,
  })
}

/**
 * 发送成绩
 */
export function  sendResultById (params) {
  return request({
    url: 'exms',
    method: 'post',
    data: params,
  })
}
