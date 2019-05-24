<template>
  <!-- 接口审核 -->
  <gov-layout-main>
    <gov-layout-header>
      <!-- 搜索部分 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
    </gov-layout-header>
    <gov-layout-body>
      <!-- 表格 -->
      <avue-crud
        :table-loading="tableLoading"
        :data="tableList"
        :option="interFace"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getList">
        <!-- 表格插槽按钮 -->
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <!-- <el-button @click="handleDetail(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button @click="handleUpdate(scope.row)" type="text" size="small">审核</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <interface-dialog 
      :informationList="informationList"
      :exportApi="handleExportApi"
      :formData="formData"
      :status="dialogStatus"
      @closed="handleClosed"
      @refresh="getList"
      ref="formDialog"/>
  </gov-layout-main>
</template>

<script>
import allMixin from '@/mixins/mixin'
import { getTagTypePage, getDeptList,informationList } from "@/api/element/interface"
import interfaceDialog from "./interDialog"
// import { interFace } from './const/index'
import { getDic } from '@/util/dic'
export default {
  mixins: [allMixin],
  components: {interfaceDialog},
  data () {
    return {
      deptList: [],
      informationList:[],
    }
  },
  computed: {
    // 三个按钮信息
    formProps () {
      return [
        {
          label: "部门名称",
          prop: "deptId",
          props: {
            label: 'name',
            value: 'id',
          },
          type: "select",
          data: this.deptList,
        }, { 
          label: "服务中文名称", 
          prop: "nameCn", 
          type: "input",
        },
      ]
    },
    // 表单信息
    interFace (){
      return {
        page: true,
        menu: false,
        index: false,
        header: false,
        selection: false,
        column: [
          {
            label: "部门名称",
            prop: "deptIdForShow",
          },
          {
            label: "服务中文名称",
            prop: "nameCn",
          },
          {
            label: "服务英文名称",
            prop: "nameEn",
          },
          {
            label: "接入类型",
            prop: "linkType",
            type: 'dic',
            dicData: getDic('ELEMENT_ACCESS_TYPE'),
          },
          {
            label: "资源目录",
            prop: "infoId",
            type: 'dic',
            props: {
              value: "id",
              label: 'name',
            },
            dicData: this.informationList,
          },
          {
            label: "状态",
            prop: "auditState",
            type: 'dic',
            dicData: getDic('AUDIT_STATE'),
          }, {
            label: '操作',
            prop: 'menu',
            solt: true,
          },
        ],
      }
    },
  },
  created () {
    this.getList()
    // 获取部门名称接口
    getDeptList().then(res=>{
      this.deptList = res.data
    })
    informationList().then(res => {
      this.informationList = res.data.data
    })
  },
  methods: {
    // 获取列表
    getList () {
      this.tableLoading = true
      this.listQuery.auditState = '2'
      getTagTypePage(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        console.log(this.tableList)
        this.tableLoading = false
      })
    },
    // 查看方法
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.formData = {...row}
      this.$refs.formDialog.openDialog()
    },
    // 重新生成方法
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.formData = {...row}
      this.$refs.formDialog.openDialog()
    },
    handleClosed (){
      this.formData = {}
    },
  },
}
</script>