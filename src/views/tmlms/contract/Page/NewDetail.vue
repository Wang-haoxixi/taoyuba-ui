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
                    <el-input maxlength="6" v-model="formData.shipownerName" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="shipownerIdcard">
                    <el-input maxlength="20" v-model="formData.shipownerIdcard" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <!-- <el-form-item label="船名：" prop="shipName">
                    <el-input maxlength="20" v-model="formData.shipName"></el-input>
                  </el-form-item> -->
                  <el-form-item label="船名：:" prop="shipName">
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
                    <el-input maxlength="20" v-model="formData.shipLicenses" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="联系电话：" prop="shipownerPhone">
                    <el-input maxlength="20" v-model="formData.shipownerPhone" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="家庭地址：" prop="shipownerAddr">
                    <el-input maxlength="20" v-model="formData.shipownerAddr" style="width:380px"></el-input>
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
                    <el-input maxlength="6" v-model="formData.employerName" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="employerIdcard">
                    <el-input maxlength="20" v-model="formData.employerIdcard" style="width:380px"></el-input>
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
                    <el-input maxlength="20" v-model="formData.employerPhone" style="width:380px">></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="船舶是否共有：" prop="shipJoint">
                    <el-radio-group v-model="formData.shipJoint">
                      <el-radio :label="1">是，<el-input v-model="formData.shipJointYes" placeholder="人数（数字）" size="mini" style="width:100px"></el-input>共有（权证附后）</el-radio>
                      <el-radio :label="0">否，{{formData.shipownerName}} 独有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">  
                  <el-form-item label="地址：" prop="employerAddr">
                    <el-input maxlength="20" v-model="formData.employerAddr" style="width:380px">></el-input>
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
                    <el-input maxlength="6" v-model="formData.employeeName" style="width:380px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="employeeIdcard">
                    <!-- <el-input maxlength="20" v-model="formData.employeeIdcard"></el-input> -->
                    <el-select v-model="formData.employeeIdcard"
                              placeholder="请选择"
                              filterable
                              remote
                              maxlength="20"
                              :loading="loading"
                              allow-create
                              clearable
                              @change="idcardChange"
                              :remote-method="getidcardList" style="width:380px!important">
                      <el-option v-for="item in idcards" :key="item.id" :label="item.idcard" :value="item"></el-option>
                    </el-select>
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
                        <el-form-item label="紧急联系人：">
                          <el-input maxlength="20" v-model="formData.contactName" style="width:150px" size="mini"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col>
                        <el-form-item label="联系电话：">
                          <el-input maxlength="11" v-model="formData.contactPhone" style="width:150px" size="mini"></el-input>
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
                      <div>（不适宜从事航海的疾病）</div>
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
                  <el-form-item label="工资账户：" prop="employeePayType">
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
            <div class="tex">岗位及试用</div>
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
                      <el-input type="number" min="0" v-model="formData.workProbationTypeValue" style="width:60px"></el-input>
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
            <div class="tex">合同期限、工资标准及支付方式</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="按渔业生产周期：" prop="period">
                    <el-date-picker v-model="period" type="daterange" range-separator="至"
                      tart-placeholder="开始" end-placeholder="结束"  value-format="yyyy-MM-dd" style="margin-top: 15px!important"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="薪水类型：" prop="paySalaryType">
                    <el-radio-group v-model="formData.paySalaryType">
                      <el-radio :label="1">日薪</el-radio>
                      <el-radio :label="2">月薪</el-radio>
                      <el-radio :label="3">年薪</el-radio> 
                    </el-radio-group>
                    <el-input maxlength="10" v-model="formData.paySalaryTypeValue" size="mini" style="width:70px; margin:10px"></el-input><span>元</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="支付方式：" prop="payType">
                  <el-radio-group v-model="formData.payType" style="width:800px;margin-top: 20px!important">
                    <el-row>
                      <el-col :span="4"  style="margin-top: 10px!important">
                        <el-radio :label="1">定期支付</el-radio>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="工资产生后次月" prop="payTypeValue">  
                          <el-input :disabled="formData.payType === 2 || formData.payType === 3" maxlength="4" v-model="formData.payTypeValue" style="width:50px" size="mini"></el-input>日前支付
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="4"  style="margin-top: 10px!important">
                        <el-radio :label="2">一次性支付</el-radio>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="期限结束、航次结束后的" prop="payTypeValue" class="spe">  
                          <el-input :disabled="formData.payType === 1 || formData.payType === 3" maxlength="4" v-model="formData.payTypeValue" style="width:50px" size="mini"></el-input>日内支付
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
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col>
                  <span style="margin:40px">本部分选填，可约定：1.其他未尽事宜；2.排除、变更适用背部条款。本处约定与<span style="color:red">其他部分冲突者，以本处约定为准</span></span>
                </el-col>
                <el-col>
                  <el-input type="textarea" placeholder="请输入内容" v-model="formData.otherContent" show-word-limit style="width:720px;margin:10px 0 0 40px"></el-input>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
        <el-container>
          <el-aside class="sidef">
            <div class="tex">补充</div>
          </el-aside>
          <el-container>
            <el-header class="head"></el-header>
            <el-main class="mai">
              <el-row>
                <el-col>
                  <el-form-item label="甲方如违约，支付" prop="employerBreakValue" class="spe">  
                    <el-input maxlength="4" v-model="formData.employerBreakValue" style="width:50px" size="mini"></el-input>日工资。
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="乙方如违约，支付" prop="employeeBreakValue" class="spe">  
                    <el-input maxlength="4" v-model="formData.employeeBreakValue" style="width:50px" size="mini"></el-input>日工资。
                  </el-form-item>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>
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
          <el-aside class="sidef">                     
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
          </el-container>
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
        <iep-button :disabeld="false" @click="handleBack">返回</iep-button>            
      </div>
    </basic-container>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import store from '@/store'
