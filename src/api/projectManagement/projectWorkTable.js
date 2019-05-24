import request from '@/router/request'

//我的待办
export function getDoRemind () {
  return request({
    url: `/msg/govmsgdoremind/listForProject`,
    method: 'get',
  })
}

//里程碑进度
export function getMilestone () {
  return request({
    url: `/proj/dnaprojectmilestone/selectWorkbenchMilestoneList`,
    method: 'get',
  })
}

//任务
export function getTask (params) {
  return request({
    url: `/proj/dnaprojecttask/selectWorkbenchTaskList`,
    method: 'get',
    params: params || {},
  })
}


//头部信息
export function getTitleData (params) {
  return request({
    url: `/proj/dnaprojectuser/getWorkbenchTitle`,
    method: 'get',
    params: params || {},
  })
}

