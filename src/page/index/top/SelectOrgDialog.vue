<template>
  <iep-dialog :dialog-show="dialogShow" title="选择组织切换" width="520px" @close="loadPage">
    <el-form :model="orgForm" ref="orgForm" label-width="100px">
      <el-form-item label="组织名称" prop="name">
        <el-select v-model="orgForm.orgId" placeholder="请选择">
          <el-option v-for="item in orgList" :key="item.orgId" :label="item.name" :value="item.orgId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">切换</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { setOrg } from '@/api/admin/user'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      dialogShow: false,
      orgForm: {
        orgId: '',
      },
      formRequestFn: () => { },
    }
  },
  created () {
    this.orgForm.orgId = this.orgId
  },
  computed: {
    ...mapState({
      orgList: state => state.user.orgs,
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
    ...mapActions([
      'GetUserInfo',
      'GetMenu',
    ]),
    submitForm () {
      setOrg(this.orgForm.orgId).then(() => {
        this.GetUserInfo().then(() => {
          this.dialogShow = false
          const loading = this.$loading({
            lock: true,
            text: '组织切换中....',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          setTimeout(async () => {
            const data = await this.GetMenu()
            this.$router.$avueRouter.formatRoutes(data, true)
            loading.close()
            this.$message({
              message: '组织切换成功!',
              type: 'success',
            })
            this.$router.push({
              path: '/',
            })
          }, 1000)
        })
      })
    },
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
