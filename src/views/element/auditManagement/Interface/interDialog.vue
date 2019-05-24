<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    width="70%"
    @audit="audit"
    @handleSubmit="handleSubmit"
    @auditY="auditY"
    :btnGroup="status ==='update'?btnGroup:''"
    :isBtnGroup="status !=='detail'"
    :title="dialog.textMap[status]">
    <gov-layout-form>
      <template>
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
// import { detailOption } from "./const/index"
import mixin from "@/mixins/mixin"
import { audit } from "@/api/element/interface"
import { getDic } from '@/util/dic'
export default {
  name: "interfaceDialog",
  mixins: [mixin],
  // components:{ReasonDialog},
  data () {
    return {
      loading: false,
      dialog: {
        textMap: {
          create: "新增",
          update: "审核",
          detail: "查看",
        },
        visible: false,
      },
      form: {},
    }
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
      this.$refs["dialog"].open()
      this.$nextTick(() => {
        this.form = this.formData
      })
    },
    closeDialog () {
      this.$refs[this.refDialog].close()
    },
    handleSubmit () {
      this.$refs.settingForm.validate().then(() => {
        if (this.status === "create") {
          this.closeDialog()
        } else if (this.status === "update") {
          this.closeDialog()
        }
      })
    },
    handleClosedDialog () {
      this.$emit('closed')
      this.$nextTick(()=>{
        this.form = {}
        // this.status !== 'detail' ? this.$refs['settingForm'].resetForm() : ''
      })
    },
    // 审核不通过
    audit () {
      this.loading = true
      this.$prompt('请输入驳回理由', '驳回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputValidator: (val) => {
          if (val.length > 100) {
            return '请控制驳回理由长度在100个字符内'
          }
        },
        inputErrorMessage: '驳回理由不能为空',
      }).then(({value}) => {
        let reasonText = value
        audit({
          id: this.formData.id,
          auditState: '4',
          reason: reasonText,
        }).then(()=>{
          this.$message.success('已成功驳回!')
          this.$nextTick(()=>{
            this.loading = false
            this.$refs["dialog"].close()
          })
          this.$emit('refresh')
        }).catch(()=>{
          this.$nextTick(()=>{
            this.loading = false
          })
          this.$emit('refresh')
        })
      }).catch(() => {
        this.loading = false
      })
      
    },
    // 审核通过
    auditY () {
      this.loading = true
      this.$confirm('是否审核通过?', '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
         audit({
          id: this.formData.id,
          auditState: '3',
          reason: this.formData.reason,
        }).then(()=>{
          this.$message.success('提交审核通过')
          this.$nextTick(()=>{
            this.loading = false
          })
          this.$refs["dialog"].close()
          this.$emit('refresh')
        }).catch(()=>{
          this.$nextTick(()=>{
            this.loading = false
          })
          this.$emit('refresh')
        })
      }).catch(()=>{
        this.loading = false
      })
       
    },
  },
  computed: {
    btnGroup () {
      return [
          {
          label: '审核通过',
          type: 'primary',
          loading:this.loading,
          fn: 'auditY',
        }, {
          label: '审核驳回',
          type: 'warning',
          loading:this.loading,
          fn: 'audit',
        }, {
          label: '取消',
          type: 'default',
          fn: 'handleCancel',
        },
      ]
    },
    formOption (){
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [
            {
                label: '服务中文名称',
                prop: 'nameCn',
                span: 24,
                rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            },
            {
                label: '服务英文名称',
                prop: 'nameEn',
                span: 24,
                rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
                rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            },
            {
                label: '服务摘要',
                prop: 'summary',
                span: 24,
                type: 'textarea',
                rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
            },
            {
                label: '使用场景描述',
                prop: 'usecaseDescn',
                span: 24,
                type: 'textarea',
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
            },
            {
                label: '返回示例',
                prop: 'resultSample',
                span: 24,
                type: 'textarea',
                rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            },
            {
                label: '网络地址',
                prop: 'interfaceAddress',
                span: 24,
                type: 'textarea',
                rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            },
            {
                label: '查询条件',
                prop: 'queryCondition',
                span: 24,
                type: 'textarea',
                rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            },
            {
                label: '接口描述',
                prop: 'interfaceDescn',
                span: 24,
                type: 'textarea',
                rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
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
}
</script>
<style lang="scss" scoped>
.detail-wrapper,
.form-wrapper {
  margin: 20px 0 50px;
}
.dialog-footer{margin-right: 30px;}
</style>