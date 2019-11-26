<template>
  <div class="iep-page-form">
    <basic-container>
       <page-header :title="getTitle" :backOption="backOption"></page-header> 
       <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="small" :disabled="isDisabled">
        <el-row>          
          <el-col :span="12">            
            <el-form-item label="单位名称：" prop="department">
              <el-input v-model="form.department"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">         
            <el-form-item label="收件地址：" prop="address">       
              <el-input v-model="form.address"></el-input>                    
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="12">            
            <el-form-item label="联系人：" prop="contactName">
              <el-input v-model="form.contactName"></el-input>
            </el-form-item>
          </el-col>        
          <el-col :span="12">            
            <el-form-item label="电话：" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">         
            <el-form-item label="付款方名称：" prop="payerTitle">       
              <el-input v-model="form.payerTitle"></el-input>                    
            </el-form-item>
          </el-col>          
          <el-col :span="12">            
            <el-form-item label="纳税人识别号：" prop="payerTaxNum">
              <el-input v-model="form.payerTaxNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="12">         
            <el-form-item label="付款方地址：" prop="payerAddress">       
              <el-input v-model="form.payerAddress"></el-input>                    
            </el-form-item>
          </el-col>         
          <el-col :span="12">            
            <el-form-item label="付款方电话：" prop="payerPhone">
              <el-input v-model="form.payerPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">         
            <el-form-item label="开户行：" prop="payerBank">       
              <el-input v-model="form.payerBank"></el-input>                    
            </el-form-item>
          </el-col>          
          <el-col :span="12">            
            <el-form-item label="账号：" prop="payerAccount">
              <el-input v-model="form.payerAccount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">            
            <el-form-item label="快递名称：" prop="expressName">
              <el-input v-model="form.expressName"></el-input>
            </el-form-item>
          </el-col>         
          <el-col :span="12">         
            <el-form-item label="快递单号：" prop="expressNum">       
              <el-input v-model="form.expressNum"></el-input>                    
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <page-header style="margin-top:50px" title="书目清单"></page-header> 
      <el-table
        ref="multipleTable"
        :data="tableData"
        :header-cell-style="{background:'#eef1f6', color:'#606266'}"
        tooltip-effect="dark"
        style="width: 70%; margin-left:100px"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :selectable="isa"></el-table-column>
        <el-table-column prop="title" label="书 目" width="300"></el-table-column>
        <el-table-column prop="price" label="单价"  width="120"></el-table-column>
        <el-table-column prop="quantity" label="订购数（册）">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.quantity" :min="0" size="mini" style="width: 50%" @blur="handleChange(scope.row)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计金额（元）" prop="total" width="120"></el-table-column>
      </el-table>
      <div style="margin-left:100px; margin-top:50px">合计：{{form.amount}}</div>
      <operation-wrapper style="margin-left:50px; margin-top:50px">
        <iep-button type="primary" @click="save">订购</iep-button>
      </operation-wrapper>
    </basic-container>
  </div>
</template>
<script>
import { getBookList }  from '@/api/book'
import { saveBookOrder, getBookOrderDetail } from '@/api/bookorder'
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系电话'))
      } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)) {
        callback(new Error('请输入正确的手机号码!'))
      } else {
          callback()
      }
    }
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },    
      },
      form: {
        department: '',
        address: '',
        contactName: '',
        phone: '',
        payerTitle: '',
        payerTaxNum: '',
        payerAddress: '',
        payerPhone: '',
        payerBank: '',
        payerAccount: '',
        amount: 0,
        // expressName: '',
        // expressNum: '',
        tybBookOrderLists: [],
      },
      rules: {
        department: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入收件地址', trigger: 'blur' },
        ],
        contactName: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        payerTitle: [
          { required: true, message: '请输入付款方名称', trigger: 'blur' },
        ],
        payerTaxNum: [
          { required: true, message: '请输入纳税人识别号', trigger: 'blur' },
        ],
        payerAddress: [
          { required: true, message: '请输入付款方地址', trigger: 'blur' },
        ],
        payerPhone: [
          { required: true, message: '请输入付款方电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
        payerBank: [
          { required: true, message: '请输入开户行', trigger: 'blur' },
        ],
        payerAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        // expressName: [
        //   { required: true, message: '请输入快递名称', trigger: 'blur' },
        // ],
        // expressNum: [
        //   { required: true, message: '请输入快递单号', trigger: 'blur' },
        // ],
      },
      tableData: [],
      multipleSelection: [],
    }
  },
  created () {
    this.bookList()
    if (this.$route.query.see) {
      getBookOrderDetail(this.$route.query.see).then(data => {
        this.form = data.data.data
        if (this.form.tybBookOrderLists) {
          this.tableData = this.form.tybBookOrderLists.map(m => {
            return {
              bookId: m.bookId,
              title: m.title,
              quantity: m.quantity,
              price: m.price,
              total: m.quantity * m.price,
            }
          })
          this.$nextTick(() => {
            this.tableData.forEach(v => {
              this.$refs['multipleTable'].toggleRowSelection(v)
            })
          })
        } else {
          this.tableData = []
        }
      })   
    }
  },
  methods: {
    bookList () {
      getBookList().then(data => {
        this.bookList = data.data.data.records
        this.tableData = this.bookList.map(v => {
          return {
            bookId: v.id,
            title: v.title,
            quantity: 0,
            price: v.price,
            total: 0,
          }
        })
      })
    },
    onGoBack () {
      // this.$router.go(-1)
      this.$router.push({
        path: '/textbook_spa/order_list',
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      if(JSON.stringify(this.$route.query) === '{}') {
        this.form.amount = 0
        this.multipleSelection.forEach(v => {
          this.form.amount += v.total
        })
      }
    },
    handleRowClick (row) {
      row.total = row.price * row.quantity
      if (this.multipleSelection.length > 0) {
        this.form.amount = 0
        this.multipleSelection.forEach(v => {
          this.form.amount += v.total
        })
      }
    },
    handleChange (row) {
      this.handleRowClick(row)
    },
    save () {
      if (this.form.amount === 0 && this.multipleSelection.length > 0) {
        this.$message.error('总计不能为空！')
        return
      }
      if (this.multipleSelection.length > 0) {
        this.form.tybBookOrderLists = this.multipleSelection
      }
      this.$refs.form.validate(valid => {
        if (this.multipleSelection.length === 0) {
          this.$message.error('教材订单书目清单不能为空！')
          valid = false
        }
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach(v => {
            if (v.total === 0) {
              this.$message.error('订购数不能为空！')
              valid = false
            }
          })
        }
        if (valid) {
          if (JSON.stringify(this.$route.query) === '{}') {
            saveBookOrder(this.form).then(() => {
              this.$message.success('提交成功！')
              this.$router.push({
                path: '/textbook_spa/order_list',
              })
            }).catch(err => {
              this.$message.error(err.msg)
            })
          }
        }
      })
    },
    isa () {
      return !this.isDisabled
    },
  },
  computed: {
    getTitle () {
      return `${ JSON.stringify(this.$route.query) === '{}' ? '新增' : '查看' }教材订购`
    },
    isDisabled () {
      return JSON.stringify(this.$route.query) === '{}' ? false : true 
    },
  },
  watch: {
  },
}
</script>