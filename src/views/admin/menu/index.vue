<template>
  <gov-layout-main>
    <el-form :inline="true" size="small">
      <el-form-item>
        <el-button-group>
          <el-button v-if="menuManager_btn_add" type="primary" icon="el-icon-plus" @click="handlerAdd();" class="btn-default">新增</el-button>
          <el-button v-if="menuManager_btn_edit" icon="el-icon-edit" @click="handlerEdit();" class="btn-default">编辑</el-button>
          <el-button v-if="menuManager_btn_del" icon="el-icon-delete" @click="handleDelete();" class="btn-default">删除</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="8" style="margin-top:15px;">
        <el-tree class="filter-tree" node-key="id" highlight-current :data="treeData" :default-expanded-keys="aExpandedKeys" :filter-node-method="filterNode" :props="defaultProps" @node-click="getNodeData" @node-expand="nodeExpand" @node-collapse="nodeCollapse">
        </el-tree>
      </el-col>
      <el-col :span="16" style="margin-top:15px;">
        <el-card class="box-card">
          <el-form :label-position="labelPosition" :rules="rules" label-width="120px" :model="form" ref="form">
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentId" :disabled="formEdit" placeholder="请输入父级节点" v-show="false"></el-input>
              <el-input v-model.trim="form.parentName" :disabled="true" placeholder="无"></el-input>
            </el-form-item>
            <el-form-item label="节点ID" prop="id">
              <el-input type="number" v-model.trim.number="form.id" :disabled="formEdit" placeholder="请输入节点ID" maxlength=5 @blur="checkId"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="name">
              <el-input v-model.trim="form.name" :disabled="formEdit" placeholder="请输入标题" maxlength=30 @blur="checkName"></el-input>
            </el-form-item>
            <el-form-item label="辅助标题" prop="title">
              <el-input v-model.trim="form.title" :disabled="formEdit" placeholder="请输入辅助标题" maxlength=100></el-input>
            </el-form-item>
            <el-form-item label="权限标识" prop="permission">
              <el-input v-model.trim="form.permission" :disabled="formEdit" placeholder="请输入权限标识" maxlength=30></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <el-input v-model.trim="form.icon" :disabled="formEdit" placeholder="请输入图标" maxlength=30></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select class="filter-item" v-model="form.type" :disabled="formEdit" placeholder="请输入资源请求类型">
                <el-option v-for="item in typeOptions" :key="item" :label="item | typeFilter" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model.trim="form.sort" :disabled="formEdit" placeholder="请输入排序" maxlength=10></el-input>
            </el-form-item>
            <el-form-item label="前端组件" prop="component">
              <el-input v-model.trim="form.component" :disabled="formEdit" placeholder="请输入描述" maxlength=50></el-input>
            </el-form-item>
            <el-form-item label="前端地址" prop="component">
              <el-input v-model.trim="form.path" :disabled="formEdit" placeholder="iframe嵌套地址" maxlength=100></el-input>
            </el-form-item>
            <el-form-item label="是否外链">
              <el-radio-group v-model="form.isLink" :disabled="formEdit">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否显示">
              <el-radio-group v-model="form.isShow" :disabled="formEdit">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否弹出窗口">
              <el-radio-group v-model="form.isBlank" :disabled="formEdit">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="重定向地址" prop="redirectUrl">
              <el-input v-model.trim="form.redirectUrl" :disabled="formEdit" placeholder="请输入重定向地址" maxlength=100></el-input>
            </el-form-item>
            <el-form-item label="系统类型" prop="systemType">
              <el-select class="filter-item" v-model="form.systemType" :disabled="formEdit" placeholder="请输入系统类型">
                <el-option v-for="item in getDic('SYSTEM_TYPE')" :key="item" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input
                :disabled="formEdit"
                type="textarea"
                :rows="2"
                placeholder=""
                v-model.trim="form.describe"
                maxlength=50>
              </el-input>
            </el-form-item>
            <el-form-item v-if="formStatus === 'update'">
              <el-button type="primary" @click="update">更新</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus === 'create'">
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
import { addObj, delObj, fetchTree, getObj, putObj, VerificationAddObj, checkId } from '@/api/umps/menu'
import { mapGetters } from 'vuex'
import { getDic } from '@/util/dic'
import { initMenu } from '@/util/util'

