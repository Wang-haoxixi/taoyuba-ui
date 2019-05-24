<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="70%"
    @handleSubmit="handleSubmit"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-form>
      <template v-if="status === 'detail'">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <div class="form-wrapper">
          <avue-form ref="settingForm" :option="formOption" v-model="form"></avue-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
import { getDic } from '@/util/dic'
import mixin from "@/mixins/mixin"
import {
  createInterface,
  updateInterface,
} from '@/api/element/interface'

const validateInfoName = (rule, value, callback) => {
  let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/
  if (!reg.test(value)) {
    callback(new Error('您输入的信息项英文名称格式不正确'))
  } else {
    callback()
  }
}

export default {
  name: "interfaceDialog",
  mixins: [mixin],
  data () {
    return {
      dialog: {
        textMap: {
          create: "新增",
          reGen: "重新生成",
          detail: "详情",
        },
        visible: false,
      },
      form: {},
    }
  },
  computed: {
    formOption () {
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [
          {
            label: '服务中文名称',
            prop: 'nameCn',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 100,
          },
          {
            label: '服务英文名称',
            prop: 'nameEn',
            span: 24,
            rules: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateInfoName, trigger: 'blur' },
            ],
            maxlength: 100,
          },
          {
            label: '接入类型',
            prop: 'linkType',
            span: 24,
            type: 'select',
            dicData: getDic('ELEMENT_ACCESS_TYPE'),
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          },
          {
            label: '资源目录',
            prop: 'infoId',
            span: 24,
            type: "select",
            props: {
              label: 'name',
              value: 'id',
            },
            dicData: this.informationList,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          },
          {
            label: '服务摘要',
            prop: 'summary',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 100,
          },
          {
            label: '调用频率',
            prop: 'callRate',
            span: 24,
            type: 'select',
            dicData: getDic('ELEMENT_CALL_FREQUENCY'),
            rules: [{ required: false, message: '不能为空', trigger: 'change' }],
          },
          {
            label: '超时时间(秒)',
            prop: 'timeout',
            span: 24,
            maxlength: 100,
          },
          {
            label: '使用场景描述',
            prop: 'usecaseDescn',
            span: 24,
            type: 'textarea',
            maxlength: 100,
          },
          {
            label: '授权方式',
            prop: 'authType',
            span: 24,
            type: 'select',
            dicData: getDic('AUTH_TYPE'),
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          },
          {
            label: '是否需要提交附件',
            prop: 'isAttach',
            span: 24,
            type: 'select',
            dicData: getDic('IS_NOT'),
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          },
          {
            label: '请求示例',
            prop: 'requestSample',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 100,
          },
          {
            label: '返回示例',
            prop: 'resultSample',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 100,
          },
          {
            label: '网络地址',
            prop: 'interfaceAddress',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 100,
          },
          {
            label: '查询条件',
            prop: 'queryCondition',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 100,
          },
          {
            label: '接口描述',
            prop: 'interfaceDescn',
            span: 24,
            type: 'textarea',
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            maxlength: 100,
          },
        ],
      }
    },
    detailOption () {
      return {
        option: [
          {
            column: this.formOption.column,
          },
        ],
      }
    },
  },
  props: {
    status: {
      type: String,
      defaule: "create",
    },
    formData: {
      type: Object,
      default: () => {},
    },
    informationList:{
      type:Array,
      default: ()=>[],
    },
  },
  methods: {
    openDialog () {
      // this.from={}
      this.$nextTick(() => {
        this.$refs["dialog"].open()
        this.form = this.formData
        this.$nextTick(() => {
          this.status !== 'detail' ? this.$refs['settingForm'].clearValidate() : ''
        })
      })
    },
    closeDialog () {
      this.$refs['dialog'].close()
    },
    handleSubmit () {
      this.$refs.settingForm.validate().then(() => {
        if (this.status === "create") {
          createInterface(this.form).then(()=>{
            this.$message.success('新增成功')
            this.$nextTick(()=>{
              this.$emit('getList')
              this.closeDialog()
            })
          })
        } else if (this.status === "reGen") {
          updateInterface(this.form).then(()=>{
            this.$message.success('更新成功')
            this.$nextTick(()=>{
              this.$emit('getList')
              this.closeDialog()
            })
          })
        }
      }).catch((err)=>{
        console.log(err)
        this.$message.error('验证不通过')
      })
    },
    handleClosedDialog () {
      this.$emit('closed')
      this.$nextTick(()=>{
        this.form = {}
        this.status !== 'detail' ? this.$refs['settingForm'].resetForm() : ''
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.detail-wrapper,
.form-wrapper {
  margin: 20px 0 50px;
}
</style>