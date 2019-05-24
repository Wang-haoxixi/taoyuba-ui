<template>
  <div class="execution">
    <basic-container>
      <el-alert title="路由配置是非常专业的事情，不建议非工程师操作" type="warning">
      </el-alert>
      <vue-json-editor v-model="json" :show-btns="false"></vue-json-editor>
      <div align="center">
        <el-button @click="openAddDialog()">添加路由</el-button>
        <el-button @click="edit()">更新路由</el-button>
      </div>
    </basic-container>
    <el-dialog title="新增路由" :visible.sync="dialogFormVisible">
      <el-form class="router-form" :model="form" label-width="100px">
        <el-form-item label="路由名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由英文">
          <el-input v-model="form.english" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由值">
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vueJsonEditor from 'vue-json-editor'
import { fetchList, putObj } from '@/api/admin/route'
const tempPath = (form) => `
{
  "routeId": "${form.english}",
  "routeName": "${form.name}",
  "predicates": [{"args": {"_genkey_0": "${form.path}"}, "name": "Path"}],
  "filters": [],
  "uri": "lb://${form.english}",
  "order": 0,
  "createTime": "2019-02-23 10:40:11",
  "updateTime": null,
  "delFlag": 0
}`
export default {
  data () {
    return {
      json: null,
      dialogFormVisible: false,
      form: {
        name: '代码生成',
        english: 'gds-codegen',
        path: '/gen/**',
      },
    }
  },

  // 注入vueJsonEditor组件
  components: {
    vueJsonEditor,
  },

  created () {
    this.getList()
  },

  methods: {
    getList () {
      fetchList().then(response => {
        let result = response.data.data
        for (var i = 0; i < result.length; i++) {
          let route = result[i]
          if (route.predicates) {
            let predicates = route.predicates
            route.predicates = JSON.parse(predicates)
          }
          if (route.filters) {
            let filters = route.filters
            route.filters = JSON.parse(filters)
          }
        }
        this.json = result
      })
    },
    add () {
      // console.log(tempPath(this.form))
      // console.log(this.json, JSON.parse(tempPath(this.form)))
      const json = [...this.json, JSON.parse(tempPath(this.form))]
      putObj(json).then(() => {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000,
        })
      })
      this.dialogFormVisible = false
    },
    openAddDialog () {
      this.dialogFormVisible = true
    },

    edit () {
      putObj(this.json).then(() => {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000,
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.router-form {
  padding: 0 40px;
}
</style>
