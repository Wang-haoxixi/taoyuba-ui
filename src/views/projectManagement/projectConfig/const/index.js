import { getDic } from '@/util/dic'
export const projectConfigTableOption = {
  page: true,
  menu: false,
  header: false,
  selection: false,
  index: true,
  column: [
    {
      label: "名称",
      prop: "configName",
    }, {
      label: "模块",
      prop: "moduleType",
      type: "dic",
      dicData: getDic('PROJECT_MODULE_TYPE'),
    }, {
      label: "排序",
      prop: "sort",
    }, {
      label: "操作",
      prop: "menu",
      solt: true,
      width: 250,
    },
  ],
}
