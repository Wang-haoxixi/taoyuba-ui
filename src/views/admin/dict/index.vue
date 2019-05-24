<template>
  <gov-layout-main>
    <gov-layout-header>
      <gov-search-bar
      :listQuery="listQuery"
      :formProps="searchOption"
      @handleFilter="handleFilter">
      </gov-search-bar>
      <gov-layout-button-group>
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-button type="primary" v-if="permissions['sys_dict_add']" @click="handleCreate" icon="el-icon-plus" class="btn-default">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-dropdown @command="handleImport">
              <el-button class="btn-default">
                Excel导入<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="dict_import"> <i class="el-icon-caret-right"></i>Excel导入字典</el-dropdown-item>
                <el-dropdown-item command="dict_value_import"> <i class="el-icon-caret-right"></i>Excel导入字典值</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item>
            <el-dropdown @command="handleExport">
              <el-button  class="btn-default">
                导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="dict_export"> <i class="el-icon-caret-right"></i>导出字典</el-dropdown-item>
                <el-dropdown-item command="dict_value_export"> <i class="el-icon-caret-right"></i>导出字典值</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-form>
      </gov-layout-button-group>
    </gov-layout-header>

    <gov-layout-body>
      <avue-crud
        :data="pagedTable"
        :option="formOption"
        :table-loading="tableLoading"
        @size-change="sizeChange"
        @current-change="currentChange"
        :page="pagination"
        @refresh-change="getList">
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <el-button v-if="permissions['sys_dict_edit']" size="small" type="text" @click="handleUpdate(scope.row);">编辑
            </el-button>
            <el-button v-if="permissions['sys_dict_del']" size="mini" type="text" @click="handleDelete(scope.row);">删除
            </el-button>
          </div>
        </template>
      </avue-crud>
    </gov-layout-body>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%" @close="dialogClose">
      <el-form :model="form" ref="form" label-width="100px" :rules='rules'>
        <el-form-item label="字典编码" prop="number">
          <el-input v-model="form.number" placeholder="字典编码" ></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="form.name" placeholder="字典名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button v-if="dialogStatus !== 'create'" @click="handleAddDictChild()" size="small">新增</el-button>
      <el-table v-if="dialogStatus !== 'create'" :data="tableData" style="width: 100%" size="mini" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand" v-for="(item, index) in props.row.dictValueList" :key="index">
              <el-form-item label="字典键" class="Dictionaries">
                <span>{{ item.key }}</span>
              </el-form-item>
              <el-form-item label="字典值">
                <span>{{ item.value }}</span>
              </el-form-item>
              <el-form-item class="operationStyle" label="">
                <el-button @click="addChildDict(item, true)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteChildDict(item)" type="text" size="small">删除</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="key" label="字典键">
        </el-table-column>
        <el-table-column prop="value" label="字典值">
        </el-table-column>
        <el-table-column prop="sort" label="排序优先值">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="addChildDict(scope.row)" type="text" size="small">添加子字典</el-button>
            <el-button @click="addChildDict(scope.row, true)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteChildDict(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form');">取 消</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="create('form');">确 定</el-button>
        <el-button v-else type="primary" @click="update('form');">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="字典" :visible.sync="dialogFormChildVisible" width="50%" :before-close="handleClose">
      <el-form :model="childform" ref="childform" label-width="100px" :rules='rules'>
        <el-form-item label="字典键" prop="key">
          <el-input v-model="childform.key" placeholder="字典键" maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="字典值" prop="value">
          <el-input v-model="childform.value" placeholder="字典值" maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="排序优先值" prop="sort">
          <el-input v-model="childform.sort" placeholder="排序优先值" type="number" maxlength='20'></el-input>
        </el-form-item>
        <el-form-item label="">
          <gov-button type="primary" @click="saveChildDict(childform)" :loading="loading">保存</gov-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <form-dialog :dialogShow="importDialogShow" :title="importTypeName" @close="importDialogShow=false" width="500px" :isNeedConfirm="false">
      <dict-import :importUrl="importUrl" @close="handleCloseImport"></dict-import>
    </form-dialog>
  </gov-layout-main>
</template>

<script>

import { getDictList, postDict, putDict, deleteDict, getDictById, getDictChildById, postDictChild, getDictChildByMid, putDictChild, deleteChildDictById, getDictExcelExportByType } from '@/api/umps/dict'
import waves from '@/directive/waves/index.js' // 水波纹指令
import mixin from '@/mixins/mixin'
import dialogMixins from '@/mixins/dialog_mixins'
import { mapGetters } from 'vuex'
import dictImport from './dict_import'
import { formOption, dataConfig, searchOption } from './const/index'


