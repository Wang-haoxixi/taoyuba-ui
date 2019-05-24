<template>
  <gov-dialog
    :title="dialogOption.title"
    @closed="handleClosed"
    @handleSubmit="handleSubmit"
    ref="dialog">
      <avue-form ref="form" v-model="form" :option="formOption"></avue-form>
  </gov-dialog>
</template>

<script>
import { addObj } from '@/api/admin/client/index'
export default {
  data () {
    return {
      formOption: {
        menuBtn: false,
        labelWidth: '120',
        labelPosition: 'right',
        column: [
          {
            label: '编号',
            prop: 'clientId',
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' },{min:3,max:6,message:'请输入3~6个字符',trigger:'blur'}],
          }, {
            label: '秘钥',
            prop: 'clientSecret',
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          }, {
            label: '域',
            prop: 'scope',
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          }, {
            label: '授权模式',
            prop: 'authorizedGrantTypes',
            type: 'select',
            dicData: [{label: '权限A', value: 'A'}, {label: '权限B', value: 'B'}, {label: '权限C', value: 'C'}],
            span: 12,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          }, {
            label: '回调地址',
            prop: 'webServerRedirectUri',
            span: 12,
          }, {
            label: '权限',
            prop: 'authorities',
            span: 12,
          }, {
            label: '请求令牌',
            prop: 'accessTokenValidity',
            span: 12,
            type: 'number',
            maxlength: 9,
          }, {
            label: '刷新令牌',
            prop: 'refreshTokenValidity',
            span: 12,
            type: 'number',
            maxlength: 9,
          }, {
            label: '扩展信息',
            prop: 'additionalInformation',
            span: 12,
          }, {
            label: '是否自动放行',
            prop: 'autoapprove',
            span: 12,
          }, {
            label: '资源ID',
            prop: 'resourceIds',
            span: 12,
          },
        ],
      },
      form: {},
    }
  },
  props: {
    dialogOption: {
      default: ()=> {
        return {
          title: "新增",
        }
      },
      type: Object,
    },
    formData: {
      default: ()=>{},
      type: Object,
    },
  },
  methods: {
    open () {
      this.form = this.formData
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      this.$emit('closed')
      this.$refs['form'].resetForm()
    },
    handleSubmit () {
      this.$refs.form.validate().then(()=>{
        console.log(this.form)
        addObj(this.form).then(()=>{
          this.$message.success("成功")
          this.$refs['form'].clearValidate()
          this.$refs['dialog'].close()
          this.$emit('okClosed')
        })
      })
    },
  },
}
</script> 