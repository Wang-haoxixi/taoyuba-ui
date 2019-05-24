import request from '@/router/axios'

export function getMultiTableThemePage (query) {
  return request({
    url: '/cbs/multi_table/theme_page',
    method: 'get',
    params: query,
  })
}

export function getMultiTableMaterialList (id) {
  return request({
    url: `/cbs/multi_table/material_list/${id}`,
    method: 'get',
  })
}

export function getMultiTableItemList (ids) {
  return request({
    url: '/cbs/multi_table/item_list',
    method: 'post',
    data: ids,
  })
}

export function getMultiTableItemSave (obj) {
  return request({
    url: '/cbs/multi_table/item_save',
    method: 'post',
    data: obj,
  })
}

export function getMultiTableById (id) {
  return request({
    url: `/cbs/multi_table/multi_record/${id}`,
    method: 'get',
  })
}

export function getMultiTableFormListById (id, filter) {
  return request({
    url: `/cbs/multi_table/form_list/${id}`,
    method: 'post',
    data: filter,
  })
}

export function getMultiTableReviewPage (query) {
  return request({
    url: '/cbs/material/theme_material_page',
    method: 'get',
    params: query,
  })
}

export function getMergeReviewPage (query) {
  return request({
    url: '/cbs/multi_table/form_page',
    method: 'get',
    params: query,
  })
}

export function getMultiRecordById (id) {
  return request({
    url: `/cbs/multi_table/multi_record/${id}`,
    method: 'get',
  })
}

export function getMultiMaterialRecordById (id) {
  return request({
    url: `/cbs/multi_table/material_record/${id}`,
    method: 'get',
  })
}

export function getMultiItemRecordDetail (params) {
  return request({
    url: '/cbs/multi_table/item_record',
    method: 'get',
    params,
  })
}
