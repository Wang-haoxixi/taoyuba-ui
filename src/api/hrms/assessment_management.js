import request from '@/router/axios'

const prefixUrl = '/hrms/assessment_management'
// @/api/hrms/assessment_management
export function getAssessmentManagementPage (query) {
  return request({
    url: `${prefixUrl}/page`,
    method: 'get',
    params: query,
  })
}

export function postAssessmentManagement (obj) {
    return request({
      url: `${prefixUrl}/create`,
      method: 'post',
      data: obj,
    })
  }
  
export function putTalentPool (obj) {
  return request({
    url: `${prefixUrl}/update`,
    method: 'post',
    data: obj,
  })
}
  
export function deletePublishRecruitmentById (id) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: [id],
  })
}
export function deletePublishRecruitment (ids) {
  return request({
    url: `${prefixUrl}/delete/batch`,
    method: 'post',
    data: ids,
  })
}