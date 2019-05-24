export default {
  computed: {
    dbConnectTestFormOption () {
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [
          {
            label: '数据库类型',
            prop: 'dbType',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            type: 'select',
            dicData: this.getDic('DB_TYPE'),
          }, {
            label: '用户名',
            prop: 'user',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          }, {
            label: '密码',
            prop: 'cryptogram',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          }, {
            label: 'IP地址',
            prop: 'host',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          }, {
            label: '端口号',
            prop: 'port',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          }, {
            label: '数据库英文名',
            prop: 'nameEn',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          }, {
            label: '数据库中文名',
            prop: 'nameCn',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          }, {
            label: '所属部门',
            prop: 'deptId',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            type: 'select',
            dicData: this.getDept(),
          }, {
            label: '所属系统',
            prop: 'systemId',
            span: 24,
            type: 'select',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            dicData: this.sysList,
          },
        ],
      }
    },
    informationUpdateProps () {
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [
          {
            label: '所属部门',
            prop: 'deptId',
            type: 'select',
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: this.getDept(),
          },
          {
            label: '所属系统',
            prop: 'systemId',
            type: 'select',
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: this.sysList,
          },
          {
            label: '数据库英文名称',
            prop: 'nameEn',
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 80,
          },
          {
            label: '数据库中文名称',
            prop: 'nameCn',
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 80,
          },
          {
            label: '数据库类型',
            prop: 'dbType',
            type: 'select',
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
            dicData: this.getDic('DB_TYPE'),
          },
        ],
      }
    },
  },
}