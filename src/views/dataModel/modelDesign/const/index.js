import { getDic } from '@/util/dic'

export const mainTableOption = {
  page: true,
  menu: false,
  header: false,
  selection: true,
  column: [
    {
      label: "模型表中文名",
      prop: "tableCn",
    }, {
      label: "模型表英文名",
      prop: "tableEn",
    }, {
      label: "模型表类型",
      prop: "tableType",
      type: "dic",
      dicData: getDic('MODEL_TABLE_TYPE'),
    }, {
      label: "所属数据库",
      prop: "dbCnForShow",
    }, {
      label: "操作",
      prop: "menu",
      solt: true,
      width: 250,
    },
  ],
}

export const standardDataTableOption = {
  page: true,
  menu: false,
  header: false,
  selection: true,
  column: [
    {
      label: "中文名称",
      prop: "dataCn",
    },
    {
      label: "英文名称",
      prop: "dataEn",
    },
    {
      label: "数据长度",
      prop: "dataLength",
    },
  ],  
}