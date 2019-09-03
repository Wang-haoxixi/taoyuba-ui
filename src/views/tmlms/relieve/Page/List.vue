<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="网签合同"></page-header>
        <operation-container>
        </operation-container>
        <avue-tree-table :option="options" style="margin-top: 20px;">
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button v-if="mlms_relieve_rel" type="text" icon="el-icon-edit" size="mini" @click="openDialog(scope.row.contractId)">申请解除
            </el-button>
          </template>
        </el-table-column>
      </avue-tree-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose">
        <span>解除原因：</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.content"></el-input>
        <span>图片证明：</span>
        <el-upload
          class="avatar-uploader"
          action="/api/admin/file/upload/avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess" :headers="headers"  accept="image/*">
          <img v-if="form.image" :src="form.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
        </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import { getContractList } from '@/api/tmlms/newContract'
import { addContractCancel } from '@/api/tmlms/contractCancel/index'
import { getUserInfo } from '@/api/login'
import { mapGetters } from 'vuex'
import store from '@/store'
export default {
  name: 'relieve',
  data () {
    return {
      contractList: [],
      params: {
        current: 1,
        size: 10,
      },
      total: 0,
      mlms_relieve_rel: false,
      mlms_relieve_com: false,
      idCard: '',
      dialogVisible: false,
      form: {
        content: '',
        image: '',
      },
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      contId: '',
    }
  },
  created () {
    this.getContractList()
    this.mlms_relieve_rel = this.permissions['mlms_relieve_rel']
    this.mlms_relieve_com = this.permissions['mlms_relieve_com']
    getUserInfo().then(res => {
      this.idCard = res.data.data.sysUser.idCard
    })
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
    options () {
      return {
        expandAll: false,
        columns: [
          {
            text: '合同编号',
            value: 'contractNumber',
          },
          {
            text: '船名',
            value: 'shipName',
          },
          {
            text: '雇主（甲方）',
            value: 'employerName',
          },
          {
            text: '雇员（乙方）',
            value: 'employeeName',
          },
          {
            text: '合同类型',
            value: 'type',
          },
          {
            text: '合同状态',
            value: 'status',
          },
        ],
        data: this.contractList,
      }
    },
  },
  methods: {
    async  getContractList () {
      this.idCard = await getUserInfo().then(res => {
        return res.data.data.sysUser.idCard
      })
      this.params.idcard = this.idCard
      getContractList(this.params).then(({data}) => {
        if (data.code === 0) {
          this.contractList = data.data.records
          this.total = data.data.total
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    currentChange (current) {
      this.params.current = current
      this.getContractList()
    },
    openDialog (contractId) {
      this.dialogVisible = true
      this.contId = contractId
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleAvatarSuccess (res) {
      this.form.image = res.data.url
    },
    cancel () {
      this.dialogVisible = false
    },
    save () {
      this.form.contractId = this.contId
      this.form.type = 1
      addContractCancel(this.form).then(() => {
        this.$message.success('提交申请成功！')
        this.dialogVisible = false
      }).catch(() => {
        this.$message.error('提交申请失败！')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.contract-box {
  padding: 20px;
}
</style>

<style scoped>
.input-wrapper {
  display: flex;
  max-width: 350px;
}
.input-wrapper > * {
  margin-right: 5px;
}
.input-wrapper >>> .el-input.is-active .el-input__inner {
  border-color: #c0c4cc;
}
.input-wrapper >>> .el-input__inner:focus {
  border-color: #c0c4cc;
}
.input-wrapper >>> .senior-btn {
  margin-left: -6px;
  padding: 9px 5px;
  border-radius: 0 3px 3px 0;
}
.input-wrapper >>> .el-input-group {
  width: inherit;
}
.search-btn:hover,
.search-btn:focus {
  opacity: 0.8;
}
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>