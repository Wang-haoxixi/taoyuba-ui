<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
        @handleFilter="handleFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
        <!-- 按钮组 -->
        <gov-button-group>
          <gov-button type="add" @click="handleCreate" v-if="dnaProjectKnowAdd"/>
        </gov-button-group>
    </gov-layout-header>
    <!-- 列表 -->
    <gov-layout-body>
      <avue-crud
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        :data="tableList"
        :option="tableProps">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button type="text" @click="handleDetail(scope.row)" text="详情"></gov-button>
            <gov-button type="text" @click="handleUpdate(scope.row)" text="编辑" v-if="dnaProjectKnowUpdate"></gov-button>
            <gov-button type="text" @click="handleDelete(scope.row)" text="删除" v-if="dnaProjectKnowDelete"></gov-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>
    <main-dialog
      :status="dialogStatus"
      :projectList="projectSelect"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="mainDialog"/>  
  </gov-layout-main>    
</template>

<script>
import { getDic } from '@/util/dic'
import mixin from '@/mixins/mixin'
import { getProjectSelect } from '@/api/projectManagement/projectMilestone'
import { getPage, addKnowledge, updateKnowledge, deleteKnowledge, increasePageviews } from '@/api/projectManagement/projectKnowledgeBase'
import MainDialog from './mainDialog'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {MainDialog},
  data () {
    return {
      projectSelect: [],
      dnaProjectKnowAdd: false,
      dnaProjectKnowUpdate: false,
      dnaProjectKnowDelete: false,
    }
  },
  created () {
    this.getProjectSelect()
    this.getList()
    this.dnaProjectKnowAdd = this.permissions['dna_project_know_add']
    this.dnaProjectKnowUpdate = this.permissions['dna_project_know_update']
    this.dnaProjectKnowDelete = this.permissions['dna_project_know_delete']
  },
  computed: {
    formProps () {
      return [
        {
          label: "所属项目",
          prop: "dependentProjectId",
          type: "select",
          data: this.projectSelect,
        }, {
          label: "知识类型",
          prop: "knowledgeCategory",
          type: "select",
          data: getDic('PROJECT_KNOWLEDGE_TYPE'),
        }, {
          label: "知识文档名称",
          prop: "docTitle",
        },
      ]
    },
    tableProps () {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
        header: false,
        index: true,
        menuWidth: '180px',
        column: [
          {label:'文档名称', prop:'docTitle'},
          {label:'所属项目', prop:'dependentProjectId', type: 'dic', dicData: this.projectSelect},
          {label:'知识类型', prop:'knowledgeCategory', type: 'dic', dicData: this.getDic('PROJECT_KNOWLEDGE_TYPE')},
        ],
      }
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    //分页
    getList () {
      this.tableLoading = true
      getPage(this.listQuery).then(({data}) => {
        this.tableList = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    //项目列表下拉
    getProjectSelect () {
      getProjectSelect().then(({data}) => {
        this.projectSelect = data
      })
    },
    //详情
    handleDetail (row) {
      this.dialogStatus = "detail"
      increasePageviews({id: row.id}).then(({data}) => {
        this.$refs.mainDialog.openDialog(data)
      })
    },
    //打开新增页面
    handleCreate () {
      this.dialogStatus = "create"
      this.$refs.mainDialog.openDialog()
    },
    //新增
    handleCreateSubmit (formData) {
      addKnowledge(formData).then(({data}) => {
        if (data.code == 1) {
          this.$message.error(data.msg)
        } else {
          this.getList()
          this.handleClosed()
          this.$message.success('新增成功')
        }
      })
    },
    //打开修改弹窗
    handleUpdate (row) {
      this.dialogStatus = "update"
      this.$refs.mainDialog.openDialog(row)
    },
    //修改
    handleEditSubmit (formData) {
      updateKnowledge(formData).then(({data}) => {
        if (data.code == 1) {
          this.$message.error(data.msg)
        } else {
          this.getList()
          this.handleClosed()
          this.$message.success('编辑成功')
        }
      })
    },
    //关闭
    handleClosed () {
      this.$refs['mainDialog'].closeDialog()
    },
    //删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        let item = []
        item.push(row.id)
        deleteKnowledge({ids : item}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.successNotify(this.DELETE)
            this.getList()
          }
        })
      }).catch(() => {})
    },
  },

}
</script>

<style scoped>

</style>
