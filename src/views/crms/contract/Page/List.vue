<template>
  <div>
    <basic-container>
      <page-header title="合同"></page-header>
      <div class="info">回款总金额：123,000,000，待收款 <i class="el-icon-question"></i> ：3，000，000，回款率：89%</div>
      <operation-container>
        <template v-if="+type !=0" slot="left">
          <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage" advance-search :prop="'contractName'">
            <advance-search @search-page="searchPage" :type="type"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :cell-style="mixinsCellPointerStyle" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" @row-click="handleDetail" :dictsMap="dictsMap">
        <el-table-column v-if="+type !== 0" prop="operation" label="操作" width="250">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button @click="handeleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <detail-drawer ref="DetailDrawer" @load-page="loadPage"></detail-drawer>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMapByTypeId, dictsMap } from '../columns'
import { getContractPage, postContract, putContract, deleteContract, getDataById } from '@/api/crms/contract'
import DetailDrawer from './DetailDrawer'
import AdvanceSearch from './AdvanceSearch'
import { getObj } from '@/api/admin/user'
import { mapGetters } from 'vuex'
export default {
  name: 'List',
  mixins: [mixins],
  components: {
    DetailDrawer,
    AdvanceSearch,
  },
  data () {
    return {
      dictsMap,
      type: '1',
      deleteAll: false,
      dialogVisible: false,
      tabList: [
        {
          label: '我的合同',
          value: '1',
        },
        {
          label: '全部合同',
          value: '0',
        },
      ],
      replaceText: (data) => `（本周新增${data[0]}位客户）`,
    }
  },
  computed: {
    columnsMap () {
      return columnsMapByTypeId
    },
    ...mapGetters(['dictGroup']),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    changeType () {
      this.searchPage({ type: this.type })
    },
    handleAdd () {
      this.$emit('onForm', {
        formRequestFn: postContract,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onForm', {
        formRequestFn: putContract,
        methodName: '修改',
        id: row.contractId,
      })
    },
    handleDetail (row, column) {
      if (column.label == '操作' || column.type == 'selection' || column.type == 'index') {
        return false
      }
      this.$refs['DetailDrawer'].drawerShow = true
      getDataById(row.contractId).then(res => {
        this.$refs['DetailDrawer'].formData = res.data.data
        // 业务类型处理
        let businessType = res.data.data.businessType.split(','), list = []
        for (let type of businessType) {
          for (let item of this.dictGroup.prms_business_type) {
            for (let t of item.children) {
              if (t.value == type) {
                list.push(t.label)
              }
            }
          }
        }
        this.$refs['DetailDrawer'].infoList = list.toString()
        getObj(res.data.data.directorId).then(res => {
          this.$set(this.$refs['DetailDrawer'].formData, 'Manager', res.data.data.realName)
        })
      })
    },
    handeleDelete (row) {
      this.$confirm('此操作将同时删除原件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteContract(row.contractId).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
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
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, type: this.type }, getContractPage)
    },

  },
}
</script>
<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
  margin-bottom: 5px;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
.info {
  color: #666;
  padding: 8px 18px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  i {
    color: #ccc;
    cursor: pointer;
  }
}
</style>

