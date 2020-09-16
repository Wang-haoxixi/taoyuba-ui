<template>
  <div class="contract">
    <basic-container id="pdfDom">
      <page-header :title="getTitle"></page-header>
      <el-form :disabled="type !== 'add' && type !== 'edit'" :model="formData" size="small" ref="form" label-width="120px"
        :rules="rules" class="form" >
        <el-container>
          <el-aside class="side">
            <div class="tex">持证人信息</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="持证人姓名：" prop="shipownerName">
                    <el-input maxlength="6" v-model="formData.shipownerName" style="width:380px" :disabled="shipowner"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="shipownerIdcard">
                    <el-input maxlength="18" v-model="formData.shipownerIdcard" style="width:380px" :disabled="shipowner"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <!-- <el-form-item label="船名：" prop="shipName">
                    <el-input maxlength="20" v-model="formData.shipName"></el-input>
                  </el-form-item> -->
                  <el-form-item label="船名：" prop="shipName">
                    <el-select v-model="formData.shipName"
                              placeholder="请选择"
                              filterable
                              remote
                              maxlength="20"
                              :loading="loading"
                              clearable
                              @change="shipNameChange"
                              :remote-method="getShipNameList" style="width:380px!important">
                      <el-option v-for="item in shipNames" :key="item.shipId" :label="item.shipName" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="船舶登记号：" prop="shipLicenses">
                    <el-input maxlength="20" v-model="formData.shipLicenses" style="width:380px"  :disabled="shipowner"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系电话：" prop="shipownerPhone">
                    <el-input maxlength="11" v-model="formData.shipownerPhone" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="家庭地址：" prop="shipownerAddr">
                    <el-input maxlength="100" v-model="formData.shipownerAddr" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <el-container>
          <el-aside class="sidea">
            <div class="tex">甲方（雇主）</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名：" prop="employerName">
                    <el-input maxlength="6" v-model="formData.employerName" style="width:380px" :disabled="employer"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="employerIdcard">
                    <el-input maxlength="18" v-model="formData.employerIdcard" style="width:380px" :disabled="employer"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="签约人身份性质：" prop="employerProp">
                    <el-radio-group v-model="formData.employerProp" @change="employerPropChange">
                      <el-radio :label="1">船舶持证人</el-radio>
                      <el-radio :label="2">船舶承租人</el-radio> 
                      <el-radio :label="3">船长或授权代理人</el-radio> 
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="船名及船舶登记号：">
                    <div>
                      <div v-if="formData.shipName && !(formData.shipName instanceof Object)" style="font-size:10px">船名：{{formData.shipName}}</div>
                      <div v-if="formData.shipName.shipName" style="font-size:10px">船名：{{formData.shipName.shipName}}</div>
                      <div v-if="!formData.shipName && !formData.shipName.shipName" style="font-size:10px">船名：</div>
                      <div style="font-size:10px">船舶登记号：{{formData.shipLicenses}}</div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系电话：" prop="employerPhone">
                    <el-input maxlength="20" v-model="formData.employerPhone" style="width:380px" :disabled="employer"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="船舶是否共有：" prop="shipJoint">
                    <el-radio-group v-model="formData.shipJoint">
                      <el-radio :label="1">是，<el-input v-model="formData.shipJointYes" placeholder="人数（数字）" size="mini" type='number' style="width:100px"></el-input>共有（权证附后）</el-radio>
                      <el-radio :label="0">否，{{formData.shipownerName}} 独有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">  
                  <el-form-item label="地址：" prop="employerAddr">
                    <el-input maxlength="20" v-model="formData.employerAddr" style="width:380px" :disabled="employer"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <el-container>
          <el-aside class="sideb">
            <div class="tex">乙方（雇员）</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名：" prop="employeeName">
                    <el-input maxlength="6" v-model="formData.employeeName" style="width:380px" :disabled="employee"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="employeeIdcard">
                    <el-input maxlength="18" v-model="formData.employeeIdcard" style="width:380px" @blur="getEmployee"></el-input>
                    <!-- <el-select v-model="formData.employeeIdcard"
                              placeholder="请选择"
                              filterable
                              remote
                              maxlength="18"
                              :loading="loading"
                              allow-create
                              clearable
                              @change="idcardChange"
                              @keyup.native='selectMax'
                              :remote-method="getidcardList" style="width:380px!important" type='number' ref='searchSelect'>
                      <el-option v-for="item in idcards" :key="item.id" :label="item.idcard" :value="item"></el-option>
                    </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系电话：" prop="employeePhone">
                    <el-input maxlength="11" v-model="formData.employeePhone" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="现有资格证书：" prop="employeePosition">
                    <iep-dict-select v-model="formData.employeePosition" dict-name="tyb_resume_position" style="width:380px!important" ></iep-dict-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="地址：" prop="employeeAddr">
                    <el-input maxlength="20" v-model="formData.employeeAddr" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="紧急联系人及电话：">
                    <div>
                      <!-- <div style="font-size:10px">紧急联系人：{{formData.employeeName}}</div>
                      <div style="font-size:10px">联系电话：{{formData.employeePhone}}</div> -->
                      <el-col>
                        <el-form-item label="紧急联系人：" prop="employeeLinkMan">
                          <el-input maxlength="20" v-model="formData.employeeLinkMan" style="width:150px" size="mini"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="联系电话：" prop="employeeLinkPhone">
                          <el-input maxlength="11" v-model="formData.employeeLinkPhone" style="width:150px" size="mini"></el-input>
                        </el-form-item>
                      </el-col>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="有无晕船或身体缺陷：" prop="employeeIsSick">
                    <el-col>
                      <el-radio-group v-model="formData.employeeIsSick">
                        <el-radio :label="1">有，<el-input v-model="formData.employeeIsSickYes" size="mini" style="width:150px"></el-input></el-radio>
                        <el-radio :label="0">无。</el-radio> 
                      </el-radio-group>
                    </el-col>
                    <el-col>
                      <div>（不适宜从事航海或海上作业的疾病）</div>
                    </el-col>
                  </el-form-item>
                </el-col>  
                <el-col :span="12">             
                  <el-form-item label="有无海上经验：" prop="employeeIsExp">
                    <el-radio-group v-model="formData.employeeIsExp">
                      <el-radio :label="1">有，<iep-dict-select v-model="formData.employeeIsExpYes" dict-name="tyb_resume_seniority" style="width:150px!important"></iep-dict-select></el-radio>
                      <el-radio :label="0">无。</el-radio> 
                    </el-radio-group>
                  </el-form-item>
                </el-col>    
              </el-row>
              <el-row>
                <el-row>
                  <el-form-item label="劳务报酬账户：" prop="employeePayType">
                    <el-radio-group v-model="formData.employeePayType">
                      <el-radio :label="1">现金</el-radio>
                      <el-radio :label="2">银行转账</el-radio>
                      <el-radio :label="3">微信</el-radio> 
                      <el-radio :label="4">支付宝</el-radio> 
                    </el-radio-group>
                  </el-form-item>
                  <div v-show="formData.employeePayType == 2">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="户名：" prop="employeePayBankAccount">
                          <el-input maxlength="20" v-model="formData.employeePayBankAccount" style="width:200px"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="账号：" prop="employeePayAccount">  
                          <el-input maxlength="20" v-model="formData.employeePayAccount" style="width:200px"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="开户行：" prop="employeePayBank">  
                          <el-input maxlength="20" v-model="formData.employeePayBank" style="width:200px"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>            
                  </div>
                  <div v-show="formData.employeePayType == 3">
                    <el-form-item label="微信账号：" prop="employeePayAccount">  
                      <el-input maxlength="20" v-model="formData.employeePayAccount" style="width:200px"></el-input>
                    </el-form-item>
                  </div>
                  <div v-show="formData.employeePayType == 4">
                    <el-form-item label="支付宝实名账号：" prop="employeePayAccount">  
                      <el-input maxlength="20" v-model="formData.employeePayAccount" style="width:200px"></el-input>
                    </el-form-item>
                  </div>
                </el-row>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <el-container>
          <el-aside class="sidec">
            <div class="tex">劳务内容及试用</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col :span="4">
                  <el-form-item label="在" style="width: 150px!important" prop="workMode">
                    <iep-dict-select v-model="formData.workMode" dict-name="tyb_resume_worktype" style="width: 100px!important"></iep-dict-select>
                  </el-form-item >
                </el-col>
                <el-col :span="4">
                  <el-form-item label="船担任" style="width: 150px!important" prop="workPosition">
                    <iep-dict-select v-model="formData.workPosition" dict-name="tyb_resume_position" style="width: 100px!important"></iep-dict-select>
                  </el-form-item >
                </el-col>
                <el-col :span="4">
                  <el-form-item label="一职, 特长" prop="workSkill">  
                    <el-input maxlength="4" v-model="formData.workSkill" style="width:100px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="。试用期" prop="workProbationTypeValue"> 
                    <el-col :span="6">
                      <el-input type="number" min="0"  oninput="if(value.length>3)value=value.slice(0,3)" v-model="formData.workProbationTypeValue"  style="width:80px"></el-input>
                    </el-col> 
                    <el-col :span="12">
                      <el-radio-group v-model="formData.workProbationType" style="margin-left: 15px; margin-right: auto;width:300px">
                        <el-radio :label="1">天</el-radio>
                        <el-radio :label="2">月</el-radio>
                        <el-radio :label="3">航次</el-radio> 
                      </el-radio-group>
                    </el-col> 
                  </el-form-item>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <el-container>
          <el-aside class="sided">
            <div class="tex">合同期限、劳务报酬标准及支付方式</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col :span="7">
                  <!-- (this.formData.workDateStart -->
                  <el-form-item label="按渔业生产周期：" prop="workDateStart" label-width="150px">
                    <el-date-picker
                    v-model="formData.workDateStart"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择开始日期">
                  </el-date-picker>
                  </el-form-item>
                  <!-- <el-form-item label="至" prop="workDateEnd">
                    <el-date-picker
                    v-model="formData.workDateEnd"
                    type="date"
                    placeholder="选择结束日期">
                  </el-date-picker>
                  </el-form-item> -->
                </el-col>
                <el-col :span="5">
                  <el-form-item label='至' prop="workDateEnd" label-width="60px">
                    <el-date-picker
                    v-model="formData.workDateEnd"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择结束日期">
                  </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="薪水类型：" prop="paySalaryType">
                    <el-radio-group v-model="formData.paySalaryType">
                      <el-radio :label="1">日薪</el-radio>
                      <el-radio :label="2">月薪</el-radio>
                      <el-radio :label="3">年薪</el-radio> 
                    </el-radio-group>
                    <el-input maxlength="6" oninput="if(value.length>6)value=value.slice(0,6)" v-model="formData.paySalaryTypeValue" size="mini" type="number" style="width:100px; margin:10px"></el-input><span>元</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="支付方式：" prop="payType">
                  <el-radio-group v-model="formData.payType" @change="payTypeChange" style="width:800px;margin-top: 20px!important">
                    <el-row>
                      <el-col :span="4"  style="margin-top: 10px!important">
                        <el-radio :label="1">定期支付</el-radio>
                      </el-col>
                      <el-col :span="10">             
                        <el-form-item label="劳务产生后次月" prop="payTypeValue">  
                          <el-input :disabled="formData.payType === 2 || formData.payType === 3" maxlength="4" oninput="if(value.length>4)value=value.slice(0,4)" v-model="payValueLong" type="number" style="width:100px" size="mini"></el-input>日前支付报酬
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4"  style="margin-top: 10px!important">
                        <el-radio :label="2">一次性支付</el-radio>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="期限结束、航次结束后的" prop="payTypeValue" class="spe">  
                          <el-input :disabled="formData.payType === 1 || formData.payType === 3" maxlength="4" oninput="if(value.length>4)value=value.slice(0,4)" v-model="payValueOnce" type="number" style="width:100px" size="mini"></el-input>日内支付报酬
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-radio :label="3">不定期支付</el-radio>
                    </el-row> 
                  </el-radio-group>
                </el-form-item>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <el-container>
          <el-aside class="sidee">
            <div class="tex">其他约定</div>
          </el-aside>
          <el-container>
            <el-header class="head headno"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col>
                  <span style="margin:40px">本部分选填，可约定：1.其他未尽事宜；2.排除、变更适用背部条款。本处约定与<span style="color:red">其他部分冲突者，以本处约定为准</span></span>
                </el-col>
                <el-col>
                  <el-input type="textarea" placeholder="请输入内容" v-model="formData.otherContent" show-word-limit style="width:720px;margin:10px 0 0 40px"></el-input>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-checkbox v-model="checked" class="con-checkbox">确认在岗，无纸质合同</el-checkbox>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <!-- <el-container>
          <el-aside class="sidef">
            <div class="tex">补充</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col>
                  <el-form-item label="甲方如违约，支付" prop="employerBreakValue" class="spe">  
                    <el-input maxlength="4" oninput="if(value.length>4)value=value.slice(0,4)" v-model="formData.employerBreakValue" type='number' style="width:100px" size="mini"></el-input>日工资。
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="乙方如违约，支付" prop="employeeBreakValue" class="spe">  
                    <el-input maxlength="4" oninput="if(value.length>4)value=value.slice(0,4)" v-model="formData.employeeBreakValue" type='number' style="width:100px" size="mini"></el-input>日工资。
                  </el-form-item>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container> -->
        <el-container>
          <el-aside class="sidef">
            <div class="tex">渔船所有权登记证书上传</div>
          </el-aside>
          <el-container>                  
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-upload
                action="/api/admin/file/upload/avatar"
                list-type="picture-card"
                :on-preview="handleLicensesCardPreview"
                :limit="1"
                :on-remove="handleLicensesRemove"
                :on-success="handleLicensesSuccessFront" :headers="headers"  accept="image/*" style="margin-left:30px!important">
                <img v-if="isLicenses" :src="licensesImage" style="width:148px;height:148px">
                <i v-else class="el-icon-plus"></i>
              </el-upload>
            </el-main>
          </el-container>
          <!-- <el-aside class="sidef">                     
            <div class="tex">纸质合同上传</div>             
          </el-aside>
          <el-container>                          
            <el-header class="head"></el-header>        
            <el-main class="mai">                                 
              <el-upload                    
                action="/api/admin/file/upload/avatar"        
                list-type="picture-card"                               
                :limit="1"
                :on-remove="handleContractimageRemove"   
                :on-success="handleContractimageSuccessFront" :headers="headers"  accept="image/*" style="margin-left:30px!important">
                <img v-if="formData.contractImage" :src="formData.contractImage" style="width:148px;height:148px">
                <i v-else class="el-icon-plus"></i>
              </el-upload>
            </el-main>
          </el-container> -->
        </el-container>
        <!-- <el-container>
          <el-aside class="sidef">
            <div class="tex">纸质合同照片（多张）</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <div v-if="isContract">
                <img v-for="(item, index) in contractImageList" :key="index" :src="item" style="width:148px;height:148px;margin-left:30px!important;float:left">
              </div>
              <el-upload
                action="/api/admin/file/upload/avatar"
                list-type="picture-card"
                :on-preview="handleContractCardPreview"
                :limit="4"
                :headers="headers"  accept="image/*" style="margin-left:30px!important;float:left"
                v-if="!isContract"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-main>
          </el-container>
        </el-container> -->
      </el-form>
      <div style="text-align: center;padding: 20px 0;">                   
        <iep-button style="margin-right: 20px;" :disabeld="false" v-show="type === 'add' || type === 'edit'" type="primary" @click="handleSubmit">保存</iep-button>
        <iep-button v-if="!$route.query.see" :disabeld="false" @click="handleBack">返回</iep-button>  
        <iep-button v-else :disabeld="false" @click="handleGo">返回</iep-button>           
      </div>
    </basic-container>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import store from '@/store'
import { 
  //findorgShip,
  getShipNames} from '@/api/ships/index'
// import { findMyship } from '@/api/ships/index'
// import { getUserInfo } from '@/api/login'
import { getOperatorList } from '@/api/ships/shipoperat/index'
import { detailCrew } from '@/api/tmlms/boatMan/index'
// import { getShipownerByidcard } from '@/api/tmlms/shipowner/index'
import VueSocketio from 'vue-socket.io'
import Vue from 'vue'
Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://localhost:5000', //地址+端口，由后端提供
}))
import { 
  addContract, 
  updateContract, getContractDetail, isCheckIdcard,getContractByidcard} from '@/api/tmlms/newContract'
