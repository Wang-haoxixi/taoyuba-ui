import request from '@/router/axios'

/**
 * 获取列表数据
 * @param {Object} params 参数
 */
export function getExamPagerList (params) {
  return request({
    url: '/exms/ieptestpaper/page',
    method: 'get',
    params: params,
  })
}

/**
 * 提交试卷
 * @param {Object} params 对象
 */
export function postNewPaper (params) {
  return request({
    url: '/exms/ieptestpaper/createTestPaper',
    method: 'post',
    data: params,
  })
}

/**
 * 获取题库相应题型的数量
 * @param {Object} params 对象
 */
export function postPaperAmount (params) {
  return request({
    url: '/exms/iepitembank/statistics',
    method: 'post',
    params: params,
  })
}

/**
 * 获取固定选题试题
 * @param {Object} params 对象
 */
export function getPaperTest (params) {
  return request({
    url: '/exms/iepitembank/selectItemByTypeSub',
    method: 'post',
    params: params,
  })
}

/**
 * 删除试卷
 */
export function deletePaperById (params) {
  return request({
    url: '/exms/ieptestpaper/deleteByStatus',
    method: 'post',
    data: params,
  })
}

/**
 * 根据ID获取试卷
 */
export function getTestPaperById (params) {
  return request({
    url: '/exms/ieptestpaper/getTestPaperById',
    method: 'get',
    params: params,
  })
}
