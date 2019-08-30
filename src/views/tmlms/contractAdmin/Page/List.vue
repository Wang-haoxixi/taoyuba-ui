<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="网签合同"></page-header>
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
                      <el-date-picker v-model="timeList" value-format="yyyy-MM-dd HH:mm:ss" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
        <!-- <el-table-column label="是否审核" prop="status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"
            @change="handleReview(scope.row.swith, scope.row.contractId)">
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column
            prop="status"
            label="是否审核"
            width="100"
            v-if="mangner"
          >
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.swith"
                active-color="#13ce66"
                @change="handleReview(scope.row.swith,scope.row.contractId)"
                inactive-color="#ff4949">
              </el-switch>
            </div>
          </template>
          </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
             <el-button v-if="mlms_contract_view" type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row.contractId)">合同查看
            </el-button>
            <el-button v-if="(mlms_contract_edit && scope.row.status === '未审核') || (mlms_contract_edit && scope.row.status === '未通过审核')"  type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.contractId)">编辑
            </el-button>
            <el-button v-if="mlms_contract_del" type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.contractId)">删除
            </el-button>
            <!-- <el-button v-if="mlms_contract_rev" type="text" icon="el-icon-edit" size="mini" @click="handleReview(scope.row.contractId)">审核
            </el-button> -->
            <el-button v-if="mlms_contract_pri" type="text" icon="el-icon-delete" size="mini" @click="handlePrint(scope.row.contractId)">打印
            </el-button>
            <el-button v-if="mlms_contract_rel" type="text" icon="el-icon-edit" size="mini" @click="handleRelieve(scope.row.contractId)">解除
            </el-button>
          </template>
        </el-table-column>
      </avue-tree-table>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
      <iframe id="iframe"
          style="visibility: hidden;"
          title="Inline Frame Example"
          width="300"
          height="200">
      </iframe>
    </basic-container>
  </div>
</template>

<script>
import {
  getContractList, deleteContract,
  // getContract,
  getDict, reviewContract, cancelContract, getContractDetail } from '@/api/tmlms/newContract'
