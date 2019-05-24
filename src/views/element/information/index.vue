<template>
  <gov-layout-main>
    <!-- 头部搜索框 -->
    <gov-layout-header>
      <gov-search-bar
        :resetIgnore="['limit', 'page', 'isDeleted']"
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter"
      />
      <!-- 按钮组 -->
      <gov-layout-button-group>
        <gov-button type="add" permission="ele_register_add" @click="handleCreate"/>
        <gov-button type="import" permission="ele_register_import" @click="handleImport"/>
        <gov-button type="export" permission="ele_register_export" @click="handleExport"/>
      </gov-layout-button-group>
    </gov-layout-header>
    <!-- 列表 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        :data="mainTableData"
        :option="informationTableProps"
        @refresh-change="getList">
        <template slot-scope="scope" slot="fmtList">
          <span>{{getCascader(scope.row.fmtList)}} </span>
        </template>
        <template slot-scope="scope" slot="status">
          <gov-tool-tip :content="scope.row.reason" status="error" :tooltip="scope.row.status === '5' || scope.row.status === '8'">
            <label>{{ statusComputed(scope.row.status) }}</label>
          </gov-tool-tip>
          <!-- <div v-if="scope.row.status === '5' || scope.row.status === '8'">
            <el-tooltip class="item" effect="dark" :content="scope.row.reason" placement="top">
              <label>{{ statusComputed(scope.row.status) }}</label>
            </el-tooltip>
          </div>
          <div v-else>
            <label>{{ statusComputed(scope.row.status) }}</label>
          </div> -->
        </template>
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button
              type="text"
              @click="handleDetail(scope.row)"
              permission="ele_register_detail"
              text="详情">
            </gov-button>
            <gov-button
              type="text"
              @click="handleSubmit(scope.row)"
              permission="ele_register_submit"
              text="提交"
              v-if="scope.row.status === '2'">
            </gov-button>
            <gov-button
              type="text"
              @click="handleUpdate(scope.row)"
              permission="ele_register_update"
              text="编辑"
              v-if="!(scope.row.status === '4' || scope.row.status === '7')">
            </gov-button>
            <gov-button
              type="text"
              @click="handleDelete(scope.row)"
              permission="ele_register_delete"
              text="删除"
              v-if="scope.row.status === '1' || scope.row.status === '2'|| scope.row.status === '8'">
            </gov-button>
            <gov-button
              type="text"
              @click="handleCancle(scope.row)"
              permission="ele_register_cancle"
              text="注销"
              v-if="scope.row.status === '5' || scope.row.status === '3'">
            </gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <!-- 主弹窗 -->
    <information-dialog
      :options="options"
      @submit="informationSubmit"
      :status="dialogStatus"
      ref="formDialog"/>
   <!-- 导出 -->
    <gov-dialog-export
      :params="listQuery"
      :url="exportData.url"
      :data="exportData.data"
      :listQuery="exportData.listQuery"
      ref="exportDialog"/>
    <!-- 导入 -->
    <gov-dialog-import
      @downLoadDemo="handleDownLoadDemo"
      :action="importData.action"
      ref="importDialog"
      @importSuccess="informationSuccess"/>
  </gov-layout-main>
</template>
<script>

import informationDialog from './informationDialog'
import {informationTableProps} from './const/information'
import GovToolTip from '@/components/govToolTip'
import {
  getExport,
  getExportData,
  getExportDemo,
  informationTableList,
  deleteInformation,
  getSysId,
  submitInformation,
  createInformation,
  updateInformation,
  } from '@/api/element/element'
import mixin from '@/mixins/mixin'

import {
  getDic,
  getDept,
} from '@/util/dic'

