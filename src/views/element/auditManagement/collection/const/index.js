import {
  getDic,
  getDept,
} from '@/util/dic'

export const searchOption = [
  {
    label: '部门名称',
    prop: 'deptId',
    type: 'select',
    data: getDept(),
  // }, {
  //   label: '归集状态',
  //   prop: 'collectStatus',
  //   type: 'select',
  //   data: getDic('COLLECT_STATUS'),
  }, {
    label: '表中文名',
    prop: 'nameCn',
  },
]

export const mainTableOption = {
  page: true,
  menu: false,
  index: false,
  header: false,
  selection: false,
  column: [{
      label: '部门名称',
      prop: 'deptId',
      type: 'dic',
      dicData: getDept(),
    }, {
      label: '表中文名',
      prop: 'nameCn',
    }, {
      label: '表英文名',
      prop: 'nameEn',
    }, {
      label: '归集状态',
      prop: 'collectStatus',
      type: 'dic',
      dicData: getDic('COLLECT_STATUS'),
    }, {
      label: '操作',
      prop: 'menu',
      solt: true,
      width: 200,
    },
  ],
}