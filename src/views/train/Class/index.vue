<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="培训开班"></page-header>
      <div class="shipowner_title">
        <el-button v-if="train_class_add" type="primary" size="small" icon="el-icon-edit" @click="addTrainClass">新增</el-button>
        <div style="float:right">
          <span><el-input v-model="params.title" placeholder="请输入开班名称" size="small" clearable></el-input></span>
          <span><el-date-picker v-model="params.openTime" type="date" value-format="yyyy-MM-dd" placeholder="请输入开班日期"></el-date-picker></span>
          <span><el-input v-model="params.address" placeholder="请输入开班地点" size="small" clearable></el-input></span>    
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="trainClassList"
          stripe
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in options.columns"
            :key="index"
            :prop="item.value"  
            :label="item.text"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="train_class_aud && scope.row.status === 0" type="text" icon="el-icon-edit" size="mini" @click="handleAudit(scope.row.id)">审核
              </el-button>
              <el-button v-if="train_class_edit" type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.id)">编辑
              </el-button>
              <el-button v-if="train_class_del" type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.id)">删除
              </el-button>
              <el-button v-if="train_class_sign && scope.row.openClass === '开班中'" type="text" icon="el-icon-delete" size="mini" @click="handleSign(scope.row.id)">签到记录
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="audDialog" width="30%" :before-close="audClose">
        <span>是否同意审核</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="agreeAudit">同 意</el-button>
          <el-button type="primary" @click="cancelAudit">拒 绝</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>
<script>
import { getClassPage, deleteClass } from '@/api/train/class'
import { getUserInfo } from '@/api/login'
import { getObj } from '@/api/admin/user'
import { audit } from '@/api/tmlms/audit'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      trainClassList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        title: '',
        openTime: '',
        address: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '开班名称',
            value: 'title',
          },
          {
            text: '机构名称',
            value: 'userId',
          },
          {
            text: '开班地点',
            value: 'address',
          },
          {
            text: '开班时间',
            value: 'openTime',
          },
          {
            text: '状态',
            value: 'classStatus',
          },
          {
            text: '开班',
            value: 'openClass',
          },
        ],
      },
      train_class_add: false,
      train_class_edit: false,
      train_class_del: false,
      train_class_aud: false,
      train_class_sign: false,
      audDialog: false,
      aid: '',
      now: '',
      mangner: false,
    }
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    // 跳转新增页面
    addTrainClass () {
      this.$router.push({path: '/article_spa/Class_Detial/0', query:{ add: 0 }}) 
    },
    // 编辑
    handleEdit (val) {
      this.$router.push({path: `/article_spa/Class_Detial/${val}`, query:{ edit: val }})
    },
    handleAudit (val) {
      this.audDialog = true
      this.aid =val
      // let type = 1
      // this.$confirm('该操作将审核该渔船变更，是否继续？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //   }).then(() => {
      //     reviewShipChange({id: val, status: type}).then(() => {
      //       this.$message.success('审核通过！')
      //       this.getData()
      //     }).catch(err => {
      //       this.message.error(err.msg)
      //     })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消审核！',
      //     })
      //   })
    },
    // 获取列表数据
    getData () {
      getUserInfo().then(res => {
        if (res.data.data.roles.indexOf(111) === -1) {
          this.params.userId = res.data.data.sysUser.userId
        }
         getClassPage(this.params).then(data => {
          this.trainClassList = data.data.data.records
          var oDate1 = new Date(this.now)
          this.trainClassList.forEach(v => {
            var oDate2 = new Date(v.openTime)
            if(oDate1.getTime() > oDate2.getTime()){
              v.openClass = '开班中'
            } else {
              v.openClass = '未开班'
            }
            var d1 = new Date(v.applyStartTime)
            var d2 = new Date(v.applyEndTime)
            if (oDate1 >= d1 && oDate1 <= d2) {
              v.classStatus = '报名中'
            }
            else {
              v.classStatus = '未在报名日期内'
            }
            getObj(v.userId).then(data => {
              v.userId = data.data.data.realName
            })
          })
        })
      }) 
    },
    // 删除
    handleDel (id) {
      this.$confirm('此操作将永久删除该培训开班数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteClass(id).then(res=>{
          this.$message({
            type: 'success',
            message: res.data.msg,
          })
          this.getData()
        }).catch(err=>{
          this.$message.error(err.data.msg)
        })
      }).catch(() => { 
        this.$message({
          type: 'info',
          message: '已取消删除',
        })        
      })
    },
    audClose () {
      this.audDialog = false
    },
    agreeAudit () {
      let statusAudit = 1
      let statusTable = 1
      let tableName = 'tyb_train'
      audit(this.aid, statusAudit, statusTable, tableName).then(() => {
        this.$message.success('审核通过！')
        this.getData()
        this.audDialog = false
      }).catch(err => {
        this.message.error(err.msg)
      })
    },
    cancelAudit () {
      let statusAudit = 2
      let statusTable = 2
      let tableName = 'tyb_train'
      audit(this.aid, statusAudit, statusTable, tableName).then(() => {
        this.$message.success('审核不通过！')
        this.getData()
        this.audDialog = false
      }).catch(err => {
        this.message.error(err.msg)
      })
    },
    handleSign (val) {
      this.$router.push({ path: `/article_spa/sign_list/${val}` })
    },
    getNow () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.now = year + seperator1 + month + seperator1 + strDate
    },
    getUserInfo () {
      getUserInfo().then(res => {
        if (res.data.data.roles.indexOf(111) === -1) {
          this.mangner = false
        } else {
          this.mangner = true
        }
        if (this.mangner === false) {
          this.options.columns.splice(1, 1)
        }
      })
    },
  },
  created () {
    this.getNow()
    this.getData()
    this.getUserInfo()
    this.train_class_add= this.permissions['train_class_add']
    this.train_class_edit = this.permissions['train_class_edit']
    this.train_class_del = this.permissions['train_class_del']
    this.train_class_aud = this.permissions['train_class_aud']
    this.train_class_sign = this.permissions['train_class_sign']
  },
  // activated () {
  //   this.getData()
  // },
 }
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