export default {
  mixins: [mixin],
  components: {
    informationDialog,
    GovToolTip,
  },
  data () {
    return {
      informationTableProps,
      exportData: {
        url: '/directory/dirExcel/download_data',
        listQuery: {
          fields: [],
          deFields: [],
        },
        data: [
          {
            title: '信息资源字段',
            prop: 'fields',
            data: [],
          },
          {
            title: '信息项字段',
            prop: 'deFields',
            data: [],
          },
        ],
      },
      // 导入参数
      importData: {
        action: '/directory/govresrc/import_data',
      },
      refNameDialog: 'formDialog',
      options: {
        surveyIdList: [], // 所属系统名称
        status: [], // 状态
        isOpen: [], // 开放属性
        deptId: [], // 资源提供方
      },
      mainTableData: [],
      dialogStatus: 'detail',
      listQuery: {
        isDeleted: 1,
      },
    }
  },
  computed: {
    getExport () {
      return getExport
    },
    // 搜索表单参数
    searchOption () {
      return [
        { label: '信息资源名称', prop: 'name', type: 'input' },
        { label: '所属系统名称', prop: 'surveyId', type: 'select', data: this.options.surveyIdList },
        { label: '目录状态', prop: 'status', type: 'select', data: getDic('INFORMATION_STATUS') },
        { label: '开放属性', prop: 'isOpen', type: 'select', data: getDic('IS_NOT')},
        { label: '资源提供方', prop: 'deptId', type: 'select', data: getDept() },
      ]
    },
  },
  created () {
    this.getSysIdData()
    this.getList()
    this.getExportData()
  },
  methods: {
    // 获取导出数据
    getExportData () {
      getExportData().then(({data}) => {
        this.exportData.data[0].data = data.resList
        this.exportData.data[1].data = data.eleList
      })
    },
    // 所属系统名称
    getSysIdData () {
      getSysId().then(({data}) => {
        let res = data
        let arr = []
        for (let key in res) {
          arr.push({value: String(key), label: res[key]})
        }
        this.$set(this.options, 'surveyIdList', arr)
      })
    },
    // 列表
    getList () {
      this.tableLoading = true
      let result = Object.assign({}, this.listQuery)
      result.isDeleted = 1
      informationTableList(result).then(({data}) => {
        this.mainTableData = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    // 列表详情
    handleDetail (row) {
      this.dialogStatus = 'detail'
      this.$nextTick(()=>{
        this.$refs['formDialog'].open(row)
      })
    },
    // 列表编辑
    handleUpdate (row) {
      this.dialogStatus = 'update'
      this.$nextTick(()=>{
        this.$refs['formDialog'].open(row)
      })
    },
    // 列表新增
    handleCreate () {
      this.dialogStatus = 'create'
      this.$nextTick(()=>{
        this.$refs['formDialog'].open({})
      })
    },
    // 列表单条删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        deleteInformation({id: [row.id]}).then(({data}) => {
          let res = data
          if (res.code === this.SUCCESS) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },
    // 列表提交
    handleSubmit (row) {
      let params = {
        id: row.id,
        status: 7,
      }
      this.$confirm('将要提交，是否继续？', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        submitInformation(params).then(({data}) => {
          let res = data
          if (res.code === this.SUCCESS) {
            this.getList()
          }
          this.$message.success('提交成功!')
        })
      }).catch(() => {})
    },
    //注销
    handleCancle (row) {
      let params = {
        id: row.id,
        status: 4,
      }
      this.$confirm('将要注销，是否继续？', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        submitInformation(params).then(({data}) => {
          let res = data
          if (res.code === this.SUCCESS) {
            this.getList()
            this.$message.success('申请注销成功!')
          }
        })
      }).catch(() => {})
    },
    getCascader (list) {
      let dic = getDic('FMT')
      let key = list[0]
      let key2 = list[1]
      let itemLabel = ''
      let item2Label = ''
      for(let item of dic){
        if(item.value === key){
          itemLabel = item.label
          for(let item2 of item.children){
            if(item2.value === key2){
              item2Label = item2.label
            }
          }
        }
      }
      return itemLabel + "/" + item2Label
    },
    //归集
    handleCollect (id) {
      this.$refs['collectDialog'].open(id)
    },
    informationSuccess () {
      this.getList()
    },
    // 导出
    handleExport () {
      this.$refs.exportDialog.open()
    },
    // 导入
    handleImport () {
      this.$refs.importDialog.open()
    },
    // 模板下载
    handleDownLoadDemo () {
      getExportDemo()
    },
    statusComputed (status) {
      let list = getDic('INFORMATION_STATUS')
      let outText = ''
      list.forEach(item=>{
        if (item.value === status) {
          outText = item.label
        }
      })
      return outText
    },
    informationSubmit (formData, status) {
      if (status === 'save' && this.dialogStatus === 'create') {
        if (formData.elements.length === 0) {
          this.$message.warning('信息项不能为空')
          return
        }
        this.$refs['formDialog'].btnLoading = true
        formData.status = "2"
        createInformation(formData).then(()=>{
          this.$message.success('新增成功')
          this.$refs['formDialog'].btnLoading = false
          this.$refs['formDialog'].close()
          this.getList()
        }).catch(()=>{
          this.$refs['formDialog'].btnLoading = false
        })
      } else if (status === 'save' && this.dialogStatus === 'update') {
        if (formData.elements.length === 0) {
          this.$message.warning('信息项不能为空')
          return
        }
        this.$refs['formDialog'].btnLoading = true
        formData.status = "2"
        updateInformation(formData).then(()=>{
          this.$message.success('编辑成功')
          this.$refs['formDialog'].btnLoading = false
          this.$refs['formDialog'].close()
          this.getList()
        }).catch(()=>{
          this.$refs['formDialog'].btnLoading = false
        })
      } else {
        this.$refs['formDialog'].btnLoading = true
        if (this.dialogStatus === 'create') {
          formData.status = "1"
          createInformation(formData).then(()=>{
            this.$message.success('草稿保存成功')
            this.$refs['formDialog'].btnLoading = false
            this.$refs['formDialog'].close()
            this.getList()
          }).catch(()=>{
            this.$refs['formDialog'].btnLoading = false
          })
        } else {
          formData.status = "1"
          updateInformation(formData).then(()=>{
            this.$message.success('草稿保存成功')
            this.$refs['formDialog'].btnLoading = false
            this.$refs['formDialog'].close()
            this.getList()
          }).catch(()=>{
            this.$refs['formDialog'].btnLoading = false
          })
        }
      }
    },
  },
}
</script>
