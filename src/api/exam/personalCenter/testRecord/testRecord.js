/**
 * 新增专题考试记录API请求接口
 */

import request from '@/router/axios'
/**
 * 获取专题考试列表页
 * @param {Object} params 参数
 */
export function getTestRecordList (params) {
    return request({
        url: '/exms/iepexamination/selectById',
        method: 'get',
        params: params,
    })
}