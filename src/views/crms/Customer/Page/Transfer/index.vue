<template>
  <iep-dialog :dialog-show="dialogShow" :title="`转移客户`" width="30%" @close="close">
    <div class="user">
      <el-form :model="form">
        <el-form-item label="新负责人：">
          <iep-contact-select v-model="form.user"></iep-contact-select>
        </el-form-item>
      </el-form>
    </div>
    <template slot="footer">
      <iep-button class="btn" @click="close">取消</iep-button>
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
    </template>
  </iep-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { TransferCustomers } from '@/api/crms/customer'
import { fetchList } from '@/api/admin/user'
export default {
  name: 'collaborator',
  mixins: [mixins],
  data () {
    return {
      dialogShow: false,
      data: [],
      id: '',
      materialName: '',
      dictsMap: {},
      Contacts: {
        clientIds: '',
        creatorId: [],
      },
      form: {
        user: {
          id: '',
          name: '',
        },
      },
    }
  },
  created () {
    this.loadPage()
  },

  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable(param, fetchList)
      this.drawerShow = false
    },
    search () {
      this.loadTable({ materialName: this.materialName }, fetchList)
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    close () {      
      this.form.user = {
        id: '',
        name: '',
      }
      this.dialogShow = false
    },
    submitForm () {
      this.Contacts.clientIds = this.id
      this.Contacts.creatorId = this.form.user.id
      TransferCustomers(this.Contacts).then(res => {
        if (res.data.data) {
          this.$message.success('转移客户成功！')
          this.dialogShow = false
          this.form.user = {
            id: '',
            name: '',
          }
          this.$emit('load-page')
        } else {
          this.$message.error(`操作失败，${res.data.msg}`)
        }
      })
    },
  },
}
</script>
<style lang='scss' scoped>
.list {
  float: left;
  padding-left: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 37px;
}
.list span {
  padding: 0 5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 38px;
}
.search {
  margin-bottom: 10px;
}
.user {
  padding: 20px 0;
  display: flex;
  align-items: baseline;
}
.el-form {
  width: 100%;
}
</style>

