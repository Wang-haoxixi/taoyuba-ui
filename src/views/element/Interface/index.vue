<template>
  <!-- 接口注册 -->
  <gov-layout-main>
    <!-- 头部按钮组 -->
    <gov-layout-header>
      <!-- 搜索 -->
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
      <!-- 新增和导出按钮 -->
      <gov-layout-button-group>
        <gov-button v-if="ele_Interface_put" type="add" @click="handleAdd" plain="true"></gov-button>
        <gov-button v-if="ele_Interface_export" type="export" @click="handleExport"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <!-- 内容表格 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="tableList"
        :option="interFace"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @refresh-change="getList">
        <!-- 表格插槽理由 -->
        <template slot-scope="scope" slot="auditState">
          <gov-tool-tip :content="scope.row.reason" status="error" :tooltip="scope.row.auditState === '4'">
            <label>{{ auditStateComputed(scope.row.auditState) }}</label>
          </gov-tool-tip>
          <!-- <div v-if="scope.row.auditState === '4'">
            <el-tooltip class="item" effect="dark" :content="scope.row.reason" placement="top">
              <label>{{ auditStateComputed(scope.row.auditState) }}</label>
            </el-tooltip>
          </div>
          <div v-else>
            <label>{{ auditStateComputed(scope.row.auditState) }}</label>
          </div> -->
        </template>
        <!-- 表格插槽按钮 -->
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button v-if="ele_Interface_selete" @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button v-if="ele_Interface_submit && scope.row.auditState === '1'" @click="handleSubmit(scope.row.id)" type="text" size="small">提交</el-button>
            <el-button v-if="ele_Interface_update" @click="handleUpdate(scope.row)" type="text" size="small">重新生成</el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 弹窗 -->
    <interface-dialog
      :exportApi="handleExportApi"
      :formData="formData"
      :status="dialogStatus"
      :informationList="informationList"
      @getList="getList"
      @closed="handleClosed"
      ref="formDialog"/>
  </gov-layout-main>
</template>
<script>
import mixin from "@/mixins/mixin"
import { getTagTypePage, getDeptList, exportData, informationList, interFaceSubmit } from "@/api/element/interface"
import interfaceDialog from "./interfaceDialog"
import { getDic } from '@/util/dic'
import { mapGetters } from 'vuex'
import GovToolTip from '@/components/govToolTip'
export default {
  mixins: [mixin],
  components: {interfaceDialog, GovToolTip},
  data () {
    return {
      deptList: [],
      informationList:[],
      ele_Interface_put: false,
      ele_Interface_export: false,
      ele_Interface_selete: false,
      ele_Interface_submit: false,
      ele_Interface_update: false,
    }
  },
  computed: {
    // 三个按钮信息
    formProps () {
      return [
        {
          label: "状态",
          prop: "auditState",
          type: "select",
          data: getDic('AUDIT_STATE'),
        }, {
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
          maxlength: 100,
        },
      ]
    },
    // 表单信息
    interFace (){
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        page: true,
        index: false,
        menu: false,
        column: [
          {
            label: "部门名称",
            prop: "deptIdForShow",
          },
          {
            label: "服务中文名称",
            prop: "nameCn",
            maxlength: 100,
          },
          {
            label: "服务英文名称",
            prop: "nameEn",
            maxlength: 100,
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
            solt: true,
            type: 'dic',
            dicData: getDic('AUDIT_STATE'),
          },
          {
            label: "操作",
            prop: "menu",
            width: 200,
            solt: true,
          },
        ],
      }
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    getDeptList().then(res=>{
      this.deptList = res.data
    })
    informationList().then(res => {
      this.informationList = res.data.data
    })
    this.ele_Interface_put = this.permissions['ele_Interface_put']
    this.ele_Interface_export = this.permissions['ele_Interface_export']
    this.ele_Interface_selete = this.permissions['ele_Interface_selete']
    this.ele_Interface_submit = this.permissions['ele_Interface_submit']
    this.ele_Interface_update = this.permissions['ele_Interface_update']



  },
  methods: {
    // 新增方法
    handleAdd () {
      this.formData = {}
      this.dialogStatus = 'create'
      this.$refs.formDialog.openDialog()
    },
    // 查看方法
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.formData = {...row}
      this.$refs.formDialog.openDialog()
    },
    // 重新生成方法
    handleUpdate (row) {
      this.dialogStatus = 'reGen'
      this.formData = {...row}
      this.$refs.formDialog.openDialog()
    },
    // 数据导出
    handleExport () {
      this.$confirm('是否导出接口注册数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let data = Object.assign({}, this.listQuery)
        delete data.page
        delete data.limit
        exportData(data).then(()=>{
          this.$message.info('正在导出数据...')
        })
      }).catch(() => {})
    },
    // 获取列表
    getList () {
      this.tableLoading = true
      getTagTypePage(this.listQuery).then(({ data }) => {
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      })
    },
    // 显示未通过理由
    auditStateComputed (auditState) {
      let list = getDic('AUDIT_STATE')
      let outText = ''
      list.forEach(item=>{
        if (item.value === auditState) {
          outText = item.label
        }
      })
      return outText
    },
    // 退出弹框后数据清空
    handleClosed () {
      this.formData = {}
    },
    handleSubmit (id) {
      this.$confirm("将要提交，是否继续？","提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(()=>{
        interFaceSubmit({
          id: id,
          auditState: '2',
        }).then(()=>{
          this.$message.success('提交成功!')
          this.getList()
        })
      }).catch(()=>{})
    },
  },
}
</script>
