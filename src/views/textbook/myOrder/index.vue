<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <page-header title="订单管理"></page-header>
        <div class="shipowner_title">
          <iep-button type="primary" icon="el-icon-plus" @click="handleAdd" plain>新增</iep-button>
          <div style="float:right">
            <span style="width:120px"><el-input v-model="params.department" placeholder="单位" size="small" clearable></el-input></span>
            <span style="width:120px"><el-input v-model="params.contactName" placeholder="联系人" size="small" clearable></el-input></span>
            <span style="width:120px"><el-input v-model="params.phone" placeholder="电话" size="small" clearable></el-input></span>
            <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
              value-format="yyyy-MM-dd"  size="mini"></el-date-picker>
            </span>
            <span style="width:120px"><el-select v-model="params.isPayed" placeholder="请选择付款" size="small" clearable>                                                        
                <el-option
                  v-for="item in payStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span style="width:120px"><el-select v-model="params.isShipped" placeholder="请选择发货" size="small" clearable>                                                       
                <el-option
                  v-for="item in shipStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span style="width:120px"><el-select v-model="params.isInvoice" placeholder="请选择开票" size="small" clearable>                                                      
                <el-option
                  v-for="item in invoStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <el-button size="small"  @click="getParamData">搜索</el-button>                          
          </div>
        </div>
        <el-table
          :data="orderList"
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
                <el-button type="text" icon="el-icon-edit" size="mini" @click="handleDetail(scope.row.id)">查看
                </el-button>
                <el-button v-if="scope.row.isPayed === '未付款' && scope.row.status === 1" type="text" icon="el-icon-delete" size="mini" @click="handleCancel(scope.row.id)">取消
                </el-button>
              </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center;margin: 20px 0;">
          <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
        </div>
        <iframe id="iframe"
          title="Inline Frame Example"
          style="visibility: hidden;"
          width="1200"
          height="500">
        </iframe>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getBookOrderList, cancelBookOrder } from '@/api/bookorder'
import { getUserInfo } from '@/api/login'
export default {
  data () {
    return {
      orderList: [],
      total: 10,
      params: {
        departmen: '',
        contactName: '',
        phone: '',
        timeLists: '',
        userId: '',
        current: 1,
        size: 10,
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '单位',
            value: 'department',
          },
          {
            text: '联系人',
            value: 'contactName',
          },
          {
            text: '电话',
            value: 'phone',
          },
          {
            text: '创建时间',
            value: 'createTime',
          },
          {
            text: '付款',
            value: 'isPayed',
          },
          {
            text: '发货',
            value: 'isShipped',
          },
          {
            text: '开票',
            value: 'isInvoice',
          },
        ],
      },
      payStatus: [
        {
          value: 0,
          label: '未付款',
        },
        {
          value: 1,
          label: '已付款',
        },
      ],
      shipStatus: [
        {
          value: 0,
          label:'未发货',
        },
        {
          value: 1,
          label: '已发货',
        },
      ],
      invoStatus: [
        {
          value: 0,
          label: '未开票',
        },
        {
          value: 1,
          label: '已开票',
        },
      ],
    }
  },
  created () {
    this.getData()
  },
  methods: {
    currentChange (val) {
      this.params.current = val
      this.getData()
    },
    async getData () {
      this.params.userId = await getUserInfo().then(res => {
        return res.data.data.sysUser.userId
      })
      getBookOrderList(this.params).then(data => {
        this.orderList = data.data.data.records
        this.orderList.forEach(v => {
          this.payStatus.forEach(m => {
            if(v.isPayed === m.value) {
              v.isPayed = m.label
            }
          })
          this.shipStatus.forEach(k => {
            if(v.isShipped === k.value) {
              v.isShipped = k.label
            }
          })
          this.invoStatus.forEach(n => {
            if(v.isInvoice === n.value) {
              v.isInvoice = n.label
            }
          })
        })
      })
    },
    handleAdd () {
      this.$router.push({
        path: '/textbook_spa/order_detail',
      })
    },
    handleDetail (val) {
      this.$router.push({
        path: '/textbook_spa/order_detail', query: { see: val },
      })
    },
    handleCancel (val) {
      this.$confirm('此操作将取消该教材订单，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        cancelBookOrder(val).then(() => {
          this.$message.success('取消成功！')
          this.getData()
        }).catch(() => {
          this.$message.error('取消失败！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消此操作！',
        })
      }) 
    },
    getParamData () {
      if (this.params.timeLists) {
        this.params.startDate = this.params.timeLists[0]
        this.params.endDate = this.params.timeLists[1]
      }
      this.params.current = 1
      this.getData()
    },
  },
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