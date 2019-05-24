<template>
  <gov-layout-main>
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-button-group>
          <el-button v-if="sys_city_add" type="primary" icon="el-icon-plus" @click="handlerAdd" class="btn-default">添加</el-button>
          <el-button v-if="sys_city_edit" type="primary" @click="handlerEdit" class="btn-default">编辑</el-button>
          <el-button v-if="sys_city_del" type="primary" @click="handleDelete" class="btn-default">删除</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="8" style='margin-top:15px;'>
        <el-tree class="filter-tree" :data="treeData" node-key="id" highlight-current :props="defaultProps" :filter-node-method="filterNode" @node-click="getNodeData" default-expand-all>
        </el-tree>
      </el-col>
      <el-col :span="16" style='margin-top:15px;'>
        <el-card class="box-card">
          <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentId" :disabled="formEdit" placeholder="请输入父级节点"></el-input>
            </el-form-item>
            <el-form-item label="节点编号" prop="id" v-if="formEdit">
              <el-input v-model="form.id" :disabled="formEdit" placeholder="节点编号"></el-input>
            </el-form-item>
            <el-form-item label="城市代码" prop="cityCode">
              <el-input v-model="form.cityCode" :disabled="formEdit" placeholder="请输入城市代码" maxlength=100></el-input>
            </el-form-item>
            <el-form-item label="城市编号" prop="number">
              <el-input v-model="form.number" :disabled="formEdit" placeholder="请输入城市编号" maxlength=100></el-input>
            </el-form-item>
            <el-form-item label="城市名称" prop="name">
              <el-input @blur="handleBlur" v-model="form.name" :disabled="formEdit" placeholder="请输入城市名称" maxlength=100></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="orderNum">
              <el-input v-model="form.orderNum" :disabled="formEdit" placeholder="请输入排序" maxlength=10></el-input>
            </el-form-item>
            <el-form-item label="城市级别" prop="cityLevel">
              <el-select v-model="form.cityLevel" :disabled="formEdit" placeholder="请选择城市级别">
                <el-option v-for="item in cityLevelOptions" :key="item.key" :label="item.value" :value="item.key">
                </el-option>
              </el-select>
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
  </gov-layout-main>
</template>

<script>
import { getCityTree, getCityById, postCity, deleteCity, putCity, checkCity } from '@/api/umps/city'
import { getDictListByNumber } from '@/api/umps/dict'
import { mapGetters } from 'vuex'
export default {
  // name: 'menu',
  data () {
    return {
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['0', '1'],
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      cityLevelOptions: [],
      listQuery: {
        name: undefined,
      },
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
        key: undefined,
      },
      currentId: 0,
      sys_city_add: false,
      sys_city_del: false,
      sys_city_edit: false,
      oldName: '',
      oldNameStatus: false,
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
    getDictListByNumber('CITYLEVEL').then(res => {
      this.cityLevelOptions = res.data
    })
    this.sys_city_add = this.permissions['sys_city_add']
    this.sys_city_del = this.permissions['sys_city_del']
    this.sys_city_edit = this.permissions['sys_city_edit']
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    handleBlur () {
      if (this.form.name === '') {
        return
      }
      if (!this.form.id) {
        checkCity({name: this.form.name}).then(({data}) => {
          if (!data.data) {
            this.warning()
            this.oldNameStatus = true
          }  else {
            this.oldNameStatus = false
          }   
        })
      } else {
        if (this.oldName !== this.form.name) {
          checkCity({name: this.form.name}).then(({data}) => {
            if (!data.data) {
              this.warning()
              this.oldNameStatus = true
            } else {
              this.oldNameStatus = false
            }   
          })
        }
      }
    },
    warning () {
      this.$message({
        showClose: true,
        message: '城市名称重复',
        type: 'warning',
        duration: 1500,
      })
    },
    getList () {
      getCityTree(this.listQuery).then(response => {
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
      getCityById(data.id).then(response => {
        this.form = response.data
        this.oldName = this.form.name
      })
      this.currentId = data.id
      this.showElement = true
    },
    handlerEdit () {
      if (this.form.id) {
        this.formEdit = false
        this.formStatus = 'update'
        this.oldNameStatus = false
      }
    },
    handlerAdd () {
      this.resetForm()
      this.formEdit = false
      this.formStatus = 'create'
      this.oldName = ''
      this.oldNameStatus = false 
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
                deleteCity(that.currentId).then(() => {
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
          deleteCity(this.currentId).then(() => {
            fn()
          })
        }
      })
    },
    update () {
      if (this.oldNameStatus) {
        this.warning()
        return
      }
      putCity(this.form).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000,
        })
        this.oldName = ''
      })
    },
    create () {
      if (this.oldNameStatus) {
        this.warning()
        return
      }
      postCity(this.form).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000,
        })
        this.oldName = ''
      })
    },
    onCancel () {
      this.formEdit = true
      this.formStatus = ''
    },
    resetForm () {
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
  },
}
</script>
