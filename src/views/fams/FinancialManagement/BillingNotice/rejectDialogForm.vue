<template>
  <iep-dialog :dialog-show="dialogShow" title="驳回" width="520px" @close="close">
    <el-form size="small" ref="form" label-width="100px">
      <el-form-item label="备注">
        <iep-input-area v-model="content"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">驳回</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { rejectBilling } from '@/api/fams/billing'
export default {
  data () {
    return {
      dialogShow: false,
      ids: '',
      content: '',
    }
  },
  methods: {
    submitForm () {
      rejectBilling({
        id: this.id,
        content: this.content,
      }).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.close()
        } else {
          this.$message(data.msg)
        }
      })
    },
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>

