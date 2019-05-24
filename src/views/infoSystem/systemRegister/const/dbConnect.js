import { getDic } from '@/util/dic'
  export const tableOption = {
    addBtn: false,
    editBtn: false,
    delBtn: false,
    header: false,
    menu: false,
    selection: false,
    menuWidth: '180',
    indexLabel: '序号',
    page: false,
    index: false,
    align: 'center',
    border: false,
    height: '300',
    column: [
      {
        label: '数据库中文名',
        prop: 'nameCn',
        span: 24,
        maxlength: 50,
        rules: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
      },
      {
        label: '数据库英文名',
        prop: 'nameEn',
        span: 24,
        maxlength: 50,
        rules: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
      },
      {
        label: '数据库类型',
        prop: 'dbType',
        span: 24,
        maxlength: 50,
        type: 'select',
        dicData: getDic('DB_TYPE'),
        rules: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
      },
      {
        label: '操作',
        prop: 'menu',
        span: 24,
        solt: true,
        maxlength: 50,
      },
    ],
  }
