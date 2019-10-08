<template>
  <div class="contract-box">
    <basic-container>
      <page-header title="网签合同"></page-header>
            <operation-container>
        <template slot="left">
          <iep-button v-if="mlms_contract_add" @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <span><el-input v-model="params.shipName" placeholder="船名号" size="small" style="width:120px"></el-input></span>
          <span><el-input v-model="params.shipownerName" placeholder="持证人姓名" size="small" style="width:120px"></el-input></span>
          <span><el-input v-model="params.employerName" placeholder="甲方姓名" size="small" style="width:120px"></el-input></span>
          <span><el-input v-model="params.employeeName" placeholder="乙方姓名" size="small" style="width:120px"></el-input></span>
          <span style="width:240px"><el-date-picker v-model="params.timeLists" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" 
            value-format="yyyy-MM-dd"  size="mini"></el-date-picker>
          </span>
          <span style="width:120px"><el-select v-model="conStatus" placeholder="请选择合同状态" size="small">
              <el-option
                v-for="item in statusDict"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
          </span>
          <el-button size="small"  @click="getParamData">搜索</el-button> 
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
        <!-- <el-table-column
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
          </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
             <el-button v-if="mlms_contract_view" type="text" icon="el-icon-view" size="mini" @click="handleView(scope.row.contractId)">合同查看
            </el-button>
            <el-button v-if="(mlms_contract_edit && scope.row.status === '未审核') || (mlms_contract_edit && scope.row.status === '未通过审核')"  type="text" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row.contractId)">编辑
            </el-button>
            <el-button v-if="mlms_contract_del && scope.row.status === '未通过审核'" type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row.contractId)">删除
            </el-button>
            <el-button v-if="mlms_contract_rev && scope.row.status === '未审核'" type="text" icon="el-icon-edit" size="mini" @click="handleReview(scope.row.contractId)">审核
            </el-button>
            <iep-button v-if="mlms_contract_rec && scope.row.status === '未通过审核'" type="text" icon="el-icon-edit" size="mini" @click="handleRecord(scope.row.contractId)">审核记录
            </iep-button>
            <el-button v-if="mlms_contract_pri && scope.row.status === '合同成立'" type="text" icon="el-icon-delete" size="mini" @click="handlePrint(scope.row.contractId)">打印
            </el-button>
            <el-button v-if="mlms_contract_rel && scope.row.status === '合同成立'" type="text" icon="el-icon-edit" size="mini" @click="handleRelieve(scope.row.contractId)">解除
            </el-button>
            <el-button v-if="mlms_relieve_rel && scope.row.status === '合同成立'" type="text" icon="el-icon-edit" size="mini" @click="goTo(scope.row.contractId)">申请解除
            </el-button>
            <el-button v-if="mlms_contract_com && scope.row.status === '合同纠纷'" type="text" icon="el-icon-edit" size="mini" @click="go(scope.row.contractId)">投诉管理
            </el-button>
            <el-button v-if="mlms_contract_eva && scope.row.status === '合同解除' && scope.row.isRate === 0 " type="text" icon="el-icon-edit" size="mini" @click="handleEvaluate(scope.row.contractId)">评价
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
      <el-dialog title="提示" :visible.sync="revDialog" width="30%" :before-close="canClose">
        <p>是否通过此合同？如拒绝请输入拒绝理由：</p>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="content"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="agreeReview">同 意</el-button>
          <el-button type="primary" @click="cancelReview">拒 绝</el-button>
        </span>
      </el-dialog>
      <el-dialog title="提示" :visible.sync="relDialog" width="30%" :before-close="relClose">
        <p>是否解除此合同？如拒绝请输入解除理由：</p>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="relform.content"></el-input>
        <span>图片：</span>
        <el-upload
          class="avatar-uploader"
          action="/api/admin/file/upload/avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess" :headers="headers"  accept="image/*">
         <img v-if="relform.image" :src="relform.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="agreeRelieve">同 意</el-button>
          <el-button type="primary" @click="relClose">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="aName" :visible.sync="seaDialog" width="30%" :before-close="seaClose">  
        <el-row>
          <el-col :span="6">
            <span>工作环境：</span>
          </el-col>
          <el-col :span="12">
            <el-rate v-model="rateList.rateEnv"></el-rate>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>劳务关系：</span>
          </el-col>
          <el-col :span="12">
            <el-rate v-model="rateList.rateEmploy"></el-rate>
          </el-col>
        </el-row>
        <el-row>
          <span>评价：</span>
          <el-input type="textarea" v-model="rateList.content"></el-input>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="seaClose">取 消</el-button>
          <el-button type="primary" @click="seaSave">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="bName" :visible.sync="ownDialog" width="30%" :before-close="ownClose">
        <el-row>
          <el-col :span="6">
            <span>作业技能：</span>
          </el-col>
          <el-col :span="12">
            <el-rate v-model="rateList.rateSkill"></el-rate>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span>身体素质：</span>
          </el-col>
          <el-col :span="12">
            <el-rate v-model="rateList.rateBody"></el-rate>
          </el-col>
        </el-row>
        <el-row>
          <span>评价：</span>
          <el-input type="textarea" v-model="rateList.content"></el-input>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ownClose">取 消</el-button>
          <el-button type="primary" @click="ownSave">确 定</el-button>
        </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
