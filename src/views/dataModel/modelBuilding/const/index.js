import { getDic } from '@/util/dic'

export const modelBuilding = {
    menuBtn: false,
    labelWidth: '160',
    labelPosition: 'right',
    column: [
      {
        label: '模型库中文名',
        prop: 'dbCn',
        span: 24,
        rules: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
      },
      {
        label: '模型库英文名',
        prop: 'dbEn',
        span: 24,
        rules: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
      }, {
        label: '模型库类型',
        type: 'select',
        dicData: getDic('DATABASE_FORMAT'),
        prop: 'dbType',
        span: 24,
        rules: [{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }],
      },{
        label: '注释',
        prop: 'dbNotes',
        span: 24,
      },
    ],
}