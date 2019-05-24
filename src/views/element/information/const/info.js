import {
  getDic,
} from '@/util/dic'

const validateInfoName = (rule, value, callback) => {
  let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
  if (!reg.test(value)) {
    callback(new Error('您输入的信息项英文名称格式不正确'))
  } else {
    callback()
  }
}

console.log("是否",getDic('IS_NOT'))
export default {
  data () {
    return {
      isOpenDisabled: false,
      openCondShow: false,
    }
  },
  computed: {
    infoFormOption () {
      return {
        menuBtn: false,
        labelWidth: '160',
        labelPosition: 'right',
        column: [
          {
            label: '中文名称',
            prop: 'chName',
            span: 12,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'blur',
            }],
            maxlength: 50,
          }, {
            label: '英文名称',
            prop: 'enName',
            span: 12,
            rules: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateInfoName, trigger: 'blur' },
            ],
            maxlength: 50,
          }, {
            label: '数据类型',
            prop: 'dataTypeList',
            span: 12,
            type: 'cascader',
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
            dicData: getDic('DATA_TYPE'),
          }, {
            label: '字段描述',
            prop: 'description',
            span: 12,
            maxlength: 50,
          }, {
            label: '数据长度',
            prop: 'dataLength',
            span: 12,
            maxlength: 50,
          }, {
            label: '默认值',
            prop: 'defaultValue',
            span: 12,
            maxlength: 50,
          }, {
            label: '对象类型',
            prop: 'objectType',
            span: 12,
            type: 'select',
            dicData: getDic('OBJECT_TYPE'),
          }, {
            label: '是否字典项',
            prop: 'isDict',
            type: 'select',
            span: 12,
            dicData: getDic('IS_NOT'),
          }, {
            label: '共享类型',
            prop: 'sharingType',
            span: 12,
            type: 'select',
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
            dicData: getDic('SHARING_TYPE'),
          }, {
            label: '共享条件',
            prop: 'sharingCond',
            span: 12,
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'blur',
            }],
            maxlength: 50,
          }, {
            label: '共享方式',
            prop: 'sharingModeList',
            span: 12,
            type: 'cascader',
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
            dicData: getDic('SHARING_MODE'),
          }, {
            label: '是否向全社会开放',
            prop: 'isOpen',
            span: 12,
            type: 'select',
            rules: [{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }],
            dicData: getDic('IS_NOT'),
            disabled: this.isOpenDisabled,
          }, {
            label: '开放条件',
            prop: 'openCond',
            span: 12,
            visdiplay: this.openCondShow,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 50,
          }, {
            label: '更新周期',
            prop: 'updCycle',
            span: 12,
            type: 'select',
            dicData: getDic('UPD_CYCLE'),
          }, {
            label: '是否主键',
            prop: 'isPk',
            span: 12,
            type: 'select',
            dicData: getDic('IS_NOT'),
          }, {
            label: '是否为空',
            prop: 'isNull',
            span: 12,
            type: 'select',
            dicData: getDic('IS_NOT'),
          }, {
            label: '是否归集',
            prop: 'collectStatus',
            span: 12,
            type: 'select',
            dicData: getDic('IS_NOT'),
            disabled: true,
          },
        ],
      }
    },
  },
  watch: {
    'form.sharingType': {
      deep: true,
      handler (val) {
        if (val === '3') {
          this.isOpenDisabled = true
          this.form.isOpen = "2"
        } else {
          this.isOpenDisabled ? this.form.isOpen = "" : ""
          this.isOpenDisabled = false
        }
        this.$nextTick(()=>{
          this.$refs['form'] ? this.$refs['form'].clearValidate() : ''
        })
      },
    },
    'form.isOpen': {
      deep: true,
      handler (val) {
        if (val === '1') {
          this.openCondShow = true
        } else {
          this.openCondShow = false
          this.form.openCond = ""
        }
      },
    },
  },
}
