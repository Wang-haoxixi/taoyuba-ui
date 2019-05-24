import { getDic } from "@/util/util"

export const searchOption = [
  {label: '信息系统名称', prop: 'sysDsgt'},
  {label: '是否有子系统', prop: 'sysDsgt', type: 'select', data: getDic('IS_NOT')},
  {label: '信息系统名称', prop: 'sysDsgt', type: 'select', data: getDic('IS_CATALOGUE')},
  {label: '来源部门', prop: 'sysDsgt', type: 'select', data: getDic('')},
]