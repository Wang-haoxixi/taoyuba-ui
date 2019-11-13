<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="我的办证"></page-header>
      <div class="shipowner_title">
        <div style="float:right">
          <span>
            <el-select v-model="params.type" placeholder="请输入办证类型" size="small" clearable >
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </span>
          <span><iep-dict-select v-model="params.certTitle" dict-name="tyb_crew_cert_title" placeholder="请输入证书职务" size="small" clearable></iep-dict-select></span>
          <span><iep-dict-select v-model="params.certLevel" dict-name="tyb_crew_cert_level" placeholder="请输入证书职务" size="small" clearable></iep-dict-select></span>
          <span><el-input v-model="params.agentId" placeholder="请输入办证中介" size="small" clearable></el-input></span>
          <span><el-date-picker v-model="params.createTime" type="date" value-format="yyyy-MM-dd" placeholder="请输入提交时间"></el-date-picker></span>
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
              <el-button type="text" icon="el-icon-delete" size="mini" @click="handleCancel(scope.row.id)">取消办理</el-button>
              <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDetail(scope.row.id)">查看</el-button>
              <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
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
              <el-form-item label="中介名称：">{{ form.agentId }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办证类型：">{{ form.type }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证书编号：">{{ form.certNo }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书等级：">{{ form.certLevel }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证书职务：">{{ form.certTitle }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书类型：">{{ form.certType }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证照片：">{{ form.imageIdcard }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证书附件：">{{ form.imageCert }}</el-form-item>
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
import { getCertPage, getCertDetail } from '@/api/tmlms/cert'
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
        type: '',
        certTitle: '',
        certLevel: '',
        agentId: '',
        createTime: '',
        status: '',
        userId: '',
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '办证类型',
            value: 'type',
          },
          {
            text: '证书职务',
            value: 'certTitle',
          },
          {
            text: '证书等级',
            value: 'certLevel',
          },
          {
            text: '办证中介',
            value: 'agentId',
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
      typeList: [
        {
          label: '以旧换新',
          value: 0,
        }, {
          label: '证书换发',
          value: 1,
        }, {
          label: '证书补发',
          value: 2,
        },
      ],
      statusList: [
        {
          label: '待确认',
          value: 0,
        }, {
          label: '已受理',
          value: 1,
        }, {
          label: '办证中',
          value: 2,
        }, {
          label: '已办理',
          value: 3,
        }, {
          label: '已取消',
          value: 4,
        },
      ],
      dialogVisible: false,
      form: {
        agentId: '',
        type: '',
        certNo: '',
        certLevel: '',
        certTitle: '',
        certType: '',
        imageIdcard: '',
        imageCert: '',
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    // 分页
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    // 获取列表数据
    async getData () {
      var userId  = await getUserInfo().then(res => {
        return res.data.data.sysUser.userId
      })
      this.params.userId = userId
      getCertPage(this.params).then(data => {
        this.certList = data.data.data.records
        this.certList.forEach(v => {
          getObj(v.agentId).then(data => {
            v.agentId = data.data.data.realName
          })
          this.typeList.forEach(m => {
            if (v.type === m.value) {
              v.type = m.label
            }
          })
          this.dictGroup.tyb_crew_cert_title.forEach(k => {
            if(v.certTitle === k.value) {
              v.certTitle = k.label
            }
          })
          this.dictGroup.tyb_crew_cert_level.forEach(i => {
            if (v.certLevel === i.value) {
              v.certLevel = i.label
            }
          })
          this.statusList.forEach(n => {
            if (v.status === n.value) {
              v.status = n.label
            }
          })
        })
      })
    },
    handleCancel (val) {
      this.$confirm('此操作将取消该培训, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        console.log(val)
        // let status = 0
        // reviewApply(val, status).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '取消成功！',
        //   })
        //   this.getData()
        // }).catch(err=>{
        //   this.$message.error(err.data.msg)
        // })
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
        this.typeList.forEach(m => {
          if (this.form.type === m.value) {
            this.form.type = m.label
          }
        })
        this.dictGroup.tyb_crew_cert_title.forEach(k => {
          if(this.form.certTitle === k.value) {
            this.form.certTitle = k.label
          }
        })
        this.statusList.forEach(n => {
          if (this.form.status === n.value) {
            this.form.status = n.label
          }
        })
        this.dictGroup.tyb_crew_cert_level.forEach(i => {
          if (this.form.certLevel === i.value) {
            this.form.certLevel = i.label
          }
        })
        this.dictGroup.tyb_crew_cert_type.forEach(y => {
          if (this.form.certType === y.value) {
            this.form.certType = y.label
          }
        })
      })
    },
    handleDelete () {
    },
  },
  created () {
    this.getData()
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
