<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAuditAll" icon="el-icon-plus" type="primary" plain>批量审核</iep-button>
        <iep-button @click="handleDeleteAll">批量删除</iep-button>
        <iep-button class="tip">当前已选择<span>{{sumValue}}</span>项</iep-button>
        <iep-button class="empty" @click="handleEmpty" v-show="sumValue != 0">清空</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
          <!-- <advance-search @search-page="searchPage"></advance-search> -->
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination"
      :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      isMutipleSelection @selection-change="selectionChange" is-mutiple-selection is-index>
      <el-table-column prop="examineeName" label="姓名">
        <template slot-scope="scope">
          {{scope.row.examineeName}}
        </template>
      </el-table-column>
      <el-table-column prop="examineeNumber" label="工号">
        <template slot-scope="scope">
          {{scope.row.examineeNumber}}
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" width="110">
        <template slot-scope="scope">
          {{scope.row.department}}
        </template>
      </el-table-column>
      <el-table-column prop="examinationNumber" label="准考证号" min-width="110">
        <template slot-scope="scope">
          {{scope.row.examinationNumber}}
        </template>
      </el-table-column>
      <el-table-column prop="signupTime" label="报名时间" min-width="130">
        <template slot-scope="scope">
          {{scope.row.signupTime}}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="报名状态">
        <template slot-scope="scope">
          <el-tag
            type="danger"
            size="medium"
            v-if="scope.row.state === 2"
          >取消资格</el-tag>
          <el-tag
            type="success"
            size="medium"
            v-if="scope.row.state === 1"
          >报名成功</el-tag>
          <el-tag
            type="info"
            size="medium"
            v-if="scope.row.state === 0"
          >报名中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="报名资质">
        <template slot-scope="scope">
          <iep-button size="small" @click="handleCredential(scope.row)">查看资质</iep-button>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="190">
        <template slot-scope="scope">
          <operation-wrapper style="padding-top: 4px;">
            <iep-button type="warning" size="small" plain @click="handlePass(scope.row)" v-if="scope.row.state === 0 || scope.row.state === 2">审核通过</iep-button>
            <iep-button type="warning" size="small" plain @click="handleCancel(scope.row)" v-if="scope.row.state === 1">撤销资格</iep-button>
            <iep-button size="small" plain @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <!-- <iep-dialog :dialog-show="dialogShow" title="查看资质" width="500px" @close="dialogShow = false" center>
      <img style="margin: 0 auto;" :src="imgUrl">
      <template slot="footer">
        <operation-wrapper>
          <iep-button type="primary">确认</iep-button>
          <iep-button @click="dialogShow = false">取消</iep-button>
        </operation-wrapper>
      </template>
    </iep-dialog> -->
    <iep-dialog :dialog-show="dialogShow" title="查看资质" width="500px" @close="dialogShow = false" center>
      <div style="text-align:center;">
        <iep-img :src="imgUrl"></iep-img>
        <span v-if="imgUrlNo">资质证明图片未上传！</span>
      </div>
      <template slot="footer">
        <operation-wrapper>
          <iep-button @click="dialogShow = false" type="primary">确认</iep-button>
        </operation-wrapper>
      </template>
    </iep-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getExamRegistrationList,passExamerById,deleteById,cancelExamerById } from '@/api/exam/examLibrary/examRegistration/examRegistration'
export default {
  mixins: [mixins],
  props: ['record'],
  data () {
    return {
      imgUrlNo: false,
      dialogShow: false,
      sumValue: 0,
      selectValue: false,
      selectionValue: '',
      paramForm: {},
      selectList: [],
      imgUrl: null,
    }
  },
  created () {
    this.loadPage()
    this.setPermission()
  },
  methods: {
    loadPage (param) {
      // console.log('record',this.record)
      const params = {
        examinationId: this.record.row.id,
      }
      this.loadTable({...param, ...params}, getExamRegistrationList)
    },
    setPermission () {
      // this.permission_edit = this.permissions['mlms_datum_edit']
      this.permission_edit = true
    },
    // 清空搜索
    clearSearchParam () { },
    /**
     * 查看资质按钮
     */
    handleCredential (row){
      this.dialogShow = true
      this.imgUrl = row.qualificationsurl
      if (row.qualificationsurl === ''){
        this.imgUrlNo = true
      }
      else
        this.imgUrlNo = false
    },
    /**
     * 审核通过按钮
     */
    handlePass (row) {
      this._handleComfirm([row.id], passExamerById,'通过审核')
    },
    /**
     * 取消资格按钮
     */
    handleCancel (row){
      const param = {
        id: row.id,
        examinationId: row.examinationId,
        userId: row.examineeId,
      }
      this._handleComfirm(param, cancelExamerById,'撤销资格')
    },
    /**
     * 批量审核按钮
     */
    handleAuditAll (){
      if (this.selectValue == false){
        this.$message.error('请至少选择一名报名人员！')
        return
      }
      if (this.selectValue == true){
          this.$confirm('此操作将批量通过选中考生的报名资格，是否继续','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            passExamerById (this.selectionValue).then( res => {
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
     * 单条删除按钮
     */
    handleDelete (val){
      this._handleComfirm([val.id], deleteById,'删除')
    },
    /**
     * 批量删除按钮
     */
    handleDeleteAll (){
      if (this.selectValue == false){
        this.$message.error('请至少选择一名报名人员！')
      }
      if (this.selectValue == true){
        this.$confirm('此操作将删除选中的考试，是否继续？','提示',{
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
     * 选择试题
     */
    selectionChange (val) {
      this.sumValue = val.length
      if (val.map(m => m.id) == ''){
        this.selectValue = false
      }
      else{
        this.selectValue = true
        this.selectionValue = val.map(m => m.id)
        this.sumValue = this.selectionValue.length
      }
    },
    /**
     * 清空按钮
     */
    handleEmpty (){

    },
  },
}
</script>
<style lang="scss" scoped>
.tip {
  border: 0px solid #ccc;
  &:hover {
    background-color: #fff;
  }
  span {
    color: #419fff;
    font-size: 20px;
    margin: 3px 6px;
  }
}
.empty {
  margin-top: 6px;
  border: 0px solid #ccc;
  color: #419fff;
  &:hover {
    background-color: #fff;
  }
}
</style>
