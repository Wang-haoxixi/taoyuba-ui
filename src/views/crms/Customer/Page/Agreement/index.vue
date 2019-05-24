<template>
  <div>
    <div class="scheme" v-if="pageState=='list'">
      <operation-wrapper>
        <iep-button type="primary" @click="handleAdd" plain><i class="el-icon-plus"></i> 新增</iep-button>
      </operation-wrapper>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @row-click="handleDetail" :dictsMap="dictsMap">
        <template slot="before-columns">
          <el-table-column label="合同名称">
            <template slot-scope="scope">
              <div class="custom-name">{{scope.row.contractName}}</div>
              <el-col class="custom-tags">
                <Tag v-for="(item, index) in scope.row.tags" :key="index">{{item}}</Tag>
              </el-col>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="创建人" width="250px" v-if="record.collaborations.length !==0">
          <template slot-scope="scope">
            <div>
              <div class="line">
                <iep-img-avatar :size="30" :src="scope.row.avatar" alt="头像"></iep-img-avatar>
              </div>
              <div class="create-name line">
                {{scope.row.realName}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="250px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" plain size="small" type="warning" :disabled="scope.row.userId !== userInfo.userId">编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)" size="small" :disabled="scope.row.userId !== userInfo.userId">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>
    <edit ref="EditDialog" @load-page="loadPage" v-if="pageState=='dialog'" @dialog="isShow" @async="async" :record="record" :add="add"></edit>
    <detail ref="DetailDialog" v-if="pageState=='detail'" @detail="isShow" :add="add"></detail>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import { getAgreementPage, postAgreement, putAgreement, deleteAgreementById } from '@/api/crms/agreement'
import Edit from './Edit'
import Detail from './Detail'
import { mapGetters } from 'vuex'
export default {
  name: 'contract',
  components: { Edit, Detail },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      formData: {},
      pageState: 'list',
      id: this.record.id,
      add: {},
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    async () {
      this.$emit('load-page')
    },
    loadPage (param = { ...this.searchForm, id: this.id }) {
      this.pageState = 'list'
      this.loadTable(param, getAgreementPage)
    },
    handleAdd () {
      this.add = {
        formRequestFn: postAgreement,
        methodName: '新增',
        id: this.id,
      }
      this.pageState = 'dialog'
    },
    handleEdit (row) {
      this.add = {
        formRequestFn: putAgreement,
        methodName: '编辑',
        id: this.id,
        contractId: row.contractId,
      }
      this.pageState = 'dialog'
    },
    handleDetail (row, column) {
      if (column.label == '操作' || column.type == 'selection' || column.type == 'index') {
        return false
      }
      this.add = {
        formRequestFn: putAgreement,
        methodName: '详情',
        id: this.id,
        contractId: row.contractId,
      }
      this.pageState = 'detail'
    },
    isShow () {
      this.pageState = 'list'
    },
    handleDeleteById (row) {
      this.$confirm('此操作将同时删除原件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteAgreementById(row.contractId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$emit('load-page')
          } else {
            this.$message({
              type: 'info',
              message: `删除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
  },

}
</script>
<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
}
.line {
  display: inline-block;
  vertical-align: middle;
}
.create-name {
  vertical-align: middle;
  padding-left: 5px;
}
</style>
