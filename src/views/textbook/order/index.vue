<template>
  <div class="contract-box">
    <basic-container>
      <div class="shipowner_title">
        <page-header title="教材订单"></page-header>
        <div class="shipowner_title">
          <iep-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" plain>新增</iep-button>
          <div style="float:right">
            <span style="width:120px"><el-input v-model="params.department" placeholder="单位" size="mini" clearable></el-input></span>
            <span style="width:120px"><el-input v-model="params.contactName" placeholder="联系人" size="mini" clearable></el-input></span>
            <span style="width:120px"><el-input v-model="params.phone" placeholder="电话" size="mini" clearable></el-input></span>
            <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
              value-format="yyyy-MM-dd"  size="mini"></el-date-picker>
            </span>
            <span style="width:120px"><el-select v-model="params.isPayed" placeholder="请选择付款" size="mini" clearable>                                                        
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
          :header-cell-style="{background:'#eef1f6', color:'#606266'}"
          stripe
          style="width: 100%; margin-top: 30px">
            <el-table-column
              v-for="(item,index) in options.columns"
              :key="index"
              :prop="item.value"  
              :label="item.text"
              :width="item.width"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="warning" size="mini" @click="handlePrint(scope.row.id)" plain>打印
                </el-button>
                <el-button v-if="scope.row.isInvoice === '未开票'" size="mini" @click="handleTicket(scope.row.id)" plain>开票
                </el-button>
                <el-button size="mini" @click="handleDelivery(scope.row.id)" plain>发货
                </el-button>
                <el-button size="mini" @click="handleDetail(scope.row.id)" plain>查看
                </el-button>
                <el-button v-if="scope.row.isPayed === '未付款' && scope.row.status === 1" size="mini" @click="handleCancel(scope.row.id)" plain>取消
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
        <el-dialog title="发货" :visible.sync="deliveryDialog" width="30%" :before-close="handleClose">
          <el-form ref="deliveryform" :model="deliveryform" :rules="rules" label-width="150px" size="small">
            <el-row>          
              <el-col :span="23">            
                <el-form-item label="快递公司：" prop="expressName">
                  <el-input v-model="deliveryform.expressName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23">         
                <el-form-item label="快递号：" prop="expressNum">       
                  <el-input v-model="deliveryform.expressNum"></el-input>                    
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="handleClose">取 消</el-button>
            <el-button size="mini" type="primary" @click="saveDelivery">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getBookOrderList, cancelBookOrder, ticketBookOrder, deliveryBookOrder } from '@/api/bookorder'
// import printOrder from '@/views/textbook/order/Print.vue'
export default {
  // components: {
  //   printOrder,
  // },
  data () {
    return {
      orderList: [],
      total: 10,
      params: {
        departmen: '',
        contactName: '',
        phone: '',
        timeLists: '',
        current: 1,
        size: 10,
      },
      deliveryform: {
        expressName: '',
        expressNum: '',
      },
      rules: {
        // expressName: [
        //   { expressName: true, message: '请输入快递公司', trigger: 'blur' },
        // ],
        // expressNum: [
        //   { expressNum: true, message: '请输入快递号', trigger: 'blur' },
        // ],
      },
      options: {
        expandAll: false,
        columns: [
          {
            text: '单位',
            value: 'department',
            width: 120,
          },
          {
            text: '联系人',
            value: 'contactName',
            width: 110,
          },
          {
            text: '电话',
            value: 'phone',
            width: 140,
          },
          {
            text: '创建时间',
            value: 'createTime',
            width: 170,
          },
          {
            text: '付款',
            value: 'isPayed',
            width: 100,
          },
          {
            text: '发货',
            value: 'isShipped',
            width: 100,
          },
          {
            text: '开票',
            value: 'isInvoice',
            width: 100,
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
      tid: '',
      deliveryDialog: false,
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
    getData () {
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
    handlePrint (val) {
      let urlHeade = window.location.origin
      let url = `${urlHeade}/print_order/${val}`
      let iframe = window.document.getElementById('iframe')
      iframe.src = url
      iframe.onload = function () {
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
      }
    },
    handleDetail (val) {
      this.$router.push({
        path: '/textbook_spa/order_detail', query: { see: val },
      })
    },
    handleTicket (val) {
      this.$confirm('请确定该订单已开票，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        ticketBookOrder({ id: val }).then(() => {
          this.$message.success('开票成功！')
          this.getData()
        }).catch(() => {
          this.$message.error('开票失败！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消此操作！',
        })
      }) 
    },
    handleDelivery (val) {
      this.tid = val
      this.deliveryform = {
        expressName: '',
        expressNum: '',
      }
      this.deliveryDialog = true
    },
    handleClose () {
      this.deliveryDialog = false
    },
    saveDelivery () {
      let pra = { id: this.tid, expressName: this.deliveryform.expressName, expressNum: this.deliveryform.expressNum }
      deliveryBookOrder(pra).then(() => {
        this.$message.success('提交成功！')
        this.getData()
        this.deliveryDialog = false
      }).catch(() => {
          this.$message.error('提交失败！')
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