<template>
  <div>
    <el-radio-group v-model="status" class="status">
      <el-radio :label="3">审核通过</el-radio>
      <el-radio :label="4">驳回</el-radio>
    </el-radio-group>
    <el-input v-if="status===4" class="content" type="textarea" :rows="4" placeholder="请输入驳回内容" v-model="content">
    </el-input>
    <div class="button-group">
      <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
      <el-button size="small" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import { pageOption } from '@/const/page'
const optionMap = ['审核通过', '驳回']
export default {
  props: {
    functionName: {
      type: Function,
      default: () => { },
    },
    ids: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      status: 2,
      content: '',
    }
  },
  computed: {
    optName () {
      return optionMap[this.status - 3]
    },
  },
  methods: {
    handleSubmit () {
      if (this.status === 3 || this.status === 4) {
        this.$confirm(`此操作将${this.optName}这些数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.functionName(this.ids, {
            status: this.status,
            content: this.content,
          }).then(res => {
            if (res.data.data) {
              this.$message({
                type: 'success',
                message: `${this.optName}成功!`,
              })
              this.pageOption = pageOption()
              this.$emit('close')
            } else {
              this.$message({
                type: 'info',
                message: `${this.optName}失败，${res.data.msg}`,
              })
            }
          })
        })
      } else {
        this.$message('请选择审核状态')
      }
    },
    handleCancel () {
      this.status = 2
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
.status {
  margin: 10px;
}
.content {
  margin: 20px 0;
}
.button-group {
  display: flex;
  justify-content: center;
}
</style>
