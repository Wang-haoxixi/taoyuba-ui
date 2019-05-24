
import request from '@/router/request'

const materialUrl = '/gvs/item'


// 关联目录保存
export function updateRelationCatalog (params) {
  return request({
    url: `${materialUrl}/relation_catalog`,
    method: 'post',
    data: params,
  })
}

//关联接口保存
export function updateRelationInterface (params) {
  return request({
    url: `${materialUrl}/relation_interface`,
    method: 'post',
    data: params,
  })
}
// 关联数据更新周期保存
export function updateCycle (params) {
  return request({
    url: `${materialUrl}/update_cycle`,
    method: 'post',
    data: params,
  })
}

// 获取接口注册列表
export function getInterfaceList (params) {
  return request({
    url: `/directory/dnainterfaces/selectByResrcIds`,
    method: 'get',
    params: params,
  })
}
//根据接口Ids查询接口信息
export function getInterfaceListByIds (params) {
  return request({
    url: `/directory/dnainterfaces/selectByInterfacesIds`,
    method: 'get',
    params: params,
  })
}
//getInfoList
export function getInfoList (params) {
  return request({
    url: `/directory/govresrc/select_options`,
    method: 'get',
    params: params,
  })
}
