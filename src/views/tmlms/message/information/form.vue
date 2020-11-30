<template>
  <basic-container>
    <page-header title="消息" :backOption="backOption"></page-header>
    <el-form :model="form" ref="ruleForm" label-width="150px" :disabled="status === 'detail'">
      <el-form-item label="消息标题" prop="name">
        <el-input v-model.trim="form.name"></el-input>
      </el-form-item>
      <el-form-item label="消息内容" prop="content">
        <iep-froala-editor v-model="form.content" :disabled="status === 'detail'"></iep-froala-editor>
      </el-form-item>
    </el-form>
  </basic-container>
</template>
<script>
import { getPageById } from '@/api/tmlms/message/information'
export default {
  data () {
    return {
      form: {
        name: '',
        content: '',
      },
      status: 'detail',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
    }
  },
  created () {
    let id = this.$route.query.id
    let status = this.$route.query.status
    if (status) {
      this.status = status
    }
    if (id) {
      this.getList(id)
    }
  },
  methods: {
    getList (id) {
      getPageById(id).then(({ data }) => {
        if (data.code === 0) {
          this.form = data.data
        }
      })
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>

</style>