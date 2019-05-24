<template>
   <gov-layout-main>
    <gov-layout-header>
      <el-row>
        <template v-for="(item,index) in titleData">
          <div class="block_div" :key="index">
            <div class="img_div">
              <img :src="imgUrl[index]" class="image">
            </div>  
            <div class="tj_div">
              <span>{{titleName[index]}}</span>
              <br>
              <span class="num_span">{{item}}</span>个
            </div>
          </div>
        </template>
      </el-row>  
      <gov-search-bar
        @handleFilter="handleTreeFilter"
        :listQuery="listQuery"
        :formProps="formProps"/>
    </gov-layout-header>
    <gov-layout-body>
      <gov-table-tree
      :data="tableTreeData"
      @handleDetail="handleDetail"
      @handleUpdate="handleUpdate"
      @handleDelete="handleDelete"
      @handleAddSon="handleAddSon"
      @sizeChangeHandle="sizeChangeHandle"
      @currentChangeHandle="currentChangeHandle"
      @setData="getChild"
      :option="tableTree">
      <template slot-scope="scope" slot="sex">
        <el-tag>{{scope.data.sexForShow}}</el-tag>
      </template>
      </gov-table-tree>
    </gov-layout-body>
    <!-- 弹窗 -->
    <project-dialog
      :status="dialogStatus"
      @closed="handleClosed"
      @createSubmit="handleCreateSubmit"
      @editSubmit="handleEditSubmit"
      ref="formDialog"/> 
    <!-- 详情弹窗 -->
    <details-dialog
    :status="dialogStatus"
    ref="detailsDialog"
    @closed="handleClosed"
    />
   </gov-layout-main>
