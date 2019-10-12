<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="解除列表"></page-header>
        <operation-container>
          <template slot="right">
            <iep-button @click="back" plain>返回</iep-button>
          </template>
        </operation-container>
        <avue-tree-table :option="options" style="margin-top: 20px;"></avue-tree-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getContractCancelList } from '@/api/tmlms/contractCancel/index'
import { getObj } from '@/api/admin/user'
export default {
  props: {
    record: {},
    type: {},
  },
  data () {
    return {
      removeList: [],
      params: {
        current: 1,
        size: 10,
      },
      total: 0,
    }
  },
  created () {
    if (this.record) {
      this.getRemoveList()
    }  
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
            text: '操作者',
            value: 'userId',
          },
          {
            text: '解除理由',
            value: 'content',
          },
          {
            text: '解除时间',
            value: 'createTime',
          },
        ],
        data: this.removeList,
      }
    },
  },
  methods: {
    getRemoveList () {
      this.params.contractId = this.record
      this.params.type = 1
      getContractCancelList(this.params).then(data => {
        if (data.data.code === 0) {
          this.removeList = data.data.data.records
          this.removeList.forEach(v => {
            getObj(v.userId).then(res => {
              v.userId = res.data.data.realName
            })
          })
          this.total = data.data.total
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    back () {
    //   this.$router.push({
    //     path: '/tmlms_spa/contract_list',
    //   })
      this.$emit('onGoBack')
    },
    currentChange (current) {
      this.params.current = current
      this.getRemoveList()
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