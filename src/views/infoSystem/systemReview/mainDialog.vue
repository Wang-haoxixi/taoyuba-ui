<template>
  <gov-dialog 
    ref="dialog" 
    @closed="handleClosed" 
    @handleReject="handleReject"
    @handleAuditPass="handleAuditPass"
    title="提交审核"
    :btnGroup="btnGroup"
    :isBtnGroup="true" 
    width="80%">
    <gov-layout-form>
      <div class="detail-wrapper">
        <gov-detail-form v-model="formData" :option="detailOption"></gov-detail-form>
      </div>
    </gov-layout-form>
  </gov-dialog>
</template>

<script>
import { formCurd } from '../systemRegister/const/fields'
import {
  systemReview,
  systemReject,
} from '@/api/infoSystem'
export default {
  name: "mainDialog",
  data () {
    return {
      loading: false,
    }
  },
  computed: {
    detailOption () {
      return {
        option: [
          {
            column: formCurd,
          },
        ],
      }
    },
    btnGroup () {
      return [
        {
          label: '审核通过',
          type: 'primary',
          fn: 'handleAuditPass',
          loading: this.loading,
        }, {
          label: '审核驳回',
          type: 'warning',
          fn: 'handleReject',
          loading: this.loading,
        }, {
          label: '取消',
          type: 'default',
          fn: 'handleCancel',
        },
      ]
    },
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    // 驳回
    handleReject () {
      this.$prompt('请输入驳回理由', '驳回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: '',
        inputValidator: (value) => {
          if( value !== ''){
            if(value.length<100){
              return true
            }else{
              return false
            }
          }else{
            return false
          }
        },
        inputErrorMessage: '驳回理由不得为空或超过100字符',
      }).then(({ value }) => {
        systemReject(this.formData.id, value).then(res=>{
          if (res.data.code === 0) {
            this.$message.success('成功驳回')
            this.close()
            this.$emit('success')
          }
        })
      }).catch(() => {})
    },
    // 审核通过
    handleAuditPass () {
      this.$confirm('请确认是否通过', '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(()=>{
        systemReview(this.formData.id).then(res=>{
          if (res.data.code === 0) {
            this.$message.success('审核通过')
            this.close()
            this.$emit('success')
          }
        })
      }).catch(()=>{})
    },
    close () {
      this.$refs["dialog"].close()
    },
    open () {
      this.$refs["dialog"].open()
    },
    // 弹窗关闭后动作
    handleClosed () {
      this.$emit('closed')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