</template>
<script>
import { getDic, getDept } from '@/util/dic'
import mixin from "@/mixins/mixin"
import treeTableMixin from "@/mixins/treeTableMixin"
import { getFormProps, getProjectListPage, createProject, getTableProps, updateProject, deleteProject, selectProjectTitle} from '@/api/projectManagement/projectList'
import govTableTree from '@/components/govTableTree/index'
import img1 from './pic/xm.png'
import img2 from './pic/lcb.png'
import img3 from './pic/rw.png'
import img4 from './pic/zb.png'
import projectDialog from './projectDialog'
import detailsDialog from './detailsDialog'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixin,treeTableMixin],
  components: {projectDialog, govTableTree,detailsDialog},
  data () {
    return {
      dnaProjectAdd: false,
      dnaProjectUpdate: false,
      dnaProjectDelete: false,
      imgUrl: [img1,img2,img3,img4],
      titleName: ['项目数','里程碑数','任务数','周报数'],
      titleData: [],
      queryData: [],
      tableTreeData: [],
      test: '666',
      tableTree: {
        tree: {
          isLazyLoading: true,
          url: '/api/proj/dnaproject/getListById',
        },
        isSelection: false,
        isIndex: true,
        setDataCallback: function (data) {
          data = data.map( item => Object.assign(item,JSON.parse(item.dataJson)))
          return data
        },
        props: [
          {label: 'id', prop: 'id', width: '100px', treeKey: true},
        ],
        operation: {
          props: [
            { label: '新增子项', fn: 'handleAddSon', permission: '', 
              callback: function () {
                return false
              },
            },
            { label: '详情', fn: 'handleDetail', show: true, permission: '' },
            { label: '编辑', fn: 'handleUpdate', show: false, permission: '' },
            { label: '删除', fn: 'handleDelete', show: false, permission: '' },
          ],
        },
        // 分页
        pagination: {
          show: true,
          total: 0,
          currentPage: 1,
          pageSize: 10,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
        },
        loading: false,
      },
    }    
  },
  watch: {
    'dnaProjectAdd': {
      handler (val) {
        if (val) {
          this.tableTree.operation.props[0] = { label: '新增子项', fn: 'handleAddSon', permission: '', 
            callback: function (row) {
              if (row.parentId) {
                return false
              } else {
                return true
              }
            },
          }
        }
      },
    },
    'dnaProjectUpdate': {
      handler (val) {
        if (val) {
          this.tableTree.operation.props[2] = { label: '编辑', fn: 'handleUpdate', permission: '', show: true}
        }
      },    
    },
    'dnaProjectDelete': {
      handler (val) {
        if (val) {
          this.tableTree.operation.props[3] = { label: '删除', fn: 'handleDelete', permission: '', show: true}
        }
      },
    },
  },
  created () {
    this.dnaProjectAdd = this.permissions['dna_project_add']
    this.dnaProjectUpdate = this.permissions['dna_project_update']
    this.dnaProjectDelete = this.permissions['dna_project_delete']
    this.getTableProps()
    this.getFormProps()
    this.getProjectTitle()
  },
  computed: {
    // 查询字段
    formProps () {
      return this.queryData
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    // 列表搜索
    handleTreeFilter () {
      for (let key in this.listQuery) {
        if (this.listQuery[key] === '' || this.listQuery[key] === null) {
          this.listQuery[key] = undefined
        }
      }
      this.tableTree.pagination.currentPage = 1
      setTimeout(() => {
        this.getList()
      }, 10)
    },
    //头部的统计
    getProjectTitle () {
      selectProjectTitle().then(({data}) => {
        this.titleData = data
      })
    },
    getChild (data) {
      console.log(data)
    },
    //获取查询字段
    getFormProps () {
      getFormProps().then(({data})=>{        
        data.forEach((item) => {
          if (item.data && item.type != 'tree') {
            if (item.data == 'getDept()') {
              item.data = getDept()
            } else if (item.inputType == 3) {
              item.data = JSON.parse(item.data)
            } else {
              item.data = getDic(item.data)
            }  
          }
          if (item.data && item.type === 'tree') {
            item.data = JSON.parse(item.data)
          }
        })
        this.queryData = data
      })
    },
    //获取显示表字段
    getTableProps () {
      getTableProps().then(({data})=>{
        data.forEach((item) => {
          if (item.dicData == 'getDept()') {
            item.dicData = getDept()
          } else {
            item.dicData = getDic(item.dicData)
          }  
          this.tableTree.props.push(item)
        })
        this.getList()
      })
    },
    //列表
    getList () {
      this.tableTree.loading = true
      this.listQuery.sign = '3'
      getProjectListPage(this.listQuery).then(({data})=>{
        this.tableTreeData = data.data.records.map( item => Object.assign(item,JSON.parse(item.dataJson)))
        this.tableTree.pagination.total = data.data.total
        this.tableTree.loading = false
      })
    },
    //打开新增页面
    handleAddModel () {
      this.dialogStatus = "create"
      this.$refs.formDialog.openDialog()
    },
    //新增
    handleCreateSubmit (formData) {
      var data = {}
      if (formData.parentId) {
        var parentId = formData.parentId
        delete formData.parentId
        data = {dataJson:JSON.stringify(formData)}
        data.parentId = parentId
      } else {
        data = {dataJson:JSON.stringify(formData)}
      }
      createProject(data).then(({data})=>{
        if (data.code == 1) {
          this.$message.error(data.msg)
        } else {
          this.$message.success('新增成功')
          this.$refs['formDialog'].close()
          this.getList()
        }
      })
    },
    //编辑
    handleUpdate (data) {
      let formData= JSON.parse(data.dataJson)
      formData.id = data.id
      formData.parentId = data.parentId
      this.dialogStatus = "update"
      this.$refs.formDialog.openDialog(formData)
    },
    //保存编辑
    handleEditSubmit (formData) {
      let obj = Object.assign({},formData) 
      let id = obj.id
      let parentId = obj.parentId
      delete obj.id
      delete obj.parentId
      var data = {dataJson:JSON.stringify(obj)}
      data.id = id
      data.parentId = parentId
      updateProject(data).then(({data})=>{
        if (data.code == 1) {
          this.$message.error(data.msg)
        } else {
          this.$message.success('修改成功')
          this.$refs['formDialog'].close()
          this.getList()
        }
      })
    },
    //删除
    handleDelete (row) {
      this.$confirm('确定要删除吗').then(() => {
        let item = []
        item.push(row.id)
        deleteProject({ids : item}).then((response) => {
          let res = response.data
          if (res.code === 0) {
            this.successNotify(this.DELETE)
            this.tableTree.pagination.total --
          }
        })
      }).catch(() => {})
    },
    //新增子项目
    handleAddSon (row) {
      let formData = {}
      formData.parentId = row.id
      this.dialogStatus = "create"
      this.$refs.formDialog.openDialog(formData)
    },
    // 详情
    handleDetail (row){
      this.dialogStatus = "detail"
      this.$refs['detailsDialog'].openDialog(row)
    },
    // 每页条数改变时会触发
    sizeChangeHandle (val) {
      this.tableTree.pagination.pageSize = val
      this.getList()
    },
    // 当前页改变时会触发
    currentChangeHandle (val) {
      this.tableTree.pagination.currentPage = val
      this.getList()
    },
  },
}
</script>

<style>
.block_div {
  width: 25%;
  float: left;
}

.image {
  width: 40px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.tj_div {
  padding-top: 10px;
  padding-left: 10px;
  color: #999;
}

.tj_div span.num_span {
  color: #444;
  font-weight: normal;
}

.img_div {
  width: 110px;
  float: left;
  padding-left: 10px;
  padding-top: 10px;
}

.el-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-bottom: 20px;
}
</style>
