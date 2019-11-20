<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="办证管理"></page-header>
      <div class="shipowner_title">
        <div style="float:right">
          <span><el-input v-model="params.agentName" placeholder="请输入办证中介" size="small" clearable></el-input></span>
          <span v-if="mangner === true"><el-input v-model="params.userName" placeholder="请输入办证人" size="small" clearable></el-input></span>
          <span><el-input v-model="params.realName" placeholder="请输入联系人" size="small" clearable></el-input></span>
          <span><el-input v-model="params.phone" placeholder="请输入联系电话" size="small" clearable></el-input></span>
          <span><el-date-picker v-model="params.time" type="date" size="small" value-format="yyyy-MM-dd" placeholder="请输入提交时间"></el-date-picker></span>
          <span>
            <el-select v-model="params.status" placeholder="请输入办证状态" size="small" clearable >
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </span>
          <el-button size="small"  @click="getData">搜索</el-button>
        </div>
      </div>
        <el-table
          :data="certList"
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
              <el-button v-if="hrms_doc_can" type="text" icon="el-icon-delete" size="mini" @click="handleStatus(scope.row.id, 4)">取消</el-button>
              <el-button v-if="hrms_doc_acc" type="text" icon="el-icon-delete" size="mini" @click="handleStatus(scope.row.id, 1)">受理</el-button>
              <el-button v-if="hrms_doc_cert" type="text" icon="el-icon-delete" size="mini" @click="handleStatus(scope.row.id, 2)">办证</el-button>
              <el-button v-if="hrms_doc_fin" type="text" icon="el-icon-delete" size="mini" @click="handleStatus(scope.row.id, 3)">完成</el-button>
              <el-button v-if="hrms_doc_view" type="text" icon="el-icon-delete" size="mini" @click="handleDetail(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
      <el-dialog title="办证信息" :visible.sync="dialogVisible" width="70%">
        <el-form ref="form" :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系人：">{{ form.realName }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：">{{ form.phone }}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>
<script>
import { getCertPage, getCertDetail, cancelCert } from '@/api/tmlms/cert'
import { getUserInfo } from '@/api/login'
import { getObj } from '@/api/admin/user'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      certList: [],
      total: 10,
      // 查询数据
      params: {
        current: 1,
        size: 10,
        realName: '',
        phon: '',
        agentName: '',
        userNam: '',
        time: '',
        status: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '办证中介',
            value: 'agentId',
          },
          {
            text: '办证人',
            value: 'userId',
          },
          {
            text: '联系人',
            value: 'realName',
          },
          {
            text: '联系电话',
            value: 'phone',
          },
          {
            text: '提交时间',
            value: 'createTime',
          },
          {
            text: '状态',
            value: 'status',
          },
        ],
      },
      statusList: [
        {
          label: '已取消',
          value: 0,
        }, {
          label: '正常',
          value: 1,
        }, 
      ],
      dialogVisible: false,
      form: {
        realName: '',
        phone: '',
      },
      hrms_doc_can: false,
      hrms_doc_acc: false,
      hrms_doc_cert: false,
      hrms_doc_fin: false,
      hrms_doc_view: false,
      mangner: false,
    }
  },
  computed: {
    ...mapGetters(['dictGroup', 'permissions']),
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    // 获取列表数据
    getData () {
      // var userId  = await getUserInfo().then(res => {
      //   return res.data.data.sysUser.userId
      // })
      // this.params.userId = userId
      getCertPage(this.params).then(data => {
        this.certList = data.data.data.records
        this.certList.forEach(v => {
          getObj(v.agentId).then(data => {
            v.agentId = data.data.data.realName
          })
          getObj(v.userId).then(data => {
            v.userId = data.data.data.realName
          })
          this.statusList.forEach(n => {
            if (v.status === n.value) {
              v.status = n.label
            }
          })
        })
      })
    },
    handleStatus (val, status) {
      this.$confirm('确定执行该操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        cancelCert(val, status).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功！',
          })
          this.getData()
        }).catch(err=>{
          this.$message.error(err.data.msg)
        })
      }).catch(() => { 
        this.$message({
          type: 'info',
          message: '已取消该操作',
        })        
      })
    },
    handleDetail (val) {
      this.dialogVisible = true
      getCertDetail(val).then(data => {
        this.form = data.data.data
        getObj(this.form.agentId).then(data => {
          this.form.agentId = data.data.data.realName
        })
        this.statusList.forEach(n => {
          if (this.form.status === n.value) {
            this.form.status = n.label
          }
        })
      })
    },
    getUserInfo () {
      getUserInfo().then(res => {
        if (res.data.data.roles.indexOf(111) === -1) {
          this.mangner = false
        } else {
          this.mangner = true
        }
        if (this.mangner === false) {
          this.options.columns.splice(3, 1)
        }
      })
    },
  },
  created () {
    this.getData()
    this.getUserInfo()
    this.hrms_doc_can= this.permissions['hrms_doc_can']
    this.hrms_doc_acc= this.permissions['hrms_doc_acc']
    this.hrms_doc_cert= this.permissions['hrms_doc_cert']
    this.hrms_doc_fin= this.permissions['hrms_doc_fin']
    this.hrms_doc_view= this.permissions['hrms_doc_view']
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
