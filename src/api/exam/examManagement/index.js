import request from '@/router/axios'
/***
 * 考试列表
 */
export function examList (param) {
  return request({
    url:'tmlms/exam_examination/oldPage',
    method:'get',
    params:param,
  })
}
/**id获取考试详情 */
export function getExamById (id) {
  return request({
    url:`/tmlms/exam_examination/${id}`,
    method:'get',
    data:id,
  })
}
/**新增考试 */
export function createExam (param) {
  return request({
    url:'tmlms/exam_examination/save',
    method:'post',
    data:param,
  })
}
/**修改考试 */
export function updateExam (param) {
  return request({
    url:'tmlms/exam_examination/update',
    method:'post',
    data:param,
  })
}
/**
 * 考试类别
 */
export function examKind (param) {
  return request({
    url:'tmlms/exam_question/kinds',
    method:'get',
    data:param,
  })
}
/**考试难度 */
export function examLevel (kind){
  return request({
    url:`tmlms/exam_question/levels?kind=${kind}`,
    method:'get',
    data:kind,
  })
}
/**试题列表 */
export function getTestList (param){
  return request({
    url:'tmlms/exam_question/page',
    method:'get',
    params:param,
  })
}
/*新增试题*/
export function createTest (param) {
  return request({
    url:'tmlms/exam_question/batch_save',
    method:'post',
    data:param,
  })
}
/**修改试题 */
export function updateTest (param) {
  return request({
    url:'tmlms/exam_question/update',
    method:'post',
    data:param,
  })
}
/**word 导入 */
export function importWord (file) {
  return request({
    url:'tmlms/word/import',
    method:'post',
    data:file,
  })
}
/**根据id删除试题 */
export function delTest (id){
  return request({
    url:`tmlms/exam_question/delete?id=${id}`,
    method:'post',
    data:id,
  })
}
/**根据id获取详情 */
export function getTestById (id){
  return request({
    url:`tmlms/exam_question/${id}`,
    method:'get',
    data:id,
  })
}
/**批量删除 */
export function deleteAll (data){
  return request({
    url:'tmlms/exam_question/batchDelete',
    method:'post',
    data:data,
  })
}




