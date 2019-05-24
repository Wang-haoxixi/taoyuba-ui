<template>
  <!-- 归集注册 -->
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        :listQuery="listQuery"
        :formProps="searchOption"
        @handleFilter="handleFilter"
      />
      <gov-layout-button-group>
        <gov-button type="export" v-if="ele_collection_register_export" @click="handleExport"></gov-button>
      </gov-layout-button-group>
    </gov-layout-header>
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        :data="mainTableData"
        :option="mainTableOption"
        :page="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        @selection-change="selectionChange"
        @refresh-change="getList">
        <template slot-scope="scope" slot="collectStatus">
          <gov-tool-tip :content="scope.row.reason" status="error" :tooltip="scope.row.collectStatus === '4'">
            <label>{{ collectStatusComputed(scope.row.collectStatus) }}</label>
          </gov-tool-tip>
          <!-- <div v-if="scope.row.collectStatus === '4'">
            <el-tooltip class="item" effect="dark" :content="scope.row.reason" placement="top">
              <label>{{ collectStatusComputed(scope.row.collectStatus) }}</label>
            </el-tooltip>
          </div>
          <div v-else>
            <label>{{ collectStatusComputed(scope.row.collectStatus) }}</label>
          </div> -->
        </template>
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button v-if="ele_collection_register_select" type="text" @click="handleDetail(scope.row)">详情</gov-button>
            <gov-button
              type="text"
              v-if="ele_collection_register_update && scope.row.collectStatus === '1'"
              @click="handleGenerate(scope.row)">
              生成归集
            </gov-button>
            <gov-button
              type="text"
              v-else-if="ele_collection_register_update && scope.row.collectStatus !== '2'"
              @click="handleReGenerate(scope.row)">
              重新归集
            </gov-button>
            <!-- <gov-button
              type="text"
              v-if="scope.row.collectStatus === '1'"
              @click="handleEditInfomation(scope.row.id)">
              修改信息资源
            </gov-button> -->
            <!-- <gov-button
              type="text"
              v-if="ele_collection_register_implemen && scope.row.collectStatus === '3'"
              @click="implementation(scope.row)">
              实施
            </gov-button> -->
            <!-- <gov-button
              type="text"
              v-if="scope.row.collectStatus === '5'"
              @click="reImplementation(scope.row)">
              重新实施
            </gov-button> -->
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      ref="mainDialog"
      :dialogOption="mainDialogOption"
      :formData="formData"
      @closed="handleClosed"
      @reGenerate="handleReGenerateSubmit"
      @generate="handleGenerateSubmit"
      ></main-dialog>
    <infomation-dialog
      ref="infomationDialog"></infomation-dialog>
  </gov-layout-main>
</template>

<script>
import _ from 'lodash'
import allMixin from '@/mixins/mixin'
import { searchOption, mainTableOption } from './const/index'
import mainDialog from './mainDialog'
import infomationDialog from './infomationDialog'
import {
  getMainTableData,
  reGenerate,
  generate,
  implementation,
  reImplementation,
  exportData,
} from '@/api/element/collectionRegister'
import {
  getDic,
} from '@/util/dic'
import { mapGetters } from 'vuex'
import GovToolTip from '@/components/govToolTip'
export default {
  mixins: [allMixin],
  components: { mainDialog, infomationDialog, GovToolTip },
  data () {
    return {
      mainTableData: [], // 主表数据
      mainDialogOption: {
        title: '编辑',
        state: 'edit',
      },
      formData: {},
      ele_collection_register_update: false,
      ele_collection_register_select: false,
      ele_collection_register_export: false,
      ele_collection_register_implemen: false,
    }
  },
  computed: {
    searchOption () {
      return searchOption // 搜索布局
    },
    mainTableOption () {
      return mainTableOption // 主表布局
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    // 获取主表数据
    getList () {
      this.tableLoading = true
      getMainTableData(this.listQuery).then( res =>{
        this.mainTableData = res.data.data.records
        this.pagination.total = res.data.data.total
        this.tableLoading = false
      })
    },
    collectStatusComputed (collectStatus) {
      let list = getDic('COLLECT_STATUS')
      let outText = ''
      list.forEach(item=>{
        if (item.value === collectStatus) {
          outText = item.label
        }
      })
      return outText
    },
    // 查看详情
    handleDetail (row) {
      this.mainDialogOption.title = '详情'
      this.mainDialogOption.state = 'detail'
      this.formData = _.cloneDeep(row)
      this.$refs['mainDialog'].open()
    },
    // 生成归集
    handleGenerate (row) {
      this.mainDialogOption.title = '生成归集'
      this.mainDialogOption.state = 'generate'
      let obj = _.cloneDeep(row)
      this.formData.id = obj.id
      this.formData.deptId = obj.deptId
      this.formData.buildType = obj.buildType
      this.formData.nameCn = obj.nameCn
      this.formData.dnaCollitems = obj.dnaCollitems
      this.$refs['mainDialog'].open()
    },
    // 重新生成归集
    handleReGenerate (row) {
      this.mainDialogOption.title = '重新生成归集'
      this.mainDialogOption.state = 'reGenerate'
      this.formData = _.cloneDeep(row)
      this.$refs['mainDialog'].open()
    },
    // 重新生成归集 提交
    handleReGenerateSubmit (formData) {
      this.$refs['mainDialog'].btnLoading = true
      reGenerate(formData).then(()=>{
        this.getList()
        this.$message.success('重新生成归集成功！')
        this.$refs['mainDialog'].btnLoading = false
        this.$refs['mainDialog'].close()
      }).catch((msg)=>{
        this.$message.error(`${msg},请前往目录注册修改！`)
        this.$refs['mainDialog'].btnLoading = false
        this.$refs['mainDialog'].close()
      })
    },
    // 生成归集 提交
    handleGenerateSubmit (formData) {
      this.$refs['mainDialog'].btnLoading = true
      generate(formData).then(()=>{
        this.$message.success('生成归集成功！')
        this.$refs['mainDialog'].btnLoading = false
        this.$refs['mainDialog'].close()
        this.getList()
      }).catch((msg)=>{
        this.$refs['mainDialog'].btnLoading = false
        this.$message.error(`${msg},请前往目录注册修改！`)
      })
    },
    // 实施
    implementation (row) {
      this.$confirm('您确定要实施么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        implementation(row.id).then(()=>{
          this.$message({
            type: 'success',
            message: '成功实施!',
          })
          this.getList()
        }).catch(()=>{})
      }).catch(()=>{})
    },
    // 重新实施
    reImplementation (row) {
      this.$confirm('您确定要重新实施么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        reImplementation(row.id).then(()=>{
          this.$message({
            type: 'success',
            message: '重新成功实施!',
          })
          this.getList()
        }).catch(()=>{})
      }).catch(()=>{})
    },
    // 导出
    handleExport () {
      this.$confirm('是否导出归集数据？', '提示', {
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
    handleClosed () {
      this.formData = {}
    },
    handleEditInfomation (id) {
      this.$refs['infomationDialog'].open(id)
    },
  },
  created () {
    this.getList()
    this.ele_collection_register_update = this.permissions['ele_collection_register_update']
    this.ele_collection_register_select = this.permissions['ele_collection_register_select']
    this.ele_collection_register_export = this.permissions['ele_collection_register_export']
    this.ele_collection_register_implemen = this.permissions['ele_collection_register_implemen']

  },
}
</script>
