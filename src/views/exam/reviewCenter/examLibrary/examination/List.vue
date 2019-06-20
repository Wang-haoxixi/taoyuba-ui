<template>
  <div>
    <basic-container>
      <page-header title="考试库管理"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleAdd">新增</iep-button>
          <iep-button size="small" @click="handleDeleteAll">批量删除</iep-button>
          <!-- <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteByIds">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
            <!-- <advance-search @search-page="searchPage"></advance-search> -->
          </operation-search>
        </template>
      </operation-container>

      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" isMutipleSelection
        @selection-change="selectionChange" is-mutiple-selection>
        <el-table-column prop="fieldName" label="科目">
          <template slot-scope="scope">
            {{scope.row.fieldName}}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="名称">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column prop="totalScore" label="总分">
          <template slot-scope="scope">
            {{scope.row.totalScore}}
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="开始时间" min-width="150">
          <template slot-scope="scope">
            {{scope.row.beginTime}}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" min-width="150">
          <template slot-scope="scope">
            {{scope.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" size="medium" v-if="scope.row.state === 0">启用</el-tag>
            <el-tag type="warning" size="medium" v-if="scope.row.state === 1">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="报名人数">
          <template slot-scope="scope">
            {{scope.row.number}}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="创建人">
          <template slot-scope="scope">
            {{scope.row.username}}
          </template>
        </el-table-column>
        <el-table-column prop="creatTime" label="创建时间" min-width="150">
          <template slot-scope="scope">
            {{scope.row.creatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" min-width="140">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" size="small" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button type="warning" size="small" plain @click="handleDetail(scope.row)">查看</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleOpen(scope.row)" v-if="scope.row.state === 1">启用</el-dropdown-item>
                  <el-dropdown-item @click.native="handleForbid(scope.row)" v-if="scope.row.state === 0">禁用</el-dropdown-item>
                  <el-dropdown-item @click.native="handleManage(scope.row, 'ExamRegistration')"
                    v-if="permission_edit">报名管理</el-dropdown-item>
                  <el-dropdown-item @click.native="handleManage(scope.row, 'ExamPaper')" v-if="permission_edit">考卷管理</el-dropdown-item>
                  <el-dropdown-item @click.native="handleManage(scope.row, 'ExamReading')" v-if="permission_edit">阅卷管理</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>

    <iep-dialog :dialog-show="dialogEdit" :title="messageShow" width="500px" @close="handleEditCancel"
      center>
      <el-form :label-position="labelPosition" label-width="100px" :model="reForm">
        <el-form-item label="科目：" prop="field">
          <el-input v-model="reForm.field" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="title">
          <el-input v-model="reForm.title" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="总分：" prop="totalScore">
          <el-input v-model="reForm.totalScore" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建人：" prop="username">
          <el-input v-model="reForm.username" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间： " prop="creatTime">
          <el-input v-model="reForm.creatTime" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="开始时间： " prop="beginTime">
          <el-date-picker v-model="reForm.beginTime" type="datetime" @change="handleChangeTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间： " prop="endTime">
          <el-date-picker v-model="reForm.endTime" type="datetime" @change="handleChangeTime"></el-date-picker>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <operation-wrapper>
          <iep-button type="primary" :disabled="isChangeTime" @click="handleEditSave">保存</iep-button>
          <iep-button @click="handleEditCancel">取消</iep-button>
        </operation-wrapper>
      </template>
    </iep-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getExamInationList, postExamForbidById, postExamPassById, deleteById } from '@/api/exam/examLibrary/examInation/examInation'
// import { getTableData } from '@/api/mlms/material/datum/material'
// import { putCustomer, deleteCustomerBatch } from '@/api/crms/customer'
// import { getWealthFlowPage } from '@/api/fams/wealth_flow'
// import { getExamPage } from '@/api/exam/review'

export default {
  mixins: [mixins],
  data () {
    return {
      isChangeTime: true,
      messageShow: '编辑考卷信息',
      labelPosition: 'right',
      dialogEdit: false,
      paramForm: {},
      selectValue: false,
      selectionValue: {},
      reForm: {
        field: '',
        title: '',
        totalScore: '',
        username: '',
        creatTime: '',
        beginTime: '',
        endTime: '',
      },
    }
  },
  created () {
    this.loadPage()
    this.setPermission()
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, getExamInationList)
    },
    setPermission () {
      // this.permission_edit = this.permissions['mlms_datum_edit']
      this.permission_edit = true
    },
    /**
     * 选择试题
     */
    selectionChange (val) {
      if (val.map(item => item.id).length > 0) {
        this.selectValue = true
        this.selectionValue = val.map(item => item.id)
      }
      else
        this.selectValue = false
      return
    },
    /**
     * 批量删除
     */
    handleDeleteAll () {
      if (this.selectValue == false) {
        this.$message.error('请至少选择一项考试！')
      }
      if (this.selectValue == true) {
        this.$confirm('此操作将删除选中的考试, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteById(this.selectionValue).then( res => {
            if (res.data.data == true) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
                this.loadPage()
            }
          })
        })
      }
    },
    /**
     * 关闭考卷信息
     */
    handleEditCancel () {
      this.dialogEdit = false
      this.isChangeTime = true
    },
    /**
     * 新增考试
     */
    handleAdd () {
      this.$emit('onEdit', {
        methodName: '创建',
        id: '',
        current: 0,
      })
    },
    /**
     * 编辑弹窗修改考试时间
     */
    handleChangeTime () {
      this.isChangeTime = false
    },

    /**
     * 编辑按钮
     */
    handleEdit (row) {
      const record = {
        methodName: '编辑',
        current: 2,
        id: row.id,
      }
      this.$emit('onEdit', record)
    },

    /**
     * 查看按钮
     */
    handleDetail (row) {
      const record = {
        methodName: '查看',
        current: 2,
        id: row.id,
      }
      this.$emit('onEdit', record)
    },

    // 报名、考卷、阅卷管理按钮
    handleManage (row, activeTab) {
      //this.form.examinationId = row.id
      this.$emit('onChange', {
        row,
        activeTab,
      })
    },
    /**
     * 保存编辑
     */
    handleEditSave () {
      this.dialogEdit = false
      this.$message({
        message: '编辑考卷信息成功',
        type: 'success',
      })
    },
    /**
     * 启用试卷按钮
     */
    handleOpen (row) {
      const param = {
        id: row.id,
      }
      this.$confirm('此操作将启用试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        postExamPassById(param).then( res => {
          if (res.data.data == true) {
            this.$message({
              type: 'success',
              message: '该试卷已启用!',
            })
            this.loadPage()
          }
        })

      })
    },
    /**
     * 禁用试卷按钮
     */
    handleForbid (row) {
      const param = {
        id: row.id,
      }
      this.$confirm('此操作将禁用试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        postExamForbidById(param).then( res => {
          if (res.data.data == true) {
            this.$message({
              type: 'success',
              message: '该试卷已禁用!',
            })
            this.loadPage()
          }
        })

      })
    },
  },
}
</script>
