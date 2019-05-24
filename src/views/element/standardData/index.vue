<template>
  <gov-layout-main>
    <div id="dataPool">
      <div class="lside">
        <div class="btn-group">
          <gov-button type="add" @click="handleAdd"></gov-button>
          <gov-button type="primary" @click="getList()">刷新数据库</gov-button>
        </div>
        <div class="select" v-loading="dataListLoading">
          <div class="select-item" v-for="item in mainDataList" :key="item.id">
            <el-radio v-model="activeDB" :label="item.id" :title="item.dbName" :border="true">
              {{ item.dbName }}
            </el-radio>
            <gov-button v-if="gov_dbs_update" type="primary" @click="handleEdit(item)">编辑</gov-button>
            <gov-button v-if="gov_dbs_delete" type="danger" @click="handleDeleteById(item.id)">删除</gov-button>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            small
            layout="prev, pager, next"
            @current-change="currentChange"
            :total="pagination.total">
          </el-pagination>
        </div>
      </div>
      <div class="rside">
        <main-page :dataBaseId="activeDB"></main-page>
      </div>
    </div>
    <main-dialog ref="mainDialog" :status="status" @submit="handleSubmit"></main-dialog>
  </gov-layout-main>
</template>

<script>
import mixin from "@/mixins/mixin"
import mainPage from './tablePage'
import { standardata } from "./const/index"
import mainDialog from './databaseDialog'
import { mapGetters } from 'vuex'
import {
  getList,
  create,
  update,
  logicDelete,
} from '@/api/element/standardDataIndex'

export default {
  components: {
    mainPage,
    mainDialog,
  },
  data () {
    return {
      mainDataList: [],
      activeDB: "",
      status: 'detail',
      dataListLoading: false,
      gov_dbs_add: false,
      gov_dbs_update: false,
      gov_dbs_delete: false,
    }
  },
  mixins: [mixin],
  computed: {
    // 三个按钮信息
    formProps () {
      return [
        {
          label: "表名",
          prop: "tableName",
          type: "input",
        },
      ]
    },
    // 表单信息
    standardata () {
      return standardata
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.getList()
    this.gov_dbs_add = this.permissions['gov_dbs_add']
    this.gov_dbs_update = this.permissions['gov_dbs_update']
    this.gov_dbs_delete = this.permissions['gov_dbs_delete']
  },
  methods: {
    getList () {
      this.dataListLoading = true
      getList(this.listQuery).then(({data})=>{
        this.mainDataList = data.records
        this.pagination.total = data.total
        this.activeDB = data.records[0] ? data.records[0].id : 0
        this.dataListLoading = false
      })
    },
    // 新增
    handleAdd () {
      this.status = 'create'
      this.$refs['mainDialog'].open({})
    },
    // 编辑
    handleEdit (formData) {
      this.status = 'update'
      this.$refs['mainDialog'].open(formData)
    },
    handleSubmit (formData, status) {
      if (status === 'create') {
        create(formData).then(()=>{
          this.$message.success('新增成功')
          this.getList()
          this.$refs['mainDialog'].close()
        })
      } else if (status === 'update') {
        update(formData).then(()=>{
          this.$message.success('修改成功')
          this.getList()
          this.$refs['mainDialog'].close()
        })
      }
    },
    // 删除
    handleDeleteById (id) {
      this.$confirm('此操作将删除该数据库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        logicDelete(id).then(()=>{
          this.$message.success('删除成功')
          this.getList()
        })
      }).catch(() => {})
    },
  },
}
</script>

<style lang="scss" type="text/css">
  #dataPool {
    display: flex;
    flex-direction: row;
    .el-radio.is-bordered {
      margin: 0 10px 0 0px;
      width: calc(100% - 10px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .select-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px 0;
    }
    .lside {
      display: flex;
      flex-direction: column;
      width: 300px;
      height: 100%;
      min-height: 500px;
      padding-right: 10px;
      border-right: 1px solid #E5E5E5;
      .btn-group {
        width: 100%;
        height: 50px;
      }
      .select {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .pagination {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .rside {
      flex: 1;
      height: 100%;
      min-height: 500px;
      margin-left: 10px;
    }
  }
</style>