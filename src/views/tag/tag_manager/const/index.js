import { validatenull } from '@/util/validate'

export const columnMap = [
  {
    prop: 'name',
    label: '标签名称',
  },
  {
    prop: 'levelName',
    label: '标签级别名称',
  },
  {
    prop: 'typeVo',
    label: '标签分类',
    type: '所属分类',
  },
  {
    prop: 'refers',
    label: '应用次数',
  },
  {
    prop: 'updateTime',
    label: '更新时间',
    type: 'date',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'TAGSTATUS',
  },
]

export function initTagFunction () {
  return {
    'tagReview': null, 'tagNotes': null, 'tagRelation': null,
  }
}

export function initMergeForm () {
  return {
    mainId: null,
    mergeIds: [],
  }
}

export function initFormInline () {
  return {
    name: null,
    typeid: null,
    levelid: null,
    status: null,
  }
}

export function initTagForm () {
  return {
    name: null,
    levelId: null,
    typeId: null,
    typeIds: [],
    tagList: [],
    tagsList: [],
    description: null,
    orderNum: 1,
  }
}

export function _mapPickTagIdName (list) {
  if (validatenull(list)) {
    return []
  }
  return list.map(m => {
    return { name: m.commonName, tagId: m.commonId }
  })
}

export function changeTypeNames (list) {
  let data = ''
  list.forEach((item) => {
    data += item + '；'
  })
  return data.slice(0, data.length-1)
}
