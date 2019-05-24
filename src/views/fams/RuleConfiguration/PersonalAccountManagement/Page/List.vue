<template>
  <div>
    <basic-container>
      <page-header title="国脉贝配置"></page-header>
      <operation-container>
        <template slot="left">
          <!-- <iep-button @click="handleAdd()" type="primary" icon="el-icon-plus" plain>发起申请</iep-button> -->
          <!-- <el-button @click="rowCell(scope.row,scope.index)">发起申请</el-button> -->
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="关键字">
                <el-input v-model="paramForm.keyword"></el-input>
              </el-form-item>
              <el-form-item label="申请时间">
                <el-date-picker v-model="paramForm.applyTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="发布时间">
                <el-date-picker v-model="paramForm.sendTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="发票金额">
                <el-col :span="11">
                  <el-input v-model="paramForm.sum1" style="width: 100%;"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input v-model="paramForm.sum2" style="width: 100%;"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="提交类型">
                <el-select v-model="paramForm.type" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="paramForm.status" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
             <el-form-item label="销售方">
                <el-select v-model="paramForm.seller" placeholder="请选择">
                  <el-option v-for="item in classify" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="small" type="warning" plain @click="handleDetail(scope.row)">查看明细</el-button>
            <el-button size="small">冻结/解冻</el-button>
            <el-dropdown size="small">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleEdit(scope.row)">修改</el-dropdown-item>
                  <el-dropdown-item>分享</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <!-- <new-approval ref="NewApproval" @load-page="loadPage"></new-approval> -->
  </div>
</template>

<script>
import { getPersonalAccountManagementPage } from '@/api/fams/personal_account_management'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap,initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
    handleDetail () {
      // this.$emit('onDetail', {
      //   formRequestFn: putApprovalInitiate,
      //   methodName: '查看明细',
      //   id: row.id,
      // })
    },
    handleEdit () {
      // this.$emit('onEdit', {
      //   formRequestFn: putApprovalInitiate,
      //   methodName: '编辑规则',
      //   id: row.id,
      // })
    },
    loadPage (param = this.searchForm) {
      this.loadTable(param, getPersonalAccountManagementPage)
    },
  },
}
</script>
<style scoped>
.el-table td div{
  margin-left: 8px;
}
</style>
