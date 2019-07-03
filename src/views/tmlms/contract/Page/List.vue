<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="合同"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button v-if="mlms_contract_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <div class="input-wrapper">
            <el-input :placeholder="placeholder" prefix-icon="el-icon-search" size="small" v-model="input" :maxlength="20">
              <iep-button class="search-btn" slot="append" @click="handleSearch">搜索</iep-button>
            </el-input>
            <el-popover placement="bottom-end" width="350" trigger="click">
                <el-form :model="form" label-width="120px" size="mini">
                  <el-form-item label="船名：">
                    <el-input v-model="form.shipName"></el-input>
                  </el-form-item>
                  <el-form-item label="船东身份证：">
                    <el-input v-model="form.shipownerIdcard"></el-input>
                  </el-form-item>
                  <el-form-item label="船员身份证：">
                    <el-input v-model="form.employeeIdcard"></el-input>
                  </el-form-item>
                  <el-form-item label="合同编号：">
                    <el-input v-model="form.contractNumber"></el-input>
                  </el-form-item>
                  <el-form-item label="日期区间：">
                    <div class="block">
                      <el-date-picker v-model="timeList" valueFormat="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <operation-wrapper>
                      <iep-button type="primary" @click="handleSearch">搜索</iep-button>
                      <iep-button @click="clearSearchParam">清空</iep-button>
                    </operation-wrapper>
                  </el-form-item>
                </el-form>
              <iep-button class="senior-btn el-icon-arrow-down" slot="reference"></iep-button>
            </el-popover>
          </div>
        </template>
      </operation-container>
      <avue-tree-table :option="options" style="margin-top: 20px;">
        <el-table-column label="操作">
          <template slot-scope="scope">                     
            <el-button type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row.contractId)">查看
            </el-button>
            <el-button type="text" icon="el-icon-view" size="mini" @click="handleDown(scope.row.contractId)">下载PDF
            </el-button>
            <el-button v-if="isShow(mlms_contract_edit, scope.row)" type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.contractId)">编辑
            </el-button>
            <el-button v-if="isShow(mlms_contract_del, scope.row)" type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.contractId)">删除
            </el-button>
            <el-button type="text" icon="el-icon-delete" size="mini" @click="handlePrint(scope.row.contractId)">打印
            </el-button>
          </template>
        </el-table-column>
      </avue-tree-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </basic-container>
  </div>
</template>

<script>
import { getContractList, deleteContract, getContract, getDict } from '@/api/tmlms/contract'
import { getUserInfo } from '@/api/login'
import { mapGetters } from 'vuex'
import contractPrint from './ContractPrint.vue'
import Vue from 'vue'    
import {downloadFile} from '../options'

