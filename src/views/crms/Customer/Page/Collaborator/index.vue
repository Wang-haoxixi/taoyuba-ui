<template>
  <iep-dialog :dialog-show="dialogShow" :title="`添加协作人`" width="50%" @close="close">
    <div class="user">
      <span class='text'>请选择需要添加的协作人：</span>
      <iep-contact-multiple-user v-model="user"></iep-contact-multiple-user>
    </div>

    <template slot="footer">
      <iep-button class="btn" @click="close">取消</iep-button>
      <iep-button type="primary" @click="submitForm">保存</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { AddCollaborator } from '@/api/crms/customer'
// import { fetchList } from '@/api/admin/user'
export default {
  name: 'collaborator',
  mixins: [mixins],
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      user: [],
      dialogShow: false,
      data: {
        clientId: '',
        userId: [],
      },
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.user = []
    },
    submitForm () {
      var that = this
      this.user.forEach(function (val) {
        that.data.userId.push(val.id)
      })
      AddCollaborator(this.data).then(res => {
        if (res.data.data) {
          this.$message.success('添加协作人成功！')
          this.dialogShow = false
          this.user = []
        } else {
          this.$message.error(`操作失败，${res.data.msg}`)
        }
      })
    },
  },
}
</script>
<style  scoped>
.text {
  display: inline-block;
  padding-bottom: 10px;
}
.user {
  padding-bottom: 30px;
  font-size: 14px;
}
</style>

