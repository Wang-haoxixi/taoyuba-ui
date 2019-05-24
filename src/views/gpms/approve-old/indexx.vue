<template>
  <div>
    <basic-container>
      <page-header title="我的审批" :replaceText="replaceText" :data="[16]"></page-header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <operation-container>
            <template slot="right">
              <operation-search
                @search="searchPage"
                @closed="dialogIsShow = true"
                advanceSearch
                place-holder="请输入项目名称"
                :dialogIsShow="dialogIsShow"
              >
                <!--title-->
                <el-row class="search">
                  <el-col :span="23">
                    <strong>高级搜索</strong>
                  </el-col>
                </el-row>
                <!-- 表单 -->
                <el-col :span="23" :pull="2">
                  <el-form :model="paramForm" label-width="120px" size="mini">
                    <el-form-item label="项目名称:">
                      <el-input v-model="paramForm.name" placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="编号:">
                      <el-input v-model="paramForm.num" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="申请类别:">
                      <el-select v-model="paramForm.ApplicationCategory" filterable placeholder="请选择申请类别">
                        <el-option
                          v-for="item in undertakeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="审批状态:">
                      <el-select v-model="paramForm.ApprovalStatus" filterable placeholder="请选择审批状态">
                        <el-option
                          v-for="item in Approval"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="申请人:">
                      <el-input v-model="paramForm.Applicant" placeholder="请输入申请人"></el-input>
                    </el-form-item>
                    <el-form-item label="审批人:">
                      <el-input v-model="paramForm.Approver" placeholder="请输入审批人"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-col :span='12'>
                        <el-button type="info" @click="onSubmit">搜索</el-button>
                      </el-col>
                      <el-col :span='12'>
                        <el-button>取消</el-button>
                      </el-col>
                    </el-form-item>
                  </el-form>
                </el-col>
              </operation-search>
            </template>
          </operation-container>
          <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="text" @click="details(scope.row)">详情</el-button>
                    <el-button size="small" type="text" @click="Approvals(scope.row)">审批</el-button>
                    <el-button size="small" type="text" @click="HandOver(scope.row)">转交</el-button>
                    <el-button size="small" type="text" @click="Cancellation">取消审批</el-button>
                </template>
            </el-table-column>
        </iep-table>
        <!-- 弹窗组件 -->
        <transfer-dialog :status="dialogStatus" :dialogVisible="dialogVisible" @listClose = "listClose" :rows = "rows"></transfer-dialog>
        <!-- 详情组件 -->
        <detailes :rows = "rows" v-show="detai"></detailes>
        <!-- 审批组件 -->
        <details-of-approver :rows = "rows" v-show="false"></details-of-approver>
        <!-- 合同详情组件 -->
        <contract-detaile v-show="false"></contract-detaile>
        <!-- 审批合同组件 -->
        <approval-contract v-show="false"></approval-contract>
        </el-tab-pane>
        <el-tab-pane label="待审批" name="second">
          <pending-approval></pending-approval>
        </el-tab-pane>
        <el-tab-pane label="审批通过" name="third">
          <approval-and-approval></approval-and-approval>
        </el-tab-pane>
        <el-tab-pane label="审批不通过" name="fourth">
          <not-pass></not-pass>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { undertakeOptions, Approval,columnsMap,pagedTable } from './const.js'
import ApprovalAndApproval from './ApprovalAndApproval/'
import NotPass from './NotPass/'
import PendingApproval from './PendingApproval/'
import TransferDialog from './TransferDialog'
import Detailes from './Detailes'
import DetailsOfApprover from './DetailsOfApprover'
import contractDetaile from './contractDetaile'
import ApprovalContract from './ApprovalContract'
export default {
  mixins: [mixins],
  name: 'index',
  components:{ApprovalAndApproval,NotPass,PendingApproval,TransferDialog,Detailes,DetailsOfApprover,contractDetaile,ApprovalContract},
  data () {
    return {
      detai:false,
      undertakeOptions,
      Approval,
      activeName: 'first',
      dialogIsShow: true,
      replaceText: data => `（共${data[0]}项数据)`,
      isLoadTable:false,
      columnsMap,
      pagedTable,
      dialogStatus:'',
      dialogVisible:false,
      paramForm: {
        name: '', //项目名称
        num: '', //编号
        ApplicationCategory:'',//申请类别
        ApprovalStatus:'',//审批状态
        Applicant:'',//申请人
        Approver:'',//审批人
      },
      rows:{},
    }
  },
  methods: {
    searchPage (name) {
      if (name) {
        this.paramForm.name = name
      }
      console.log(this.paramForm)
      // console.log(this.paramForm)
      // 搜索完成后
      // this.paramForm.name = ''
    },
    // 切换标签页
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 搜索
    onSubmit (){
      
    },
    // 详情
    details (row){
      console.log(row)
      this.rows = row
    },
    // 审批
    Approvals (row){
      this.rows = row
    },
    // 转交
    HandOver (row){
      console.log(row)
      this.$nextTick(()=>{
        this.dialogStatus = 'HandOver'
        this.dialogVisible = true
      })
      this.rows = row
    },
    listClose (val){
      // console.log(val)
      this.dialogVisible = val
    },
    // 取消审批
    Cancellation (){},
  },
}
</script>

<style scoped>
.search {
  border-bottom: 1px solid gray;
  margin-bottom: 20px;
}
</style>