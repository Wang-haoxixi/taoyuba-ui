<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="解除列表"></page-header>
        <operation-container>
          <template slot="left">
            <iep-button v-if="contractList.length < 1" @click="handleAdd" type="primary" icon="el-icon-plus" plain>申请解除</iep-button>
          </template>
          <template slot="right">
            <iep-button @click="back" plain>返回</iep-button>
          </template>
        </operation-container>
        <avue-tree-table :option="options" style="margin-top: 20px;">
          <el-table-column label="图片证据上传" >
          <template slot-scope="scope">
            <img style="width: auto;height: auto;max-width: 100%;max-height: 100%;" :src="scope.row.image">
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button v-if="(scope.row.status === '待通过' && scope.row.type === '解除合同') && (scope.row.receiverId === recName)" 
              type="text" icon="el-icon-edit" size="mini" @click="agree(scope.row.contractId, scope.row.id)">同意解除合同</el-button>
            <el-button v-if="scope.row.status === '不通过' && (scope.row.userId === recName) && contractList.length < 2" type="text" icon="el-icon-edit" size="mini" @click="complain(scope.row.contractId, scope.row.id)">投诉</el-button>
          </template>
        </el-table-column>
      </avue-tree-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose">
        <span><span style="color:red">*</span>解除原因：</span>
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
      <el-dialog title="提示" :visible.sync="complainDialog" :before-close="complainClose">
        <span><span style="color:red">*</span>投诉原因：</span>
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
          <el-button @click="complainCancel">取 消</el-button>
          <el-button type="primary" @click="complainSave">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="canDialog" width="30%" :before-close="canClose">
        <span>是否同意解除合同</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="agreeRelieve">同 意</el-button>
          <el-button type="primary" @click="cancelRelieve">拒 绝</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import { cancelContract, getContractDetail } from '@/api/tmlms/newContract'
import { addContractCancel, getContractCancelList } from '@/api/tmlms/contractCancel/index'
import { refuseContract } from '@/api/tmlms/newContract/index'
import { getUserInfo } from '@/api/login'
import { getObj } from '@/api/admin/user'
import store from '@/store'
export default {
  name: 'relieve',
  data () {
    return {
      contractList: [],
      params: {
        idcard: '',
        current: 1,
        size: 10,
      },
      total: 0,
      idCard: '',
      dialogVisible: false,
      canDialog: false,
      complainDialog: false,
      form: {
        content: '',
        image: '',
      },
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      contId: '',
      contType: [
        {
          id: 1,
          label: '解除合同',
        },
        {
          id: 2,
          label: '投诉',
        },
      ],
      contStatus: [
        {
          id: 0,
          label: '待通过',
        },
        {
          id: 1,
          label: '通过',
        },
        {
          id: 2,
          label: '不通过',
        },
      ],
      recName: '',
      cont: {
        content: '',
        image: '',
      },
      contStat: '',
      i: '',
      cd: '',
    }
  },
  created () {
    this.getContractList()
  },
  computed: {
    options () {
      return {
        expandAll: false,
        columns: [
          {
            text: '合同号',
            value: 'contractId',
          },
          {
            text: '发起人',
            value: 'userId',
          },
          {
            text: '接受人',
            value: 'receiverId',
          },
          {
            text: '解除原因',
            value: 'content',
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
    async getContractList () {
      // this.idCard = await getUserInfo().then(res => {
      //   return res.data.data.sysUser.idCard
      // })
      this.recName = await getUserInfo().then(res => {
        return res.data.data.sysUser.realName
      })
      // this.params.idcard = this.idCard
      this.params.contractId = this.$route.params.contractId
      this.params.type = 1
      getContractCancelList(this.params).then(({data}) => {
        if (data.code === 0) {
          this.contractList = data.data.records
          this.contractList.forEach(v => {
            getObj(v.userId).then(res => {
              v.userId = res.data.data.realName
            })
            getObj(v.receiverId).then(res => {
              v.receiverId = res.data.data.realName
            })
            this.contStatus.forEach(m => {
              if (v.status === m.id) {
                v.status = m.label
              }
            })
            this.contType.forEach(m => {
              if (v.type === m.id) {
                v.type = m.label
              }
            }) 
          })
          this.total = data.data.total
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    back () {
      this.$router.push({
        path:'/tmlms_spa/contract_list',
      })
    },
    currentChange (current) {
      this.params.current = current
      this.getContractList()
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
    canClose () {
      this.canDialog = false
    },
    save () {
      if(this.form.content !== '') {
        this.form.contractId = this.$route.params.contractId
        this.form.type = 1
        addContractCancel(this.form).then(() => {
          this.$message.success('提交申请成功！')
          this.getContractList()
          this.dialogVisible = false
        }).catch(() => {
          this.$message.error('提交申请失败！')
        })
      } else {
        this.$message.error('解除理由必须填写！')
      }    
    },
    agree (contractId, id) {
      this.canDialog = true
      this.cd = contractId
      this.i = id
    },
    async agreeRelieve () {
      this.contStat = await getContractDetail(this.cd).then(res => {
        return res.data.data.status
      })
      if (this.contStat === 3) {
        cancelContract({contractId: this.cd}).then(() => {
          this.$message.success('解除成功！')
          this.getContractList()
          this.canDialog = false
        }).catch(() => {
          this.$message.error('解除失败！')
          this.getContractList()
          this.canDialog = false
        })
      } else {
        this.$message.error('合同状态不正确，需要管理员审核！')
        this.canDialog = false
      } 
    },
    handleAdd () {
      this.dialogVisible = true
    },
    cancelRelieve () {
      refuseContract(this.i).then(() => {
        this.$message.success('已拒绝对方解除申请')
        this.getContractList()
        this.canDialog = false
      }).catch(() => {
        this.$message.error('拒绝失败！')
        this.getContractList()
        this.canDialog = false
      })
    },
    complain () {
      this.complainDialog = true
    },
    complainClose () {
      this.complainDialog = false
    },
    complainCancel () {
      this.complainDialog = false
    },
    complainSave () {
      if(this.form.content !== '') {
        this.form.contractId = this.$route.params.contractId
        this.form.type = 2
        addContractCancel(this.form).then(() => {
          this.$message.success('提交投诉成功！')
          this.getContractList()
          this.complainDialog = false
        }).catch(() => {
          this.$message.error('提交投诉失败！')
        })
      } else {
        this.$message.error('投诉理由必须填写！')
      } 
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