import { findMyship } from '@/api/ships/index'
import { getShipManagerList } from '@/api/ships/shipoperat/index'
import { detailCrew } from '@/api/tmlms/boatMan/index'
import { addContract, updateContract, getContractDetail, isCheckIdcard } from '@/api/tmlms/newContract'
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
        employerProp: 3,
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
        paySalaryType: 1,
        paySalaryTypeValue: '',
        payType: 1,
        payTypeValue: '',
        otherContent: '',
        employerBreakValue: '',
        employeeBreakValue: '',
        licensesOwnerShipImage: '',
        contractImage:'',
        contractImages: [],
      },
      period: [],
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
          required: true, message: '请输入乙方（雇主)身份证号', trigger: 'blur',
        }],
        employeePhone: [{ 
          required: true, message: '请输入乙方（雇主)联系电话', trigger: 'blur',
        }],
        employeePosition: [{ 
          required: true, message: '请输入现有资格证书', trigger: 'blur',
        }],
        employeeAddr: [{ 
          required: true, message: '请输入乙方（雇主)地址', trigger: 'blur',
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
    }
  },
  created () {
    if (this.record) {
      this.getList()
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
    getList () {
      getContractDetail (this.record).then(data =>{
        this.formData = data.data.data
        console.log(this.formData)
        if (this.formData.workDateStart && this.formData.workDateEnd) {
          this.period.push(this.formData.workDateStart)
          this.period.push(this.formData.workDateEnd)
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
        let {shipowner = '', shipownerIdcard = '', licensesOwnerShip = '', mobile = '', address = '' } = name
        this.formData.shipownerName = shipowner
        this.formData.shipownerIdcard = shipownerIdcard
        this.formData.shipLicenses = licensesOwnerShip
        this.formData.shipownerPhone = mobile
        this.formData.shipownerAddr = address
      } else {
        this.formData.shipName = ''
        this.formData.shipownerName = ''
        this.formData.shipownerIdcard = ''
        this.formData.shipLicenses = ''
        this.formData.shipownerPhone = ''
        this.formData.shipownerAddr = ''
      }
    },
    getShipNameList (shipName) {
      this.loading = true
      if (shipName !== '') {
        findMyship(shipName).then(({data}) => {
          if (data.data !== false) {
            this.shipNames.push(data.data)
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.shipNames = []
      }
      this.loading = false
    },
    employerPropChange (val) {
      if (val === 1) {
        this.formData.employerName = this.formData.shipownerName
        this.formData.employerIdcard = this.formData.shipownerIdcard
        this.formData.employerPhone = this.formData.shipownerPhone
        this.formData.employerAddr = this.formData.shipownerAddr
      } else if (val === 2) {
        getShipManagerList (this.formData.shipName).then(data => {
          this.formData.employerName = data.data.data.records[0].realName
          this.formData.employerIdcard = data.data.data.records[0].idcard
          this.formData.employerPhone = data.data.data.records[0].phone
          this.formData.employerAddr = data.data.data.records[0].address
        })
      } else if (val === 3) {
          this.formData.employerName = ''
          this.formData.employerIdcard = ''
          this.formData.employerPhone = ''
          this.formData.employerAddr = ''
      }
    },
    idcardChange (card) {
      if (typeof card === 'object') {
        this.refreshCard(card)
      } else {
        this.refreshCard({idcard: card})
      }
      this.idcards = []
    },
    refreshCard (card) {
      if(card !== null) {
        let { realName = '', phone = '', address = '', positionId = '', contactName = '', contactPhone = ''} = card
        this.formData.employeeName = realName
        this.formData.employeePhone = phone
        this.formData.employeeAddr = address
        this.formData.employeePosition = positionId
        this.formData.contactName = contactName
        this.formData.contactPhone = contactPhone
      } else {
        this.formData.employeeName = ''
        this.formData.employeePhone = ''
        this.formData.employeeAddr = '' 
        this.formData.employeePosition = ''
        this.formData.contactName = ''
        this.formData.contactPhone = ''
      }
    },
    getidcardList (number) {
      isCheckIdcard(number).then(res => {
        if (res.data.data === false) {
          this.formData.employeeIdcard = ''
          this.idcards = []
          this.$message.error('该船员已签订合同!')
        } else {
          if (number !== '') {
            detailCrew(number).then(({data}) => {
              if (Object.keys(data.data).length !== 0) {
                this.idcards.push(data.data)
              }
            })
          } else {
            this.idcards = []
          }
        }  
        this.loading = false
      })
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
      if (this.period) {
        this.formData.workDateStart = this.period[0]
        this.formData.workDateEnd = this.period[1]       
      }    
      this.formData.shipJointNo = this.formData.employerName
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
      if (this.formData.contactName) {
        this.formData.employeeLinkMan = this.formData.contactName
      }
      if (this.formData.contactPhone) {
        this.formData.employeeLinkPhone = this.formData.contactPhone
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            addContract(this.formData).then(() =>{
              this.$message.success('新增成功！')
              this.$emit('onGoBack')
            }).catch(() => {
              this.$message.error('新增失败！')
            })
          } else if (this.type === 'edit') {
            updateContract(this.formData).then(() =>{
              this.$message.success('修改成功！')
              this.$emit('onGoBack')
            }).catch(() => {
              this.$message.error('修改失败！')
            })
          }      
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
    height: 300px!important;
  }
  .sidee {
    width: 120px!important;
    height: 150px!important;
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
  .mai {
    flex-basis: 0!important;
  }
  .tex {
    font-size: 16px;
    text-align: center;
  }
</style>