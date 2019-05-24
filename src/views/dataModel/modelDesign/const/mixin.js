export default {
  computed: {
    formProps () {
      return [
        {
          label: '模型表中文名称',
          prop: 'tableCn',
        },{
          label: '所属数据库',
          prop: 'dbId',
          type: 'select',
          data: this.dbList,
        },
      ]
    },
    modelDataEleQuery () {
      return [
        {
          label: '数据元中文名称',
          prop: 'dtEleChnNm',
        },
      ]
    },
    modelSheetDialogForm () {
      return {
        menuBtn: false,
        labelWidth: '120',
        labelPosition: 'right',
        column: [
          {
            label: '模型表中文名',
            prop: 'tableCn',
            span: 12,
            rules: [
              { required: true, message: '不能为空', trigger: 'blur'},
            ],
          }, {
            label: '模型表英文名',
            prop: 'tableEn',
            span: 12,
            rules: [
              { required: true, message: '不能为空', trigger: 'blur'},
              { validator: (rule, value, callback) => {
                let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
                if (!reg.test(value)) {
                  callback(new Error('您输入的字段名称格式不正确'))
                } else {
                  callback()
                }
              }, trigger: 'blur' },
            ],
          }, {
            label: '模型表类型',
            prop: 'tableType',
            type: 'select',
            dicData: this.getDic('MODEL_TABLE_TYPE'),
            span: 12,
            rules: [
              { required: true, message: '不能为空', trigger: 'change'},
            ],
          }, {
            label: '所属模型库',
            prop: 'dbId',
            type: 'select',
            dicData: this.dbList,
            span: 12,
            rules: [
              { required: true, message: '不能为空', trigger: 'change'},
            ],
          }, {
            label: '注释',
            prop: 'tableNotes',
            span: 12,
          },
        ],
      }
    },
    modelSheetDialogTableOption () {
      return {
        page: true,
        menu: false,
        header: false,
        selection: false,
        column: [
          {
            label: "字段中文名称",
            prop: "fieldCn",
          }, {
            label: "字典英文名",
            prop: "fieldEn",
          }, {
            label: "菜单",
            prop: "menu",
            solt: true,
          },
        ],
      }
    },
    modelDataEleDialogTableOption () {
      return {
        page: true,
        menu: false,
        header: false,
        selection: true,
        column: [
          {
            label: "中文名称",
            prop: "dtEleChnNm",
          }, {
            label: "英文名称",
            prop: "dtEleEgNm",
          }, {
            label: "数据类型",
            prop: "dtTypeForShow",
          }, {
            label: "数据长度",
            prop: "dtLgth",
          }, {
            label: "注释",
            prop: "remrk",
          },
        ],
      }
    },
  },
}