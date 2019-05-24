import {getDic} from '@/util/dic'
export let searchOption = [
  { label: '事项名称', prop: 'matName'},
  { label: '事项类别', prop: 'type', type: 'cascader', data: getDic('MAT_ITEM_TYPE') },
]
