<template>
  <basic-container>
    <div v-if="pageState == 'list'">
      <page-header title="我的配置" :replaceText="replaceText" :data="[16]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleCreate" type="primary" icon="el-icon-plus">新增</iep-button>
        </template>
        <template slot="right">
          <operation-search @search="searchPage"></operation-search>
        </template>
      </operation-container>
      <iep-table 
        :isLoadTable="isLoadTable = false" 
        :pagination="pagination" 
        :columnsMap="columnsMap" 
        :pagedTable="pagedTable" 
        :dictsMap="dictsMap" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleDetail(scope.row)">详情</iep-button>
              <iep-button @click="handleUpdate(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </div>

    <mainDialog ref="form" @close="handleClose" v-if="pageState == 'form'"></mainDialog>
  </basic-container>
      
</template>

<script>
import mixins from '@/mixins/mixins'
import { getTableData, deleteDataById, getDataById } from '@/api/gpms/config'
import { columnsMap, dictsMap } from './options'
import mainDialog from './mainDialog'

export default {
  mixins: [ mixins ],
  components: { mainDialog },
  data () {
    return {
      columnsMap,
      dictsMap,
      replaceText: (data) => `（共${data[0]}项资源)`,
      pageState: 'list',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, getTableData)
    },
    searchPage () {
      this.$emit('search-page', this.paramForm)
    },
    handleCreate () {
      this.pageState = 'form'
    },
    handleDetail () {},
    handleUpdate (row) {
      getDataById(row.id).then(({data}) => {
        this.pageState = 'form'
        this.$nextTick(() => {
          this.$refs['form'].open(data.data, 'update')
        })
      })
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deleteDataById)
    },
    handleClose () {
      this.pageState = 'list'
      this.loadPage()
    },
  },
}
</script>

<style lang="scss" scoped>
.addDia {
  width: 100%;
  background-color: #fff;
}
.row-bg {
  padding: 0 20px;
  border-bottom: 1px solid #f8f8f8;
  margin-bottom: 10px;
}
.callbackAdd {
  float: right;
  margin-bottom: 15px;
}
.addFont {
  font-size: 18px;
}
.cent {
  margin: 0;
}
.sixsix {
  color: #303133;
}
</style>