export default {
  components: { dictImport },
  mixins: [mixin, dialogMixins],
  name: 'table_sys_dict',
  directives: {
    waves,
  },
  data () {
    return {
      ...dataConfig,
      formOption,
      searchOption,
      pagedTable:[],
      formInline: {},
      form: {},
      childform: {},
      tableData: [],
    }
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getDictList(this.listQuery).then(({data}) => {
        this.pagination.total = data.total
        this.pagedTable = data.records
        this.tableLoading = false
      })
    },
    handleCloseImport (res) {
      this.importDialogShow = false
      this.getList()
      if (res.data) {
        this.$message({
          message: `成功!${res.msg}`,
          type: 'success',
        })
      } else {
        this.$message({
          message: `警告!${res.msg}`,
          type: 'warning',
        })
      }
    },
    handleExport (functionName = 'dict_export') {
      getDictExcelExportByType(functionName)
    },
    handleImport (functionName = 'dict_import') {
      const typeMap = {
        'dict_import': '导入字典',
        'dict_value_import': '导入字典值',
      }
      this.importUrl = functionName
      this.importTypeName = typeMap[functionName]
      this.importDialogShow = true
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(()=>{
            deleteDict(row).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000,
            })
          })
        }).catch(()=>{})
    },
    handleUpdate (row) {
      this.dialogStatus = 'update'
      getDictById(row.id).then(res => {
        this.form = res.data
        this.dialogFormVisible = true
      })
      getDictChildById(row.id).then(res => {
        this.tableData = res.data
      })
    },
    handleCreate () {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleAddDictChild () {
      this.dialogFormChildVisible = true
    },
    // 点击保存时的验证
    saveChildDict (row) {
      this.$refs['childform'].validate((valid) => {
        this.loading = true
        // console.log('验证开始')
        if (valid) {
      //     console.log(valid)
          if (!row.id) {
            row.dictId = this.form.id
            postDictChild(row).then(() => {
              getDictChildById(this.form.id).then(res => {
                this.tableData = res.data
                this.childform = {}
                this.dialogFormChildVisible = false
                this.loading = false
              })
            })
          } else {
            putDictChild(row).then(() => {
              getDictChildById(this.form.id).then(res => {
                this.tableData = res.data
                this.childform = {}
                this.dialogFormChildVisible = false
                this.loading = false
              })
            })
          }
        } else {
      // //     console.log(valid)
      //     console.log("执行else")
          this.loading = false
          return false
        }
      })
    },
    addChildDict (row, isEdit = false) {
      if (isEdit) {
        getDictChildByMid(row.id).then(res => {
          this.childform = res.data
          this.dialogFormChildVisible = true
        })
      } else {
        this.childform = {}
        this.childform.parentId = row.id
        this.dialogFormChildVisible = true
      }
    },
    deleteChildDict (row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(()=>{
          deleteChildDictById(row).then(() => {
            getDictChildById(this.form.id).then(res => {
              this.tableData = res.data
              this.dialogFormChildVisible = false
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000,
              })
              this.$store.dispatch('GetDicList')
            })
          })
        })

    },
    create () {
      // const set = this.$refs
      // set[formName].validate(valid => {
      //   if (valid) {
          postDict(this.form).then((res) => {
            console.log(res)
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000,
            })
            this.$store.dispatch('GetDicList')
          })
        // } else {
          // return false
        // }
      // })
    },
    cancel (formName) {
      this.dialogFormVisible = false
      const set = this.$refs
      set[formName].resetFields()
      console.log(formName)
      this.form = {}
    },
    // 点击外部关闭
    dialogClose (){
      this.dialogFormVisible = false
      this.$refs["form"].resetFields()
      this.form = {}
    },
    handleClose (){
      this.loading = false
      this.dialogFormChildVisible = false
      this.$refs["childform"].resetFields()
      this.childform = {}
    },
    update (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.form.password = undefined
          putDict(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000,
            })
            this.$store.dispatch('GetDicList')
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.app-container /deep/ .el-table__expanded-cell {
  padding: 10px 0;
  padding-left: 58px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
.operationStyle{
  text-align: center;
}
.Dictionaries{
  padding-left: 20px;
}
</style>
