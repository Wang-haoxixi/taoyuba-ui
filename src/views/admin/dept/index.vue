<template>
  <gov-layout-main>
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-button-group>
          <el-button type="primary" v-if="deptManager_btn_add" icon="el-icon-plus" @click="handlerAdd" class="btn-default">添加</el-button>
          <el-button type="primary" v-if="deptManager_btn_edit" @click="handlerEdit" class="btn-default">编辑</el-button>
          <el-button type="primary" v-if="deptManager_btn_del" @click="handleDelete" class="btn-default">删除</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="8" style="margin-top:15px;">
        <el-tree class="filter-tree"
          :data="treeData"
          node-key="id"
          highlight-current
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click="getNodeData"
          default-expand-all>
        </el-tree>
      </el-col>
      <el-col :span="16" style="margin-top:15px;">
        <el-card class="box-card">
          <el-form :label-position="labelPosition" label-width="120px" :model="form" ref="form" :rules="rules">
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentId" :disabled="true" placeholder="请输入父级节点"></el-input>
            </el-form-item>
            <el-form-item label="部门节点" prop="id">
              <el-input v-model="form.id" :disabled="true" placeholder="部门编号" maxlength=30></el-input>
            </el-form-item>
            <el-form-item label="部门编号" prop="number">
              <el-input v-model="form.number" :disabled="formEdit" placeholder="部门编号" maxlength=30></el-input>
            </el-form-item>
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="form.name" :disabled="formEdit" placeholder="请输入名称" maxlength=30 @blur="checkName"></el-input>
            </el-form-item>
            <el-form-item label="是否统筹部门" prop="type">
              <el-radio-group v-model="form.type" :disabled="formEdit">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="所属城市" prop="cityId">
              <el-input v-model="form.cityName" :disabled="formEdit" placeholder="选择城市" @focus="handleCity()" readonly></el-input>
              <input type="hidden" v-model="form.cityId" />
            </el-form-item>
            <el-form-item label="排序" prop="orderNum">
              <el-input v-model="form.orderNum" :disabled="formEdit" placeholder="请输入排序" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="update">更新</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogCityVisible">
      <el-tree class="filter-tree"
        :data="treeCityData"
        :default-checked-keys="checkedKeys"
        check-strictly
        node-key="id"
        highlight-current
        ref="deptTree"
        :props="defaultProps"
        @node-click="getNodeDataNew"
        default-expand-all>
      </el-tree>
    </el-dialog>
  </gov-layout-main>
</template>

<script>
import { getDeptTree, getDeptById, postDept, deleteDept, putDept, checkName } from '@/api/umps/dept'
import { getCityTree } from '@/api/umps/city'
import { mapGetters } from 'vuex'
export default {
  // name: 'menu',
  data () {
    // var Verification = (rule, value, callback) => {
    //   // console.log(value.indexOf(/(^\s*)|(\s*$)/g,1))
    //   var reg = /(^\s+)|(\s+$)/g
    //   if(reg.test(value)){
    //     callback(new Error("不能使用空格"))
    //   }
    //   if (!this.checkSpecificKey(value)) {
    //     callback(new Error("不能使用特殊字符"))
    //   } else{
    //     callback()
    //   }
    // }
    return {
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      dialogStatus: '',
      showElement: false,
      dialogCityVisible: false,
      typeOptions: ['0', '1'],
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      textMap: {
        update: '编辑',
        create: '创建',
      },
      listQuery: {
        name: undefined,
      },
      checkedKeys: [],
      treeCityData: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      labelPosition: 'right',
      form: {
        name: undefined,
        orderNum: undefined,
        parentId: undefined,
        id: undefined,
        type: undefined,
      },
      currentId: 0,
      deptManager_btn_add: false,
      deptManager_btn_edit: false,
      deptManager_btn_del: false,
      rules:{
        name:[
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          // {
          //   validator: Verification,
          //   trigger: ['blur','change'],
          // },
        ],
        type: [
          {
            required: true,
            message: '请选择',
            trigger: 'change',
          },
        ],
        cityId: [
          {
            required: true,
            message: '请选择所属城市',
            trigger: 'change',
          },
        ],
      },
      checkState: {
        state: true,
        const: '',
      },
    }
  },
  filters: {
    typeFilter (type) {
      const typeMap = {
        0: '菜单',
        1: '按钮',
      }
      return typeMap[type]
    },
  },
  created () {
    this.getList()
    this.deptManager_btn_add = this.permissions['sys_dept_add']
    this.deptManager_btn_edit = this.permissions['sys_dept_edit']
    this.deptManager_btn_del = this.permissions['sys_dept_del']
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    checkName () {
      if (this.form.name !== '' && this.checkState.const !== this.form.name) {
        checkName({
          name: this.form.name,
          parentId: this.form.parentId,
        }).then((res) => {
          this.checkState.state = res.data.data
          if (!this.checkState.state) {
            this.$message.error('相同父级部门下存在重复部门，请修改')
          }
        })
      } else if (this.form.name === '') {
        this.checkState.state = true
      }
    },
    getNodeDataNew (data) {
      this.dialogCityVisible = false
      this.form.cityId = data.id
      this.form.cityName = data.name
    },
    getList () {
      getDeptTree(this.listQuery).then(response => {
        this.treeData = response.data
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getNodeData (data) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      getDeptById(data.id).then(response => {
        this.form = response.data
        this.checkState.const = this.form.name
      })
      this.currentId = data.id
      this.showElement = true
    },
    handlerEdit () {
      if (this.form.id) {
        this.formEdit = false
        this.formStatus = 'update'
      }
    },
    handlerAdd () {
      this.resetForm()
      this.formEdit = false
      this.formStatus = 'create'
    },
    handleDelete () {
      let that = this
      let state = false
      let fn = function () {
        that.getList()
        that.resetForm()
        that.onCancel()
        that.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000,
        })
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 判断是否存在子级
        let checkChild = function (list) {
          for (let item of list) {
            if (item.id == that.currentId && item.children.length > 0) {
              that.$confirm('存在子级数据，此操作会导致子级数据全部删除，是否继续？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }).then(() => {
                deleteDept(that.currentId).then(() => {
                  fn()
                })
              })
              state = true
              return
            }
            checkChild(item.children)
          }
        }
        checkChild(this.treeData)
        if (!state) {
          deleteDept(that.currentId).then(() => {
            fn()
          })
        }
      })
    },
    handleCity () {
      getCityTree().then(response => {
        this.treeCityData = response.data
        this.dialogCityVisible = true
      })
    },
    update () {
      if (!this.checkState.state) {
        this.$message.error('相同父级部门下存在重复部门，请修改')
        return
      }
      putDept(this.form).then(() => {
        this.getList()
        this.$message.success('更新成功')
      })
    },
    create () {
      if (!this.checkState.state) {
        this.$message.error('相同父级部门下存在重复部门，请修改')
        return
      }
      postDept(this.form).then(() => {
        this.getList()
        this.$message.success('创建成功')
      })
    },
    onCancel () {
      this.formEdit = true
      this.formStatus = ''
    },
    resetForm () {
      this.checkState = {
        const: '',
        state: true,
      }
      this.form = {
        permission: undefined,
        name: undefined,
        menuId: undefined,
        parentId: this.currentId,
        url: undefined,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        method: undefined,
      }
    },
    // 校验
    checkSpecificKey (str) {
      var specialKey = "[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false
        }
      }
      return true
    },
  },
}
</script>