import { getUserInfo } from '@/api/login'
import { mapGetters } from 'vuex'
// import contractPrint from '../../contract/Page/ContractPrint.vue'
// import Vue from 'vue'
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
      mlms_contract_rev: false,
      mlms_contract_pri: false,
      mlms_contract_rel: false,
      shipAttrDict: [],
      employeePayTypeDict: [],
      periodTypeDict: [],
      payComputeTypeDict: [],
      payTypeDict: [],
      input: '',
      form: {
      },
      timeList: [],
      statusDict: [
        {
          lable: 0,
          value: '未审核',
        },
        {
          lable: 1,
          value: '合同成立',
        },
        {
          lable: 2,
          value: '未通过审核',
        },
        {
          lable: 3,
          value: '合同纠纷',
        },
        {
          lable: 4,
          value: '合同解除',
        },
        {
          lable: 5,
          value: '合同过期',
        },
      ],
      contStatus: '',
      contractAddr: '',
      mangner: false,
    }
  },
  created () {
    this.getContractList()
    this.getDicts()
    this.mlms_contract_add = this.permissions['mlms_contract_add']
    this.mlms_contract_view = this.permissions['mlms_contract_view']
    this.mlms_contract_edit = this.permissions['mlms_contract_edit']
    this.mlms_contract_del = this.permissions['mlms_contract_del']
    this.mlms_contract_rev = this.permissions['mlms_contract_rev']
    this.mlms_contract_pri = this.permissions['mlms_contract_pri']
    this.mlms_contract_rel = this.permissions['mlms_contract_rel']
    getUserInfo().then(res => {
      if (res.data.data.roles.indexOf(111) !== -1) {
        this.mangner = true
      } else {
        this.mangner = false
      }
    })
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
            text: '船名',
            value: 'shipName',
          },
          {
            text: '雇主（甲方）',
            value: 'employerName',
          },
          {
            text: '雇员（乙方）',
            value: 'employeeName',
          },
          {
            text: '合同状态',
            value: 'status',
          },
        ],
        data: this.contractList,
      }
    },
  },
  methods: {
    getContractList () {
      getContractList(this.params).then(({data}) => {
        if (data.code === 0) {
          this.contractList = data.data.records
          this.contractList.forEach(v => {
            this.statusDict.forEach(m => {
              if (v.status === m.lable) {
                v.status = m.value
              }
            })
          })
          this.contractList.forEach( item=>{
            if(item.status === '合同成立'){
              item.swith = true
            }else{
              item.swith = false
            }
          })
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
      // let urlHttp = window.location.href.split('//')[0]
      let urlHeade = window.location.href.split('/')[0,2]
      let  dataMap  = '%7B%7D'
      // let Base64 = require('js-base64').Base64
      // let rlt = Base64.encodeURI(`id=${contractId}`)
    //  window.open(`${urlHttp}//${urlHeade}/tmlms/downLoad/intoContractHtml?${rlt}`)
       this.$openPage(`//${urlHeade}/api/tmlms/downLoad/intoContractHtml?contractId=${contractId}&dataMap=${dataMap}`,'url')
      // window.location.href = `//${urlHeade}/tmlms/downLoad/intoContractHtml?contractId=${contractId}&dataMap=${dataMap}`
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
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.$message.success('删除成功！')
            this.getContractList()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    handleReview (switchs, contractId) {
      let data = ''
      if(switchs){
        data = 1
      }else{
        data = 2
      }
      reviewContract({contractId: contractId, status: data}).then(() =>{
        this.$message.success('审核成功')
        this.getContractList()
      }).catch(() => {
        this.$message.console.error('审核失败！')
      })
    },
    async  handleRelieve (contractId) {
      this.contStatus = await getContractDetail(contractId).then(res => {
        return res.data.data.status
      })
      if (this.contStatus === 1) {
        cancelContract({contractId: contractId}).then(() => {
          this.$message.success('解除成功！')
          this.getContractList()
        }).catch(() => {
          this.$message.error('解除失败！')
        })
      } else {
        this.$message.error('合同状态不正确，需要管理员审核！')
      }
    },
    handlePrint (contractId) {
      let urlHeade = window.location.origin
      let  dataMap  = '%7B%7D'
      let url = `${urlHeade}/api/tmlms/downLoad/intoContractHtml?contractId=${contractId}&dataMap=${dataMap}`
      // console.log('url',url)
      let iframe = window.document.getElementById('iframe')
      iframe.src = url
      iframe.onload = function () {
        iframe.contentWindow.focus()
        iframe.contentWindow.print()
      }
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
      //     console.log(el,print)
      //     let h = window.open('http://localhost:8090/api/tmlms/downLoad/intoContractHtml?contractId=8&dataMap=%7B%7D', '_blank')
      //     // h.document.write(`
      //     //   <style>
      //     //    @page {
      //     //       size: A4 portrait;
      //     //       margin: 3.7cm 2.6cm 3.5cm;
      //     //     }
      //     //     .con-cover,.contract-table,.con-detail{
      //     //         page-break-before: always;
      //     //       }
      //     //       h1, h2, h3, h4, h5 { page-break-after: avoid; }
      //     //       table, figure{ page-break-inside: avoid; }
      //     //       *{padding: 0px;margin:0px;}
      //     //     ul,li{list-style: none;}
      //     //     .body-width{width: 210mm;color: #333;}
      //     //     #contract{margin:0px auto;font-size:14px;}
      //     //     .contract-table{border:solid 1px #606266;border-collapse:collapse;border-spacing:0px;width:100%; height: 297mm;overflow: hidden;}
      //     //     .contract-table td,.contract-table th{color:#606266;border-bottom: solid 1px #606266;border-right: solid 1px #333;text-align: center;font-size:12px;padding:10px;}
      //     //     .contract-table td.check{text-align: left;padding: 10px 25px 10px 10px;}
      //     //     .contract-table td label{display: inline-block; width:100px;}
      //     //     .contract-table th{font-weight: normal;padding:0px 10px;}
      //     //     .contract-table td label{display: inline-block; width:80px;}
      //     //     .check el-date-picker{}
      //     //     .set-width .el-input{width: 50%;margin: 5px 0px;}
      //     //     .contract-table .el-checkbox-group{display: inline-block;}
      //     //     .con-cover{text-align: center;height: 297mm;overflow: hidden;}
      //     //     .cover-num{text-align: right;padding: 20px 0px;font-weight:normal;font-size:18px;margin-right: 50px;}
      //     //     .con-cover h1{font-size: 30px;font-weight: bold;margin-top: 180px;margin-bottom: 50px}
      //     //     .con-cover h2{font-size:30px;font-weight: bold;}
      //     //     .cover-tip{margin-top:750px;}
      //     //     .cover-tip p{margin-bottom: 40px;font-weight:normal;font-size:18px;}
      //     //     .con-detail{width:100%;margin:0 auto;}
      //     //     .con-detail h2{text-align: center;font-size: 20px;font-weight: bold;}
      //     //     .con-detail h3{font-size: 16px;font-weight: bold;margin-top: 15px;}
      //     //     .con-detail p{text-indent: 2em;line-height: 32px;font-size:16px;}
      //     //     .con-detail .special{text-decoration: underline;}
      //     //     .sign{width:100%;margin:0 auto;margin-top: 50px;font-size:16px;}
      //     //     .sign span{padding-left: 50px;}
      //     //     .sign h3{font-size:18px;font-weight: bold;}
      //     //     .sign i{font-style: normal;padding-left: 20px;}
      //     //     .sign-name{margin-top: 10px;overflow: hidden;}
      //     //     .sign-name li{float: left;width: 50%;line-height: 30px;}
      //     //     .sign-see{margin-top: 30px;}
      //     //     .sign-see li{line-height: 30px;}
      //     //     .margint10{margin-top: 10px;}
      //     //     .contract-table .el-checkbox__label{font-size:12px;}
      //     //     .paylist{text-align: center;}
      //     //     .paylist .el-checkbox-group{text-align: left;}
      //     //     .paylist .el-checkbox{margin-right: 0px;}
      //     //     .paylist .el-checkbox-group label{width:60px;}
      //     //     .contract-table .textL10{text-align: left;}
      //     //   </style>
      //     // `)
      //     // h.document.write(el.outerHTML)
      //     // h.document.close()
      //     h.print()
      //     // h.close()
      //   }
      // }, (error) => {
      //   this.$message.error(error.message)
      // })
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
