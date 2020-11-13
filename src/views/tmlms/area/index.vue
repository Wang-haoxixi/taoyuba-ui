<template>
  <basic-container>
    <!-- 区域设置 -->
    <page-header title="区域设置"></page-header>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
      </template>
    </operation-container>
    <avue-tree-table :option="option">
      <el-table-column
        prop="orgIds"
        label="包含区域">
        <template slot-scope="scope">
          <span>{{getOrgIdsLabel(scope.row.orgIds)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" fixed="right" width="200">
          <el-button type="text" icon="el-icon-plus" size="mini" @click="handleAreaChile(scope.row, scope.index)">添加子区域
          </el-button>
          <el-button type="text" icon="el-icon-check" size="mini" @click="handleEdit(scope.row, scope.index)">编辑
          </el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row, scope.index)">删除
          </el-button>
        </template>
      </el-table-column>
    </avue-tree-table>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" :current-page.sync="params.current" @current-change="currentChange"></el-pagination>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="close">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="区域名称" prop="orgRelationName">
          <el-input v-model="form.orgRelationName"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" prop="ids">
          <el-select v-model="form.ids" multiple>
            <el-option v-for="item in orgList" :key="item.orgId" :label="item.name" :value="item.orgId + ''">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>
<script>
import { mapState } from 'vuex'
const initForm = () => {
  return {
    id: '',
    parentId: '',
    orgRelationName: '',
    orgIds: '',
    ids: [],
  }
}
import { getPage, createPage, updatePage, removePage } from '@/api/tmlms/area'
export default {
  data () {
    return {
      pagedTable: [],
      params: {
        current: 1,
        size: 10,
      },
      total: 0,
      dialogVisible: false,
      status: 'create',
      form: initForm(),
      rules: {
        ids: [{ required: true, message: '请选择区域', trigger: 'change' }],
        orgRelationName: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapState({
      orgList: state => state.user.orgs,
    }),
    title () {
      if (this.status === 'create') {
        return '新增'
      } else if (this.status === 'update') {
        return '编辑'
      } else if (this.status === 'createChild') {
        return '新增子区域'
      }
      return '详情'
    },
    option () {
      return {
        expandAll: false,
        data: this.pagedTable,
        columns: [
          { text: '区域名称', value: 'orgRelationName' },
        ],
      }
    },
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getPage(this.params).then(({ data }) => {
        if (data.code === 0) {
          let result = data.data.records
          result.forEach(item => {
            let arr = []
            if (item.orgIds) {
              arr = item.orgIds.split(',')
            }
            item.ids = arr
          })
          this.pagedTable = result
          this.total = data.data.total
        }
      })
    },
    getOrgIdsLabel (ids = '') {
      let orgIds = ids.split(',')
      let arr = []
      for (let i = 0 , len = orgIds.length; i < len; i++) {
        let val = this.orgList.find(item => {
          return item.orgId == orgIds[i]
        })
        if (val) {
          arr.push(val.name)
        }
      }
      return arr.join('，')
    },
    close () {
      this.$refs['form'].resetFields()
      this.form = initForm()
      this.dialogVisible = false
    },
    handleAdd () {
      this.status = 'create'
      this.form.parentId = 0
      this.dialogVisible = true
    },
    handleEdit (row) {
      this.status = 'update'
      this.form = row
      this.dialogVisible = true
    },
    handleDel (row) {
      this.$confirm('是否确认删除此条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        removePage(row.id).then(({ data }) => {
          if (data.code === 0) {
            this.$notify({
              message: '删除成功',
              type: 'success',
            })
            this.params.current = 1
            this.getList()
          }
        })
      })
    },
    handleAreaChile (row) {
      this.status = 'createChild'
      this.form.parentId = row.id
      this.dialogVisible = true
    },
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let api = (this.status === 'create' || this.status === 'createChild') ? createPage : updatePage
          this.form.orgIds = this.form.ids.join(',')
          api(this.form).then(({ data }) => {
            if (data.code === 0) {
              this.$notify({
                message: (this.status === 'create' || this.status === 'createChild') ? '新增成功' : '编辑成功',
                type: 'success',
              })
            } else {
              this.$notify({
                message: data.msg || ((this.status === 'create' || this.status === 'createChild') ? '新增失败' : '编辑失败'),
                type: 'warning',
              })
            }
            this.close()
            this.params.current = 1
            this.getList()
          })
        }
      })
    },
    currentChange (current) {
      this.params.current = current
      this.getContractList()
    },
  },
}
</script>
<style scoped lang="scss">

</style>