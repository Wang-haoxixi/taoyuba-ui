<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="投诉管理"></page-header>
        <operation-container>
          <template slot="right">
            <iep-button @click="$router.go(-1)" plain>返回</iep-button>
          </template>
        </operation-container>
        <avue-tree-table :option="options" style="margin-top: 20px;">
          <el-table-column label="图片证据上传" >
          <template slot-scope="scope">
            <img style="width: auto;height: auto;max-width: 100%;max-height: 100%;" :src="scope.row.image">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.type === '投诉' && scope.row.status === '待通过'" type="text" icon="el-icon-edit" size="mini" @click="complain(scope.row.contractId, scope.row.id)">是否同意投诉</el-button>
          </template>
        </el-table-column>
      </avue-tree-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="comDialog" width="30%" :before-close="comClose">
        <span>是否同意投诉</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="agreeComplain">同 意</el-button>
          <el-button type="primary" @click="cancelComplain">拒 绝</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import { getContractDetail, complantContract } from '@/api/tmlms/newContract'
import {  getContractCancelList, disallowContract } from '@/api/tmlms/contractCancel/index'
import { getObj } from '@/api/admin/user'
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
      i: '',
      cd: '',
      comDialog: false,
      cont:'',
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
            text: '解除或投诉原因',
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
    getContractList () {
      this.params.contractId = this.$route.params.contractId
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
    currentChange (current) {
      this.params.current = current
      this.getContractList()
    },
    complain (contractId, id) {
      this.comDialog = true
      this.cd = contractId
      this.i = id
    },
    comClose () {
      this.comDialog = false
    },
     async agreeComplain () {
      this.cont = await getContractDetail(this.cd).then(res => {
        return res.data.data.status
      })
      if (this.cont === 3) {
        complantContract({cancelId: this.i}).then(() => {
          this.$message.success('同意投诉成功！')
          this.getContractList()
          this.comDialog = false
        }).catch(() => {
          this.$message.error('同意投诉失败！')
        })
      } else {
        this.$message.error('合同状态不正确，需要管理员审核！')
      }
    },
    cancelComplain () {
      disallowContract(this.i).then(() => {
        this.$message.success('已拒绝投诉申请')
        this.getContractList()
        this.comDialog = false
      }).catch(() => {
        this.$message.error('拒绝投诉失败！')
        this.getContractList()
        this.comDialog = false
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
