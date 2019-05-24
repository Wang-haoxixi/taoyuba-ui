<template>
  <div class="iep-page-form culture-form">
    <basic-container>
      <page-header :backOption="backOption">
        <template>
          <iep-button type="primary" @click="handleSubmit">保存</iep-button>
        </template>
      </page-header>
      <el-form :model="form" class="form-detail" size="small" ref="form" label-width="120px">
        <el-form-item label="内容：" prop="structure">
          <iep-froala-editor v-model="form.structure"></iep-froala-editor>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm } from './options'
import { getOrgBySelf, putOrg } from '@/api/goms/org'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: initForm(),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
    handleSubmit () {
      putOrg(this.form).then(() => {
        this.$message({
          message: '联盟文化修改成功',
          type: 'success',
        })
        this.$emit('onGoBack')
      })
    },
    loadPage () {
      getOrgBySelf(this.orgId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
<style scoped>
.culture-form >>> .page-title {
  display: none;
}
</style>