export default {
  name: 'contract',
  props: {
    placeholder: {
      type: String,
      default: '请输入拥有者关键字搜索',
    },
    prop: {
      type: String,
      default: 'shipowner',
    },
  },
  data () {
    return {
      contractList: [],
      params: {
        current: 1,
        size: 10,
      },
      total: 0,
      mlms_contract_add: false,
      mlms_contract_view: false,
      mlms_contract_edit: false,
      mlms_contract_del: false,
      shipAttrDict: [],
      employeePayTypeDict: [],
      periodTypeDict: [],
      payComputeTypeDict: [],
      payTypeDict: [],
      input: '',
      form: {},
      timeList: [],
    }
  },
  created () {
    this.getContractList()
    this.getDicts()
    this.mlms_contract_add = this.permissions['mlms_contract_add']
    this.mlms_contract_view = this.permissions['mlms_contract_view']
    this.mlms_contract_edit = this.permissions['mlms_contract_edit']
    this.mlms_contract_del = this.permissions['mlms_contract_del']
  },
  computed: {
    ...mapGetters([
      'permissions',
    ]),
    options () {
      return {
        expandAll: false,
        columns: [
          {
            text: '合同ID',
            value: 'contractId',
            width: 100,
          },
          {
            text: '合同编号',
            value: 'contractNumber',
          },
          {
            text: '船舶拥有者',
            value: 'shipowner',
          },
          {
            text: '船名',
            value: 'shipName',
          },
          {
            text: '雇员姓名',
            value: 'employeeName',
          },
        ],
        data: this.contractList,
      }
    },
  },
  methods: {
    isShow (flag, contract) {
      let user = this.$store.getters.userInfo
      return flag && (user.userId === contract.userId || user.userId === contract.shipownerId || user.userId === contract.employeeId)
    },
    getContractList () {
      let params = Object.assign({}, this.params)
      // let userId = this.$store.getters.userInfo.user
      // console.log(this.$store.getters.userInfo.user)
      // params.userId = userId
      // params.shipownerId = userId
      // params.employeeId = userId
      getUserInfo().then(res => {
        if(res.data.data.roles.indexOf(111) !== -1 || res.data.data.roles.indexOf(1) !== -1){
          params = {}
        } else {
          params.userId = res.data.data.sysUser.userId
          params.shipownerId = res.data.data.sysUser.userId
          params.employeeId = res.data.data.sysUser.userId
        }
        getContractList(params).then(({data}) => {
          if (data.code === 0) {
            this.contractList = data.data.records
            this.total = data.data.total
          }
        }, (error) => {
          this.$message.error(error.message)
        })
      })
    },
    currentChange (current) {
      this.params.current = current
      this.getContractList()
    },
    handleAdd () {
      this.$emit('onAdd')
    },
    handleView (contractId) {
      this.$emit('onDetail', contractId)
    },
    handleEdit (contractId) {
      this.$emit('onEdit', contractId)
    },
    handleDel (contractId) {
      deleteContract(contractId).then((data) => {   
        if (data.data.code === 0) {
          this.$message.success('删除成功！')
          this.getContractList()
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    handlePrint (contractId) {            
      getContract(contractId).then(({data}) => {
        if (data.code == 0) {
          let formData = data.data
          let print = Vue.extend(contractPrint)
          let el = new print({
            propsData:{
              formData: formData,
              shipAttrDict: this.shipAttrDict,
              employeePayTypeDict: this.employeePayTypeDict,
              periodTypeDict: this.periodTypeDict,
              payComputeTypeDict: this.payComputeTypeDict,
              payTypeDict: this.payTypeDict,
            },
          }).$mount().$el
          let h = window.open('', '_blank')
          h.document.write(`
            <style>
              ul,li{list-style: none;}
              .body-width{width: 210mm;color: #333;margin:0 auto;font-size:14px;padding-top:10px;}
              .contract-table{border:solid 1px #606266;border-collapse:collapse;border-spacing:0px;width:100%;height: 297mm;overflow: hidden;}
              .contract-table td,.contract-table th{color:#606266;border-bottom: solid 1px #606266;border-right: solid 1px #333;height: 30px;line-height: 30px;text-align: center;font-size:14px;padding:10px 5px;}
              .contract-table td.check{text-align: left;padding:10px 30px;}
              .contract-table th{font-weight: normal;}
              .check el-date-picker{}
              .set-width .el-input{width: 50%;margin: 5px 0px;}
              .contract-table .el-checkbox-group{display: inline-block;}
              .con-cover{text-align: center;height: 297mm;overflow: hidden;}
              .cover-num{text-align: right;padding: 50px 0px;font-weight: bold;font-size:16px;margin-right: 50px;}
              .con-cover h1{font-size: 30px;font-weight: bold;margin-top: 150px;margin-bottom: 50px}
              .con-cover h2{font-size:24px;font-weight: bold;}
              .cover-tip{margin-top:600px;}
              .cover-tip p{margin-bottom: 30px;font-weight: bold;font-size:16px;}
              .body-width td.check{padding:0px 30px;}
              .con-detail{margin-top: 20px;}
              .con-detail h2{text-align: center;font-size: 20px;font-weight: bold;margin-top:15px;}
              .con-detail h3{font-size: 16px;font-weight: bold;margin-top: 15px;}
              .con-detail p{text-indent: 2em;line-height: 28px;margin-top: 15px;}
              .sign{margin-top: 30px;}
              .sign h3{font-size:16px;font-weight: bold;}
              .sign-name{margin-top: 10px;overflow: hidden;}
              .sign-name li{float: left;width: 50%;line-height: 30px;}
              .sign-see{margin-top: 30px;}
              .sign-see li{line-height: 30px;}
              .margin70{margin-top: 70px;}
            </style>
          `)
          h.document.write(el.outerHTML)      
          h.document.close()
          h.print()
          h.close()
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    getDicts () {                     
      getDict('tyb_contract_ship_attr').then(({data}) => {                            
        if (data.code === 0) this.shipAttrDict = data.data
      })
      getDict('tyb_contract_employee_pay_type').then(({data}) => {
        if (data.code === 0) this.employeePayTypeDict = data.data
      })
      getDict('tyb_contract_period_type').then(({data}) => {
        if (data.code === 0) this.periodTypeDict = data.data
      })
      getDict('tyb_contract_pay_compute_type').then(({data}) => {
        if (data.code === 0) this.payComputeTypeDict = data.data
      })
      getDict('tyb_contract_pay_type').then(({data}) => {
        if (data.code === 0) this.payTypeDict = data.data
      })
    },    
    async handleDown (contractId) {
              await getContract (contractId).then(({data}) => {
                    if(data.code === 0){
                            if(data.data.fileUrl === ''){
                                  this.$message.error('该合同还没有上传pdf文件')
                            }
                            downloadFile(data.data.fileUrl)
                    }
              })
              //this.$message.success('下载成功')
    },
    handleSearch () {
      this.form[this.prop] = this.input
      var params = {}
      console.log(this.timeList)
      if (this.timeList) {
        this.form.periodDateStart = this.timeList[0]
        this.form.periodDateEnd = this.timeList[1]
      }
      getUserInfo().then(res => {
        if(res.data.data.roles.indexOf(111) !== -1 || res.data.data.roles.indexOf(1) !== -1){
          params = {...this.form}
          console.log(params)
        } else {
          params = {...this.form}
          params.userId = res.data.data.sysUser.userId
          params.shipownerId = res.data.data.sysUser.userId
          params.employeeId = res.data.data.sysUser.userId
        }
        getContractList(params).then(({data}) => {
          if (data.code === 0) {
            this.contractList = data.data.records
            this.total = data.data.total
          }
        }, (error) => {
          this.$message.error(error.message)
        })
      })
    },
    clearSearchParam () {
      this.form = {}
      this.timeList = []
    },
  },
}
</script>

<style lang="scss" scoped>
.contract-box {
  padding: 20px;
}
</style>

<style scoped>
.input-wrapper {
  display: flex;
  max-width: 350px;
}
.input-wrapper > * {
  margin-right: 5px;
}
.input-wrapper >>> .el-input.is-active .el-input__inner {
  border-color: #c0c4cc;
}
.input-wrapper >>> .el-input__inner:focus {
  border-color: #c0c4cc;
}
.input-wrapper >>> .senior-btn {
  margin-left: -6px;
  padding: 9px 5px;
  border-radius: 0 3px 3px 0;
}
.input-wrapper >>> .el-input-group {
  width: inherit;
}
.search-btn:hover,
.search-btn:focus {
  opacity: 0.8;
}
</style>