import {
  getContractList, 
  deleteContract,
  // getContract,
  getDict, reviewContract, cancelContract, getContractDetail } from '@/api/tmlms/newContract'
import { saveRate, getRate } from '@/api/tmlms/rate'
import { getUserInfo } from '@/api/login'
import { mapGetters } from 'vuex'
// import contractPrint from '../../contract/Page/ContractPrint.vue'
// import Vue from 'vue'
import store from '@/store'
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
      aName: '',
      bName: '',
      contractList: [],
      params: {
        shipName: '',
        shipownerName: '',
        employerName: '',
        employeeName: '',
        timeLists:'', 
        status: '',
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
      mlms_relieve_rel: false,
      mlms_contract_com: false,
      mlms_contract_eva: false,
      mlms_contract_rec: false,
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
      conStatus: '',
      revDialog: false,
      seaDialog: false,
      ownDialog: false,
      relDialog: false,
      cd: '',
      content: '',
      rateList: {
        contractId: '',
        type: '',
        employerName: '',
        employerIdcard: '',
        employeeName: '',
        employeeIdcard: '',
        rateEnv: '',
        rateEmploy: '',
        rateSkill: '',
        rateBody: '',
        content: '',
      },
      idCardVal: '',
      nameVal: '',
      obj: {},
      relform: {
        contractId: '',
        content: '',
        image: '',
      },
      rd: '',
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      rateType: 0,
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
    this.mlms_relieve_rel = this.permissions['mlms_relieve_rel']
    this.mlms_contract_com = this.permissions['mlms_contract_com']
    this.mlms_contract_eva = this.permissions['mlms_contract_eva']
    this.mlms_contract_rec = this.permissions['mlms_contract_rec']
    getUserInfo().then(res => {
      if (res.data.data.roles.indexOf(111) !== -1) {
        this.mangner = true
      } else {
        this.mangner = false
      }
      this.idCardVal = res.data.data.sysUser.idCard
      this.nameVal = res.data.data.sysUser.realName
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
            text: '船名',
            value: 'shipName',
          },
          {
            text: '持证人',
            value: 'shipownerName',
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
            text: '合同创建日期',
            value: 'createTime',
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
    async getContractList () {
      this.rateType = await getUserInfo().then(res => {
        if (res.data.data.roles.indexOf(105) !== -1) {
          return 2
        }
        if (res.data.data.roles.indexOf(108) !== -1) {
          return 1
        } 
      })
      getContractList(this.params).then(({data}) => {
        if (data.code === 0) {
          this.contractList = data.data.records
          this.contractList.forEach(v => {
            this.statusDict.forEach(m => {
              if (v.status === m.lable) {
                v.status = m.value
              }
            })
            getRate({contractId: v.contractId, type: this.rateType}).then(res => {
              if(res.data.data.records.length !== 0) {
                this.$set(v, 'isRate', 1)
              } else {
                this.$set(v, 'isRate', 0)
              }
            })

          })
          // this.contractList.forEach( item=>{
            // if(item.status === '合同成立'){
            //   item.swith = true
            // }else{
            //   item.swith = false
            // }   
          // })
          this.total = data.data.total
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    getParamData () {
      if (this.params.timeLists) {
        this.params.timeStart = this.params.timeLists[0]
        this.params.timeEnd = this.params.timeLists[1]
      }
      if (this.conStatus) {
        this.statusDict.forEach(m => {
          if(m.value === this.conStatus) {
            this.params.status = m.lable
          }
        })
      }
      this.params.current = 1
      this.getContractList()
    },
    currentChange (current) {
      this.params.current = current
      this.getContractList()
    },
    handleAdd () {
      this.$emit('onAdd')
    },
    handleRecord (contractId) {
      this.$emit('onRecord', contractId)
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
      this.$confirm('此操作将永久删除该合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteContract(contractId), (error) => {
          this.$message.error(error.message)
        }
        this.$message.success('删除成功！')
        this.getContractList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      }) 
    },
    agreeReview () {
      let data = 1
      reviewContract({contractId: this.cd, status: data}).then(() =>{
        this.$message.success('审核通过！')
        this.getContractList()
        this.revDialog = false
      }).catch(() => {
        this.$message.console.error('审核通过失败！')
      })
    },
    cancelReview () {
      let data = 2
      if (this.content && this.content !== '') {
        reviewContract({contractId: this.cd, status: data, content: this.content}).then(() =>{
          this.$message.success('审核不通过')
          this.getContractList()
          this.revDialog = false
        }).catch(() => {
          this.$message.console.error('审核不通过失败！')
        })
      } else {
        this.$message.error('请填写理由！')
      }
      
    },
    handleReview (contractId) {
      this.revDialog = true
      this.cd = contractId
    },
    handleRelieve (contractId) {
      this.relDialog = true
      this.rd = contractId
    },
    async agreeRelieve () {
      this.contStatus = await getContractDetail(this.rd).then(res => {
        return res.data.data.status
      })
      this.$confirm('此操作将解除该合同', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning',
      }).then(() => {
        this.relform.contractId = this.rd
        if(this.relform.content === '') {
          this.$message.error('请输入解除理由！')
        } else if (this.relform.image === '') {
          this.$message.error('请上传图片证明！')
        } else {
          if (this.contStatus === 1) {
            cancelContract(this.relform).then(() => {
              this.relDialog = false
              this.$message.success('解除成功！')
              this.getContractList()
            }).catch(() => {
              this.$message.error('解除失败！')
            })
          } else {
            this.$message.error('合同状态不正确，需要管理员审核！')
          }
        }  
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解除',
        })
      })  
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
      if (this.timeList) {
        this.form.periodDateStart = this.timeList[0]
        this.form.periodDateEnd = this.timeList[1]
      }
      getUserInfo().then(res => {
        if(res.data.data.roles.indexOf(111) !== -1 || res.data.data.roles.indexOf(1) !== -1){
          params = {...this.form}
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
    goTo (contractId) {
      this.$router.push({ 
        path: `/tmlms_spa/contractCancel_list/${contractId}`, 
      })
    },
    go (contractId) {
      this.$router.push({ 
        path: `/tmlms_spa/contractCancel_admin/${contractId}`, 
      })
    },
    canClose () {
      this.revDialog = false
      this.content = ''
    },
    relClose () {
      this.relDialog = false
      this.relform.content = ''
      this.relform.image = ''
    },
    handleEvaluate (val) {
      this.rateList.contractId = val
      getContractDetail(val).then(data => {
        this.obj = data.data.data
        if (this.obj.employerIdcard === this.idCardVal) {
          this.rateList.type = 1
          this.rateList.employerName = this.nameVal
          this.rateList.employerIdcard = this.idCardVal
          this.rateList.employeeName = this.obj.employeeName
          this.rateList.employeeIdcard = this.obj.employeeIdcard
          this.ownDialog = true 
          this.bName = '对' + this.obj.employeeName + '评价：'
        } else if (this.obj.employeeIdcard === this.idCardVal) {
          this.rateList.type = 2
          this.rateList.employeeName = this.nameVal
          this.rateList.employeeIdcard = this.idCardVal
          this.rateList.employerName = this.obj.employerName
          this.rateList.employerIdcard = this.obj.employerIdcard
          this.seaDialog = true
          this.aName = '对' + this.obj.employerName + '评价：'
        }
      })
    },
    ownClose () {
      this.ownDialog = false
      this.rateList = {}
    },
    seaClose () {
      this.seaDialog = false
      this.rateList = {}
    },
    seaSave () {
      if (this.rateList.rateEnv === 0) {
        this.$message.error('请给工作环境打分！')
      } else if (this.rateList.rateEmploy === 0) {
        this.$message.error('请给劳务关系打分！')
      } else if (this.rateList.content === '') {
        this.$message.error('评价不能为空！')
      } else {
        saveRate(this.rateList).then(() => {
          this.$message.success('评分成功！')
          this.seaDialog = false
          this.rateList = {}
          this.getContractList()
        }).catch(err => {
          this.$message.error(err.message)
        })
      }  
    },
    ownSave () {
      if (this.rateList.rateSkill === 0) {
        this.$message.error('请给作业技能打分！')
      } else if (this.rateList.rateBody === 0) {
        this.$message.error('请给身体素质打分！')
      } else if (this.rateList.content === '') {
        this.$message.error('评价不能为空！')
      } else {
        saveRate(this.rateList).then(() => {
          this.$message.success('评分成功！')
          this.ownDialog = false
          this.rateList = {}
          this.getContractList()
        }).catch(err => {
          this.$message.error(err.message)
        })
      } 
    },
    handleAvatarSuccess (res) {
      this.relform.image = res.data.url
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>