export default {
  // name: 'menu',
  data () {
    var Verification = (rule, value, callback) => {
      // console.log(value.indexOf(/(^\s*)|(\s*$)/g,1))
      var reg = /(^\s+)|(\s+$)/g
      if(reg.test(value)){
        callback(new Error("不能使用空格"))
      }
      if (!this.checkSpecificKey(value)) {
        callback(new Error("不能使用特殊字符"))
      }else{
        callback()
      }
    }
    return {
      getDic: getDic,
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['0', '1'],
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      listQuery: {
        name: undefined,
      },
      treeData: [],
      oExpandedKey: {
        // key (from tree id) : expandedOrNot boolean
      },
      oTreeNodeChildren: {
        // id1 : [children] (from tree node id1)
        // id2 : [children] (from tree node id2)
      },
      aExpandedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      labelPosition: 'right',
      form: {
        permission: undefined,
        name: undefined,
        title: undefined,
        id: undefined,
        parentId: this.currentId,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined,
        isLink: undefined,
        isShow: undefined,
        isBlank: undefined,
        redirectUrl: undefined,
        describe: undefined,
        systemType: undefined,
      },
      currentId: -1,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false,
      rules: {
        id: [{ required: true, message: '不能为空', trigger: 'blur' },{validator: Verification,trigger: ['blur','change']}],
        name: [{ required: true, message: '不能为空', trigger: 'blur' },{validator: Verification,trigger: ['blur','change']}],
        type: [{ required: true, message: '不能为空', trigger: 'change' }],
      },
      checkIdState: {
        state: true,
        const: '',
      },
      checkNameState: {
        state: true,
        const: '',
      },
      cloneForm:{},
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
    this.menuManager_btn_add = this.permissions['sys_menu_add']
    this.menuManager_btn_edit = this.permissions['sys_menu_edit']
    this.menuManager_btn_del = this.permissions['sys_menu_del']
  },
  computed: {
    ...mapGetters(['elements', 'permissions']),
  },
  methods: {
    checkId () {
      if (this.form.id !== '' && this.checkIdState.const != this.form.id) {
        checkId({id: this.form.id}).then((res) => {
          this.checkIdState.state = res.data.data
          if (!this.checkIdState.state) {
            this.$message.error('节点ID重复，请修改')
          }
        })
      } else if (this.checkIdState.const == this.form.id) {
        this.checkIdState.state = true
      }
    },
    checkName () {
      if (this.form.name !== '' && this.checkNameState.const != this.form.name) {
        VerificationAddObj({name: this.form.name, parentId: this.form.parentId}).then((res) => {
          this.checkNameState.state = res.data.data
          if (!this.checkNameState.state) {
            this.$message.error('菜单标题重复，请修改')
          } else if (this.checkNameState.const == this.form.name) {
            this.checkNameState.state = true
          }
        })
      }
    },
    getList () {
      fetchTree(this.listQuery).then(response => {
        this.treeData = response.data
      })
    },
    filterNode (value, data) {
      // console.log(value);
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    nodeExpand (data) {
      const aChildren = data.children
      if (aChildren.length > 0) {
        this.oExpandedKey[data.id] = true
        this.oTreeNodeChildren[data.id] = aChildren
      }
      this.setExpandedKeys()
    },
    nodeCollapse (data) {
      this.oExpandedKey[data.id] = false
      // 如果有子节点
      this.treeRecursion(this.oTreeNodeChildren[data.id], oNode => {
        this.oExpandedKey[oNode.id] = false
      })
      this.setExpandedKeys()
    },
    setExpandedKeys () {
      const oTemp = this.oExpandedKey
      this.aExpandedKeys = []
      for (const sKey in oTemp) {
        if (oTemp[sKey]) {
          this.aExpandedKeys.push(parseInt(sKey))
        }
      }
    },
    treeRecursion (aChildren, fnCallback) {
      if (aChildren) {
        for (let i = 0; i < aChildren.length; ++i) {
          const oNode = aChildren[i]
          fnCallback && fnCallback(oNode)
          this.treeRecursion(oNode.children, fnCallback)
        }
      }
    },

    getNodeData (data) {
      // console.log(data)
      this.clearValidate()
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      getObj(data.id).then(response => {
        this.form = response.data
        this.cloneForm = this.form
        this.checkIdState.const = this.form.id
        this.checkNameState.const = this.form.name
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
      this.form.parentName = this.cloneForm.parentName
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
        // 更新session中的菜单
        that.$store.dispatch('GetMenu').then(({res}) => {
          initMenu(that.$router, res)
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
                delObj(that.currentId).then(() => {
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
          delObj(that.currentId).then(() => {
            fn()
          })
        }
      })
    },
    update () {
      if (!this.checkIdState.state) {
        this.$message.error('节点ID重复，请修改')
        return
      }
      if (!this.checkNameState.state) {
        this.$message.error('菜单标题重复，请修改')
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          putObj(this.form).then(() => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000,
            })
            this.clearValidate()
            // 更新session中的菜单
            this.$store.dispatch('GetMenu').then(({res}) => {
              initMenu(this.$router, res)
              this.resetForm()
            })
          })
        } else {
          return false
        }
      })
    },
    create () {
      if (!this.checkIdState.state) {
        this.$message.error('节点ID重复，请修改')
        return
      }
      if (!this.checkNameState.state) {
        this.$message.error('菜单标题重复，请修改')
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          addObj(this.form).then(() => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000,
            })
            this.clearValidate()
            // 更新session中的菜单
            this.$store.dispatch('GetMenu').then(({res}) => {
              initMenu(this.$router, res)
              this.resetForm()
            })
          })
        } else {
          return false
        }
      })
    },
    onCancel () {
      this.formEdit = true
      this.formStatus = ''
      this.clearValidate()
    },
    resetForm () {
      this.form = {
        permission: undefined,
        name: undefined,
        title: undefined,
        id: undefined,
        parentId: this.currentId,
        icon: undefined,
        sort: undefined,
        component: undefined,
        type: undefined,
        path: undefined,
        isLink: undefined,
        isShow: undefined,
        isBlank: undefined,
        redirectUrl: undefined,
        describe: undefined,
        systemType: undefined,
      }
      console.log("前提测试",this.form)
    },
    clearValidate () {
      this.checkIdState = {
        state: true,
        const: '',
      }
      this.checkNameState = {
        state: true,
        const: '',
      }
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
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
