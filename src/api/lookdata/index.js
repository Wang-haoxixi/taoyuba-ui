import request from '@/router/request'
const baseUrl = '/directory/dnaVisible'

//信息资源实施排行
export function getRescVO () {
  return request({
    url: `${baseUrl}/getRescVO`,
    method: 'get',
  })
}
//目录状态统计
export function getStatusAccountingVO () {
  return request({
    url: `${baseUrl}/getStatusAccountingVO`,
    method: 'get',
  })
}


//共享开放属性分析
export function getShareType () {
  return request({
    url: `${baseUrl}/getShareType`,
    method: 'get',
  })
}

//信息系统概览统计
export function getSysState () {
  return request({
    url: `${baseUrl}/getSysState`,
    method: 'get',
  })
}

//归集数据材料分析
export function getCollectAnalyze () {
  return request({
    url: `${baseUrl}/getCollectAnalyze`,
    method: 'get',
  })
}

//基本情况统计
export function geResrcSum () {
  return request({
    url: `${baseUrl}/geResrcSum`,
    method: 'get',
  })
}

//分别查询信息资源已归集数和已归集字段数
export function getCollectsSum () {
  return request({
    url: `${baseUrl}/getCollectsSum`,
    method: 'get',
  })
}

//查询数据用途
export function getDataUse () {
  return request({
    url: `${baseUrl}/getDataUse`,
    method: 'get',
  })
}

//目录共享开放排行榜前5位
export function getDirectorySharingLeaderboards (parmas) {
  return request({
    url: `${baseUrl}/getDirectorySharingLeaderboards/${parmas}`,
    method: 'get',
  })
}

//信息资源重点领域分类
export function getKeyAreas () {
  return request({
    url: `${baseUrl}/getKeyAreas`,
    method: 'get',
  })
}

//目录共享开放统计
export function getOpenDirectorySharingCount () {
  return request({
    url: `${baseUrl}/getOpenDirectorySharingCount`,
    method: 'get',
  })
}


//目录共享百分比
export function getOpenDirectorySharingPercent () {
  return request({
    url: `${baseUrl}/getOpenDirectorySharingPercent`,
    method: 'get',
  })
}

//开放属性统计
export function getSharingMode () {
  return request({
    url: `${baseUrl}/getSharingMode`,
    method: 'get',
  })
}

//查询信息资源格式  ssss
export function getResrcFormat () {
  return request({
    url: `${baseUrl}/getResrcFormat`,
    method: 'get',
  })
}

// 查询存量数据规模，对接方式为库表对接和Excel对接的数量
export function getStockDataScale () {
  return request({
    url: `${baseUrl}/getStockDataScale`,
    method: 'get',
  })
}

//查询主题分类
export function getTopic () {
  return request({
    url: `${baseUrl}/getTopic`,
    method: 'get',
  })
}
//归集目录走势分析
export function collectionTrendAnalysis () {
  return request({
    url: `${baseUrl}/collectionTrendAnalysis`,
    method: 'get',
  })
}