export default {
  props: {
    record: {},
    type: {},
  },
  data () {
    this.getShipNameList = debounce(this.getShipNameList, 50)
    return {
      formData: {
        shipownerName: '',
        shipownerIdcard: '',
        shipName: '',
        shipLicenses: '',
        shipownerPhone: '',
        shipownerAddr: '',
        employerName: '',
        employerIdcard: '',
        employerProp: 1,
        employerPhone: '',
        shipJoint: 0,
        shipJointYes: '',
        shipJointNo: '',
        employerAddr: '',
        employeeName: '',
        employeeIdcard: '',
        employeePhone: '',
        employeePosition: '',
        employeeAddr: '',
        employeeIsSick: 0,
        employeeIsExp: 0,
        employeePayType: 1,
        employeePayBankAccount: '',
        employeePayAccount: '',
        employeePayBank: '',
        employeeLinkMan: '',
        employeeLinkPhone: '',
        workMode: '',
        workPosition: '',
        workSkill: '',
        workProbationTypeValue: '',
        workProbationType: 1,
        workDateStart: '',
        workDateEnd: '',
        paySalaryType: 2,
        paySalaryTypeValue: '',
        payType: 3,
        payTypeValue: '',
        otherContent: '',
        employerBreakValue: '',
        employeeBreakValue: '',
        licensesOwnerShipImage: '',
        contractImage:'',
        contractImages: [],
        // contactName:'',
        contactPhone:'',
        status:'',
      },
      checked:false,
      period: [],
      orgId:'',
      licensesImage: '',
      contractImageList: [],
      rules: {
        shipownerName: [{ 
          required: true, message: '请输入持证人姓名', trigger: 'blur',
        }],
        shipownerIdcard: [{ 
          required: true, message: '请输入持证人身份证号', trigger: 'blur',
        }],
        shipName: [{ 
          required: true, message: '请输入持证人船名', trigger: 'blur',
        }],
        shipLicenses: [{ 
          required: true, message: '请输入持证人船舶登记号', trigger: 'blur',
        }],
        shipownerPhone: [{ 
          required: true, message: '请输入持证人联系电话', trigger: 'blur',
        }],
        shipownerAddr: [{ 
          required: true, message: '请输入持证人家庭地址', trigger: 'blur',
        }],
        employerName: [{ 
          required: true, message: '请输入甲方（雇主)姓名', trigger: 'blur',
        }],
        employerIdcard: [{ 
          required: true, message: '请输入甲方（雇主)身份证号', trigger: 'blur',
        }],
        employerProp: [{ 
          required: true, message: '请输入签约人身份性质', trigger: 'blur',
        }],
        employerPhone: [{ 
          required: true, message: '请输入甲方（雇主)联系电话', trigger: 'blur',
        }],
        employerAddr: [{ 
          required: true, message: '请输入甲方（雇主)地址', trigger: 'blur',
        }],
        employeeName: [{ 
          required: true, message: '请输入乙方（雇员)姓名', trigger: 'blur',
        }],
        employeeIdcard: [{ 
          required: true, message: '请输入乙方（雇员)身份证号', trigger: 'blur',
        }],
        employeePhone: [{ 
          required: true, message: '请输入乙方（雇员)联系电话', trigger: 'blur',
        }],
        employeePosition: [{ 
          required: true, message: '请输入现有资格证书', trigger: 'blur',
        }],
        employeeAddr: [{ 
          required: true, message: '请输入乙方（雇员)地址', trigger: 'blur',
        }],
        contactName: [{ 
          required: true, message: '请输入紧急联系人姓名', trigger: 'blur',
        }],
        contactPhone: [{ 
          required: true, message: '请输入紧急联系人电话', trigger: 'blur',
        }],
        workDateStart: [{ 
          required: true, message: '请选择生产周期开始日期', trigger: 'blur',
        }],
        workDateEnd: [{ 
          required: true, message: '请选择生产周期结束日期', trigger: 'blur',
        }],
      },
      shipNames: [],
      loading: false,
      idcards: [],
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      isLicenses: false,
      isContract: false,
      shipowner:false,
      employee:false,
      checkEmployeeIdcard:false,
      employer:false,
      payValueLong:'',
      payValueOnce:'',
    }
  },
  created () {
    if (this.record) {
      this.getList()
    }else if(this.$route.query.idcard){
      if(this.$route.query.see){
        this.type = 'see'
      }
      this.getListByidcard()
      console.log('type')
      console.log(this.type)
    }
  },
  mounted () {
            //添加socket事件监听
        this.$socket.emit('connect')
        this.$socket.emit('startRead')
        console.log(this.sockets)
        // this.sockets.listener.subscribe('card message', (msg) => {
        this.sockets.subscribe('card message', (msg) => {
          var base = new Base64()  			
          //2.解密后是json字符串
          var result1 = base.decode(msg)
          var data = eval('('+result1+')')
          isCheckIdcard(data.cardno).then(res => {
            if (res.data.data === false) {
              this.$message.error(res.data.msg)
              this.checkEmployeeIdcard = true
              // this.formData.employeeIdcard = ''
              // this.idcards = []
            }
          }).then(()=>{
            if(!this.checkEmployeeIdcard) {
              // 将数据录入
              detailCrew(data.cardno).then(res=>{
                  if(res.data.data){
                    this.formData.employeeName = res.data.data.realName
                    this.formData.employeeIdcard = res.data.data.idcard
                    this.formData.employeeAddr = res.data.data.address
                    this.formData.provinceId = res.data.data.provinceId
                    this.formData.cityId = res.data.data.cityId
                    this.formData.districtId = res.data.data.districtId
                    this.formData.employeePhone = res.data.data.phone
                    this.formData.employeePosition = res.data.data.positionId
                    this.formData.contactName = res.data.data.contactName
                    this.formData.contactPhone = res.data.data.contactPhone
                  }
                }).catch(()=>{
                    this.formData.employeeName = data.name
                    this.formData.employeeIdcard = data.cardno
                    this.formData.employeeAddr = data.address
                    this.formData.provinceId = parseInt(data.cardno.substring(0,2)+'0000000000')
                    this.formData.cityId = parseInt(data.cardno.substring(0,4)+'00000000')
                    this.formData.districtId = parseInt(data.cardno.substring(0,6)+'000000')
                })
            }
          })
          
        })
            //格式化拿到的數據
    function Base64 () { 
      // private property 
      var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      // public method for decoding 
      this.decode = function (input) { 
          var output = ''
          var chr1, chr2, chr3 
          var enc1, enc2, enc3, enc4 
          var i = 0 
          input = input.replace(/[^A-Za-z0-9+/=]/g, '') 
          while (i < input.length) { 
              enc1 = _keyStr.indexOf(input.charAt(i++)) 
              enc2 = _keyStr.indexOf(input.charAt(i++)) 
              enc3 = _keyStr.indexOf(input.charAt(i++)) 
              enc4 = _keyStr.indexOf(input.charAt(i++)) 
              chr1 = (enc1 << 2) | (enc2 >> 4) 
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2) 
              chr3 = ((enc3 & 3) << 6) | enc4 
              output = output + String.fromCharCode(chr1) 
              if (enc3 != 64) { 
                  output = output + String.fromCharCode(chr2) 
              } 
              if (enc4 != 64) { 
                  output = output + String.fromCharCode(chr3) 
              } 
          } 
          output = _utf8_decode(output) 
          return output 
      }  
      
      // private method for UTF-8 decoding 
      var _utf8_decode = function (utftext) { 
          var string = '' 
          var i = 0 
          var c = 0
          var c2 = 0 
          var c3 = 0 
          while ( i < utftext.length ) { 
              c = utftext.charCodeAt(i) 
              if (c < 128) { 
                  string += String.fromCharCode(c) 
                  i++ 
              } else if((c > 191) && (c < 224)) { 
                  c2 = utftext.charCodeAt(i+1) 
                  string += String.fromCharCode(((c & 31) << 6) | (c2 & 63)) 
                  i += 2 
              } else { 
                  c2 = utftext.charCodeAt(i+1) 
                  c3 = utftext.charCodeAt(i+2) 
                  string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)) 
                  i += 3 
              } 
          } 
          return string 
      } 
   }
  },
  computed: {
    getTitle () {
      if (this.type === 'add') {
        return '合同新增'
      } else if (this.type === 'edit') {
        return '合同编辑'
      } else {
        return '合同查看'
      }
    },
  },
  methods: {
    // checkShipName () {
    // if(!this.formData.shipName) {
    //     this.$message.error('渔船名称不能为空,请选择相关渔船')
    //     return  false
    // }
    // },
    getEmployee () {
      if(this.formData.employeeIdcard.length==18) {
        isCheckIdcard(this.formData.employeeIdcard).then(res => {
        // console.log(res.data. msg)
        if (res.data.data === false) {
          this.$message.error(res.data.msg)
          this.checkEmployeeIdcard = true
          this.formData.employeeIdcard = ''
          this.idcards = []
        } else {
          if (this.formData.employeeIdcard !== '') {
            detailCrew(this.formData.employeeIdcard).then(({data}) => {
              let employee = data.data
              if(employee.positionId!=='0'){
                this.formData.employeePosition = employee.positionId
              }else{
                this.formData.employeePosition = ''
              }
              this.formData.employeeName = employee.realName
              this.formData.employeePhone = employee.phone
              this.formData.employeeAddr = employee.address
              this.formData.contactName = employee.contactName
              this.formData.contactPhone = employee.contactPhone
              this.employee = true
            })
          }
          this.checkEmployeeIdcard = false
        }  
      })
      }else{
        this.$message.error('请输入乙方18位身份证!')
      } 
    },
    selectMax () {
      let input = this.$refs.searchSelect.$children[0].$refs.input
      input.setAttribute('maxlength',18)
      console.log(input)
    },
    payTypeChange (paytype){
      if(paytype==1){
        this.formData.payTypeValue = this.payValueLong
        this.payValueOnce = ''
      }else if(paytype==2){
        this.formData.payTypeValue = this.payValueOnce
        this.payValueLong = ''
      }else{
        this.payValueLong = ''
        this.payValueOnce = ''
      }
    },
    getList () {
      getContractDetail (this.record).then(data =>{
        this.formData = data.data.data
        if(data.data.data.employeePosition === '0'){       
          this.formData.employeePosition=''
        }
        // if (this.formData.workDateStart && this.formData.workDateEnd) {
        //   this.period.push(this.formData.workDateStart)
        //   this.period.push(this.formData.workDateEnd)
        // }
        if (this.formData.licensesOwnerShipImage) {         
          this.licensesImage = this.formData.licensesOwnerShipImage
          this.isLicenses = true
        }
        if (this.formData.contractImages) {
          this.contractImageList = this.formData.contractImages
          this.isContract = true
        } else {
          this.isContract = false
        }
        // if (this.formData.employeeLinkMan) {
        //   this.formData.contactName = this.formData.employeeLinkMan
        // }
        // if (this.formData.employeeLinkPhone) {
        //   this.formData.contactPhone= this.formData.employeeLinkPhone
        // }
      })
    },
    getListByidcard () {
      getContractByidcard (this.$route.query.idcard).then(data =>{
        this.formData = data.data.data
        if(data.data.data.employeePosition === '0'){       
          this.formData.employeePosition=''
        }
        if (this.formData.licensesOwnerShipImage) {         
          this.licensesImage = this.formData.licensesOwnerShipImage
          this.isLicenses = true
        }
        if (this.formData.contractImages) {
          this.contractImageList = this.formData.contractImages
          this.isContract = true
        } else {
          this.isContract = false
        }
        if (this.formData.employeeLinkMan) {
          this.formData.contactName = this.formData.employeeLinkMan
        }
        if (this.formData.employeeLinkPhone) {
          this.formData.contactPhone= this.formData.employeeLinkPhone
        }
      })
    },
    handleBack () {
      this.$emit('onGoBack')
    },
    handleGo () {
      this.$router.go(-1)
    },
    shipNameChange (name) {                             
      if (typeof name === 'object') {      
        this.refreshShipName(name)
      } else {                                                    
        this.refreshShipName({shipName: name})
      }   
      this.shipNames = []       
    },
    refreshShipName (name) {
      if (name !== null) {
        let {shipowner = '', shipownerIdcard = '', licensesOwnerShip = '', mobile = '', address = '',shipJointYes = '',shipShare = ''} = name
        this.formData.shipownerName = shipowner
        this.formData.shipownerIdcard = shipownerIdcard
        this.formData.shipLicenses = licensesOwnerShip
        this.formData.shipownerPhone = mobile
        this.formData.shipownerAddr = address
        this.formData.employerName = shipowner
        this.formData.employerIdcard = shipownerIdcard
        this.formData.employerPhone = mobile
        this.formData.employerAddr = address
        this.formData.employerProp = 1
        this.employer =true
        if(shipShare==1){
          this.formData.shipJoint = 1
          this.formData.shipJointYes = shipJointYes+1
        }
        this.shipowner = true
      } else {
        this.formData.shipName = ''
        this.formData.shipownerName = ''
        this.formData.shipownerIdcard = ''
        this.formData.shipLicenses = ''
        this.formData.shipownerPhone = ''
        this.formData.shipownerAddr = ''
        this.shipowner = false
      }
    },
    getShipNameList (shipName) {
      this.loading = true
      if (shipName !== '' && shipName.length==5) {
          getShipNames(shipName).then(({data})=>{
          // console.log('获取渔船信息')
          // console.log(data.data)
          if(data.data.length){
            data.data.forEach(v => {
              this.shipNames.push(v)
            })
          }else{
            this.$message.error(data.msg)
          }
          // console.log(data.data)
          // if(data.data!==false){
          //   this.shipNames.push(data.data.shipName)
          // }else{
          //   this.$message.error(data.msg)
          // }
          })
        
      } else {
        this.$message.error('请输入5位数字船名号')
        this.shipNames = []
      }
      // getUserInfo().then(res =>{
      //   this.orgId = res.data.data.sysUser.orgId
      //   // console.log(orgId)
      // }).then(()=>{
      //   if (shipName !== '') {
      //   findorgShip(this.orgId,shipName).then(({data})=>{
      //     // console.log(data.data)
      //     if(data.data!==false){
      //       this.shipNames.push(data.data)
      //     }else{
      //       this.$message.error(data.msg)
      //     }
      //   })
      // } else {
      //   this.shipNames = []
      // }
      // })
      this.loading = false
    },
    employerPropChange (val) {
      if (val === 1) {
        this.formData.employerName = this.formData.shipownerName
        this.formData.employerIdcard = this.formData.shipownerIdcard
        this.formData.employerPhone = this.formData.shipownerPhone
        this.formData.employerAddr = this.formData.shipownerAddr
        if(this.formData.shipJointYes){
          this.formData.shipJoint = 1
        }
        this.employer =true
      } else if (val === 2) {
        this.formData.employerName = ''
        this.formData.employerIdcard = ''
        this.formData.employerPhone = ''
        this.formData.employerAddr = ''
        getOperatorList (this.formData.shipName.shipName,2).then(data => {
          // console.log('lll')
          // console.log(data.data.data)
          if(data.data.data){
            this.formData.employerName = data.data.data.realname
            this.formData.employerIdcard = data.data.data.idcard
            this.formData.employerPhone = data.data.data.phone
            this.formData.employerAddr = data.data.data.address
          }
        })
        this.employer =false
      } else if (val === 3) {
          this.formData.employerName = ''
          this.formData.employerIdcard = ''
          this.formData.employerPhone = ''
          this.formData.employerAddr = ''
          getOperatorList (this.formData.shipName.shipName,3).then(data => {
          if(data.data.data){
            this.formData.employerName = data.data.data.realname
            this.formData.employerIdcard = data.data.data.idcard
            this.formData.employerPhone = data.data.data.phone
            this.formData.employerAddr = data.data.data.address
          }
        })
          this.employer =false
      }
    },
    idcardChange (card) {
      if (typeof card === 'object') {
        this.refreshCard(card)
      } else {
        // this.refreshCard({idcard: card})
      }
      this.idcards = []
    },
    refreshCard (card) {
      if(card !== null) {
        let { realName = '', phone = '', address = '', contactName = '', contactPhone = ''} = card
        if(card.positionId!=='0'){
          this.formData.employeePosition = card.positionId
        }else{
          this.formData.employeePosition = ''
        }
        this.formData.employeeName = realName
        this.formData.employeePhone = phone
        this.formData.employeeAddr = address
        this.formData.contactName = contactName
        this.formData.contactPhone = contactPhone
        this.employee = true
      } else {
        this.formData.employeeName = ''
        this.formData.employeePhone = ''
        this.formData.employeeAddr = '' 
        this.formData.employeePosition = ''
        this.formData.contactName = ''
        this.formData.contactPhone = ''
        this.employee = false
      }
    },
    getidcardList (number) {
        isCheckIdcard(number).then(res => {
        if (res.data.data === false) {
          this.$message.error('该船员已签订合同!')
          this.checkEmployeeIdcard = true
          this.formData.employeeIdcard = ''
          this.idcards = []
        } else {
          if (number !== '') {
            detailCrew(number).then(({data}) => {
              if (Object.keys(data.data).length !== 0) {
                this.idcards = []
                this.idcards.push(data.data)
              }
            })
          } else {
            this.idcards = []
          }
          this.checkEmployeeIdcard = false
        }  
        this.loading = false
        })
      // isCheckIdcard(number).then(res => {
      //   if (res.data.data === false) {
      //     this.$message.error('该船员已签订合同!')
      //     this.checkEmployeeIdcard = true
      //     this.formData.employeeIdcard = ''
      //     this.idcards = []
      //   } else {
      //     if (number !== '') {
      //       detailCrew(number).then(({data}) => {
      //         if (Object.keys(data.data).length !== 0) {
      //           this.idcards = []
      //           this.idcards.push(data.data)
      //         }
      //       })
      //     } else {
      //       this.idcards = []
      //     }
      //     this.checkEmployeeIdcard = false
      //   }  
      //   this.loading = false
      // })
    },
    handleLicensesSuccessFront (response) {
      this.licensesImage = ''
      this.licensesImage = response.data.url
      this.isLicenses = false
    },
    handleContractSuccessFront (response) {
      this.contractImageList.push(response.data.url)
    },
    handleContractimageSuccessFront (res) {           
        this.formData.contractImage  =  res.data.url
    },
    handleLicensesCardPreview (file) {
      this.formData.licensesOwnerShipImage = file.url
    },
    handleContractCardPreview (file) {
      this.formData.contractImages = file.url
    },
    handleLicensesRemove () {
      this.licensesImage = ''
      this.formData.licensesOwnerShipImage = ''
    },
    handleContractRemove (file, fileList) {
      console.log(222)
      console.log(file, fileList)
    },
    handleContractimageRemove () {    
        this.formData.contractImage = ''
    },
    handleSubmit () {
      // if (this.period) {
      //   this.formData.workDateStart = this.period[0]
      //   this.formData.workDateEnd = this.period[1]       
      // }
      if(this.checked) {
        this.formData.status = 6
      }
      this.formData.shipJointNo = this.formData.shipownerName
      if (this.formData.shipName.shipName) {
        this.formData.shipName = this.formData.shipName.shipName
      }
      if (this.formData.employeeIdcard.idcard) {
        this.formData.employeeIdcard = this.formData.employeeIdcard.idcard
      }
      if (this.contractImageList) {
        this.formData.contractImages = this.contractImageList
      }
      if (this.licensesImage) {
        this.formData.licensesOwnerShipImage = this.licensesImage
      }
      // if (this.formData.contactName) {
      //   this.formData.employeeLinkMan = this.formData.contactName
      // }
      // if (this.formData.contactPhone) {
      //   this.formData.employeeLinkPhone = this.formData.contactPhone
      // }
      if(this.formData.payType==1){
        this.formData.payTypeValue = this.payValueLong
      }else if(this.formData.payType==2){
        this.formData.payTypeValue =  this.payValueOnce
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.type === 'add') {
                if(this.checkEmployeeIdcard) {
                  this.$message.error('乙方船员已签订合同!请重新输入身份证号')
                  this.formData.employeeIdcard = ''
                }else{   
                this.$confirm('请确认当前合同信息是否正确，提交后将无法修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                  }).then(() => {
                    // addContract(this.formData).then(()=>{
                    //   this.$message.success('保存成功！')
                    // })
                    // this.$emit('onGoBack')
                    addContract(this.formData).then(()=>{
                      this.$message.success('保存成功！')
                      this.$emit('onGoBack')
                    }).catch(err=>{
                      console.log(err)
                      this.$message.error('新增失败,请联系管理员!')
                    })
                    // addContract(this.formData), () => {    
                    //   this.$message.error('新增失败!')
                    // }
                    // this.$message.success('保存成功！')
                      
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消保存',
                    })
                  })  
                }    
          } else if (this.type === 'edit') {
              updateContract(this.formData).then(() =>{
              this.$message.success('修改成功！')
              this.$emit('onGoBack')
              }).catch(() => {
                this.$message.error('修改失败！')
              })
          }      
        }else{
          this.$message.error('请确认已经填写了所有必填信息！')
          // this.$message.error(valid)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .w-200 {
    width: 200px;
    margin: 0 20px;
  }
</style>

<style lang="scss">
  .spe {
      label {
        width: 180px!important;
      } 
    }
</style> 

<style>
  .side {
    width: 120px!important;
    height: 200px!important;
  }
  .sidea {
    width: 120px!important;
    height: 280px!important;
  }
  .sideb {
    width: 120px!important;
    height: 500px!important;
  }
  .sidec {
    width: 120px!important;
    height: 100px!important;
  }
  .sided {
    width: 120px!important;
    height: 320px!important;
  }
  .sidee {
    width: 120px!important;
    height: 180px!important;
  }
  .sidef {
    width: 120px!important;
    height: 200px!important;
  }
  .sideg {
    width: 120px!important;
    height: 600px!important;
  }
  .head {
    height: 30px!important;
  }
  .headno {
    height: 0px!important;
  }
  .mai {
    flex-basis: 0!important;
  }
  .tex {
    font-size: 16px;
    text-align: center;
  }
  .con-checkbox {
    margin:20px 0px 40px 40px;
  }
</style>