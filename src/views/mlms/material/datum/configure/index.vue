<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleAdd" v-if="permission_add">新增一级分类</iep-button>
        <el-dropdown size="medium">
          <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="handleDeletetByIds">删除</div>
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleDownloadAll">下载</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </operation-container>
    <iep-table-tree 
      :data="tableData" 
      :option="columnsMap" 
      @handleChild="handleChild" 
      @selectChange="selectChange" 
      :permissionAdd="permission_add"
      :pagination="pagination"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
      <template #levelName="{scope, index}">
        <el-input v-model="formData.levelName" v-if="index===selectIndex" :maxlength="10" placeholder="请输入分类名称"></el-input>
        <div v-else>{{scope.levelName}}</div>
      </template>
      <template #sort="{scope, index}">
        <el-input v-model="formData.sort" v-if="index===selectIndex" :maxlength="3" placeholder="请输入优先级"></el-input>
        <div v-else>{{scope.sort}}</div>
      </template>
      <template #number="{scope, index}">
        <el-input v-model="formData.number" v-if="index===selectIndex" :maxlength="5" placeholder="请输入唯一编码"></el-input>
        <div v-else>{{scope.number}}</div>
      </template>
      <template #createTime="scope">
        {{scope.scope.createTime}}
      </template>
      <template #menu="{ scope, index }">
        <div class="operation-wrapper">
          <div v-if="index===selectIndex">
            <iep-button @click="handleSubmit" type="warning" plain>保存</iep-button>
            <iep-button @click="handleCancel(scope)">取消</iep-button>
          </div>
          <div v-else>
            <iep-button @click="handleEdit(scope, index)" type="warning" plain v-if="permission_edit_del">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope, index)" v-if="permission_edit_del">删除</iep-button>
          </div>

        </div>
      </template>
    </iep-table-tree>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap, initFormData } from './option'
import { getTableData, createData, updateData, deleteDate } from '@/api/mlms/material/datum/configure'
import IepTableTree from './IepTableTree'
import { mapGetters } from 'vuex'

export default {
  mixins: [mixins],
  components: { IepTableTree },
  computed: {
    ...mapGetters(['permissions']),
  },
  data () {
    return {
      dictsMap,
      tableData: [],
      columnsMap: tableOption,
      index: 1,
      selectIndex: -1,
      formData: initFormData(),
      validateResult: { data: true },
      formState: false,
      permission_add: false,
      permission_edit_del: false,
    }
  },
  methods: {
    // 新增
    handleAdd () {
      if (this.formState) {
        this.$message.error('请先添加完上一条数据')
        return
      }
      this.formState = true
      this.tableData.push({
        levelName: '',
        sort: '',
        createTime: '',
      })
      this.selectIndex = this.tableData.length - 1
      this.formData = initFormData()
    },
    // 新增子级
    handleChild (row) {
      // 防止没填写完就新增别的，首先将未填写完的删掉 - 目前可能没办法实现，给个提示好了
      if (this.formState) {
        this.$message.error('请先添加完上一条数据')
        return
      }
      this.formState = true
      this.formData = {
        parentId: row.row.id,
        levelName: '',
        sort: '',
        createTime: '',
      }
      this.tableData[row.$index].childrens.push(this.formData)
      this.selectIndex = `${row.$index}-${this.tableData[row.$index].childrens.length - 1}`
    },
    // 编辑
    handleEdit (row, index) {
      if (this.formState) {
        this.$message.error('请先添加完上一条数据')
        return
      }
      this.selectIndex = index
      this.formData = { ...row }
    },
    // 取消
    handleCancel (row) {
      if (!row.id) {
        if (typeof this.selectIndex === 'number') {
          this.tableData.splice(this.tableData.length - 1, 1)
        } else {
          let index = this.selectIndex.indexOf('-')
          this.tableData[this.selectIndex.slice(0, index)].childrens.splice(this.selectIndex.slice(index + 1), 1)
        }
      }
      this.validateResult = { data: true }
      this.selectIndex = -1
      this.formState = false
    },
    // 保存
    handleSubmit () {
      // 重名
      if (!this.validateResult.data) {
        this.$message.error(this.validateResult.msg)
        return
      }
      // 非空
      if (this.formData.levelName == '' || this.formData.sort == '') {
        this.$message.error('请完整填写！')
        return
      }
      let fn = this.formData.id ? updateData : createData
      fn(this.formData).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '保存成功',
            type: 'success',
          })
          this.handleCancel({})
          this.loadPage()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDate)
    },
    // 批量删除
    handleDeletetByIds () {
      this._handleGlobalAll(deleteDate)
    },
    selectChange (val) {
      this.multipleSelection = val
    },
    loadPage (param) {
      this.isLoadTable = true
      getTableData({ ...param, ...this.pageOption }).then(({ data }) => {
        const { records, size, total, current } = data.data
        this.pagination = { current, size, total }
        this.tableData = records.map(m => m)
        this.isLoadTable = false
        this.formState = false
      })
    },
    // 批量下载
    handleDownloadAll () {
      this.$message.error('抱歉，此功能尚未开发')
    },
  },
  created () {
    this.loadPage()
    this.permission_add = this.permissions['mlms_datum_fp_add']
    this.permission_edit_del = this.permissions['mlms_datum_fp_edit_del']
  },
}
</script>

<style lang="scss" scoped>
.operation-wrapper {
  button {
    margin-right: 5px;
  }
}
.more-icon {
  display: flex;
  div {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }
  div:hover {
    background-color: #d6d6d6;
  }
  .more-icon-3,
  .more-icon-4 {
    font-size: 22px;
  }
  .more-icon-2,
  .more-icon-3 {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg); /* IE 9 */
    -webkit-transform: rotate(180deg); /* Safari and Chrome */
    -o-transform: rotate(180deg); /* Opera */
    -moz-transform: rotate(180deg);
  }
}
</style>
