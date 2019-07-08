<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="网签合同"></page-header>
      <iep-button v-if="mlms_contract_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
      <avue-tree-table :option="options" style="margin-top: 20px;">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row.contractId)">查看
            </el-button>
            <el-button type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.contractId)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.contractId)">删除
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
import { getContractListAdmin, deleteContract, getContract, getDict } from '@/api/tmlms/contract'
import { mapGetters } from 'vuex'
import contractPrint from '../../contract/Page/ContractPrint.vue'
import Vue from 'vue'
export default {
  name: 'contract',
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
    getContractList () {
      getContractListAdmin(this.params).then(({data}) => {
        if (data.code === 0) {
          this.contractList = data.data.records
          this.total = data.data.total
        }
      }, (error) => {
        this.$message.error(error.message)
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
      // this.$emit('onDetail', contractId)
      let urlHttp = window.location.href.split('//')[0]
      let urlHeade = window.location.href.split('/')[0,2]
      window.open(`${urlHttp}//${urlHeade}/tmlms_spa/contract_detail?id=${contractId}`, '_blank')
      // getContract(contractId).then(({data}) => {
      //   if (data.code == 0) {
      //     let formData = data.data
      //     let print = Vue.extend(contractPrint)
      //     let el = new print({
      //       propsData:{
      //         formData: formData,
      //         shipAttrDict: this.shipAttrDict,
      //         employeePayTypeDict: this.employeePayTypeDict,
      //         periodTypeDict: this.periodTypeDict,
      //         payComputeTypeDict: this.payComputeTypeDict,
      //         payTypeDict: this.payTypeDict,
      //       },
      //     }).$mount().$el
      //     let h = window.open('http://localhost:8090/wel/index')
      //     h.document.write(`
      //       <style>
      //          ul,li{list-style: none;}
      //         .body-width{width: 210mm;color: #333;}
      //         #contract{margin:0px auto;font-size:14px;}
      //         .contract-table{border:solid 1px #606266;border-collapse:collapse;border-spacing:0px;width:90%;height: 297mm;overflow: hidden;margin:20mm auto;}
      //         .contract-table td,.contract-table th{color:#606266;border-bottom: solid 1px #606266;border-right: solid 1px #333;height: 30px;line-height: 30px;text-align: center;font-size:12px;}
      //         .contract-table td.check{text-align: left;padding:10px 30px;}
      //         .contract-table th{font-weight: normal;padding:0px 10px;}
      //         .check el-date-picker{}
      //         .set-width .el-input{width: 50%;margin: 5px 0px;}
      //         .contract-table .el-checkbox-group{display: inline-block;}
      //         .con-cover{text-align: center;height: 297mm;overflow: hidden;}
      //         .cover-num{text-align: right;padding: 80px 0px;font-weight:normal;font-size:18px;margin-right: 50px;}
      //         .con-cover h1{font-size: 30px;font-weight: bold;margin-top: 120px;margin-bottom: 50px}
      //         .con-cover h2{font-size:30px;font-weight: bold;}
      //         .cover-tip{margin-top:600px;}
      //         .cover-tip p{margin-bottom: 40px;font-weight:normal;font-size:18px;}
      //         .body-width td.check{padding:0px 30px;}
      //         .con-detail{width:90%;margin:0 auto;margin-top:220px;}
      //         .con-detail h2{text-align: center;font-size: 20px;font-weight: bold;}
      //         .con-detail h3{font-size: 16px;font-weight: bold;margin-top: 15px;}
      //         .con-detail p{text-indent: 2em;line-height: 35px;font-size:16px;}
      //         .con-detail .special{text-decoration: underline;}
      //         .sign{width:90%;margin:0 auto;margin-top: 50px;font-size:16px;}
      //         .sign span{padding-left: 50px;}
      //         .sign h3{font-size:18px;font-weight: bold;}
      //         .sign i{font-style: normal;padding-left: 20px;}
      //         .sign-name{margin-top: 10px;overflow: hidden;}
      //         .sign-name li{float: left;width: 50%;line-height: 30px;}
      //         .sign-see{margin-top: 30px;}
      //         .sign-see li{line-height: 30px;}
      //         .margin70{margin-top: 70px;}
      //         .margin160{margin-top: 160px;}
      //       </style>
      //     `)
      //     h.document.write(el.outerHTML)
      //     h.document.close()
      //     // h.print()
      //     // h.close()
      //   }
      // }, (error) => {
      //   this.$message.error(error.message)
      // })
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
              .body-width{width: 210mm;color: #333;}
              #contract{margin:0px auto;font-size:14px;}
              .contract-table{border:solid 1px #606266;border-collapse:collapse;border-spacing:0px;width:90%;height: 297mm;overflow: hidden;margin:20mm auto;}
              .contract-table td,.contract-table th{color:#606266;border-bottom: solid 1px #606266;border-right: solid 1px #333;height: 30px;line-height: 30px;text-align: center;font-size:12px;}
              .contract-table td.check{text-align: left;padding:10px 30px;}
              .contract-table th{font-weight: normal;padding:0px 10px;}
              .check el-date-picker{}
              .set-width .el-input{width: 50%;margin: 5px 0px;}
              .contract-table .el-checkbox-group{display: inline-block;}
              .con-cover{text-align: center;height: 297mm;overflow: hidden;}
              .cover-num{text-align: right;padding: 80px 0px;font-weight:normal;font-size:18px;margin-right: 50px;}
              .con-cover h1{font-size: 30px;font-weight: bold;margin-top: 120px;margin-bottom: 50px}
              .con-cover h2{font-size:30px;font-weight: bold;}
              .cover-tip{margin-top:600px;}
              .cover-tip p{margin-bottom: 40px;font-weight:normal;font-size:18px;}
              .body-width td.check{padding:0px 30px;}
              .con-detail{width:90%;margin:0 auto;margin-top:220px;}
              .con-detail h2{text-align: center;font-size: 20px;font-weight: bold;}
              .con-detail h3{font-size: 16px;font-weight: bold;margin-top: 15px;}
              .con-detail p{text-indent: 2em;line-height: 35px;font-size:16px;}
              .con-detail .special{text-decoration: underline;}
              .sign{width:90%;margin:0 auto;margin-top: 50px;font-size:16px;}
              .sign span{padding-left: 50px;}
              .sign h3{font-size:18px;font-weight: bold;}
              .sign i{font-style: normal;padding-left: 20px;}
              .sign-name{margin-top: 10px;overflow: hidden;}
              .sign-name li{float: left;width: 50%;line-height: 30px;}
              .sign-see{margin-top: 30px;}
              .sign-see li{line-height: 30px;}
              .margin70{margin-top: 70px;}
              .margin160{margin-top: 160px;}
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
  },
}
</script>

<style lang="scss" scoped>
.contract-box {
  padding: 20px;
}
</style>