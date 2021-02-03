<template>
  <div class="agent-add">
    <basic-container>
        <h1 v-if="!$route.query.userId">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}船员信息</h1>
        <h1 v-if="$route.query.userId">完善个人信息</h1>                
            <el-form ref="form" :model="form" :rules="$route.query.shipCrew ? shipCrewRules:rules" label-width="150px" size="small" :disabled="type === 1">
                <el-row>
                <el-col :span="12">
                    <el-form-item label="个人姓名：" prop="realName">
                    <el-input v-model="form.realName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="gender">   
                    <el-radio v-model="form.gender" :label="1">男</el-radio>
                    <el-radio v-model="form.gender" :label="2">女</el-radio>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                  <el-form-item label="身份证号码：" prop="idcard">
                    <el-input v-model.trim="form.idcard" :disabled="!!$route.query.edit" @blur="getidcardList"></el-input>
                    <!-- <el-select :disabled="!!$route.query.edit" v-model.trim="form.idcard"
                              placeholder="请选择"
                              filterable
                              remote
                              maxlength="18"
                              :loading="loading"
                              allow-create
                              clearable
                              @change="idcardChange"
                              :remote-method="getidcardList">
                      <el-option v-for="item in idcards" :key="item.id" :label="item.idcard + '(手机号：' + item.phone + ')'" :value="item"></el-option>
                    </el-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                    <iep-form-item class="form-half" prop="birthday" label-name="出生日期">
                    <iep-date-picker format="yyyy-MM-dd" v-model="form.birthday" type="date" placeholder="选择日期"></iep-date-picker>
                    </iep-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="籍贯地区：" prop="districtId">
                    <el-select
                        v-model="form.provinceId"
                        @change="choseProvince(form.provinceId)"
                        placeholder="省级地区" style="width: 33%!important">
                        <el-option
                        v-for="item in province"
                        :key="item.id"
                        :label="item.name"
                        :value="item.areaCode" prop="provinceId">
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="form.cityId"
                        @change="choseCity(form.cityId)"
                        placeholder="市级地区" style="width: 33%!important">
                        <el-option
                        v-for="item in city"
                        :key="item.id"
                        :label="item.name"
                        :value="item.areaCode" prop="cityId">
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="form.districtId"
                        placeholder="区级地区" style="width: 33%!important">
                        <el-option
                        v-for="item in district"
                        :key="item.id"
                        :label="item.name"
                        :value="item.areaCode" prop="districtId">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                    <el-form-item label="国籍" prop="nationality">
                    <el-input v-model="form.nationality"></el-input>
                    </el-form-item>
                </el-col> -->
                <el-col :span="6">
                    <el-form-item label="民族" prop="nation">
                    <el-select v-model="form.nation" placeholder="请输入民族">
                        <el-option v-for="item in nationals" :key="item.id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                    </el-form-item> 
                </el-col>
                </el-row>  
                <el-row>
                <el-col :span="12">
                    <el-form-item label="家庭地址：" prop="address">
                    <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="家庭联系人：" prop="contactName">
                    <el-input v-model="form.contactName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="家庭联系电话" prop="contactPhone">
                    <el-input v-model="form.contactPhone"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <!-- <el-row>
                <el-col :span="12">
                    <el-form-item label="船民证号码" prop="crewCert">
                    <el-input v-model="form.crewCert"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="form-half" prop="certExpDate" label="船民证有效期限">
                    <iep-date-picker v-model="form.certExpDate" type="date" placeholder="选择日期"></iep-date-picker>
                    </el-form-item>
                </el-col>               
                </el-row> -->
                <el-row>
                <!-- <el-col :span="8">
                    <el-form-item label="四小件上传：" prop="fourSmallCard">
                    <iep-avatar v-model="form.fourSmallCard"></iep-avatar>
                    </el-form-item>
                </el-col> -->
                <!-- <el-col>        
                    <iep-form-item v-if="userId" label-name="资质证书" tip="1.请务必按照证书准确填写全称；2.请务必按照证书准确填写编号；3.请务必按照证书准确填写颁发单位全称，忌单位简称；4.请务必上传电子版证书，否则证书不做任何加分项；"> -->
                    <!-- <inline-form-table :table-data="userCert" :columns="certificateColumns" requestName="certificate" type="employee_profile" @load-page="handleSave"></inline-form-table> -->
                    <!-- <cert-form-table  :crewData="tableData" :crewId="userId" :columns="certificateColumns"></cert-form-table>
                    </iep-form-item>
                </el-col> -->
                  <el-col :span="8">
                      <el-form-item label="现任职位：" prop="positionId">
                      <el-select
                          v-model="form.positionId"
                          placeholder="现任职位">
                          <el-option
                          v-for="item in position"
                          :key="item.id"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12"  v-if="!$route.query.edit || (userInfo.orgId!=32)">
                      <el-form-item label="用工状态：" prop="workStatus">
                      <el-radio-group v-model="form.workStatus">
                          <el-radio  :label="9">待求职</el-radio>
                          <el-radio  :label="0">未用工</el-radio>
                          <el-radio  :label="3">上船，未签合同</el-radio>
                      </el-radio-group>
                      </el-form-item>
                    </el-col>
                  <!-- <el-col :span="8">
                      <el-form-item label="是否需要培训" prop="isTrain">
                      <el-radio-group v-model="form.isTrain">
                          <el-radio  :label="0">否</el-radio>
                          <el-radio  :label="1">是</el-radio>
                      </el-radio-group>
                      </el-form-item>
                  </el-col> -->
                  <!-- <el-col :span="8">
                      <el-form-item label="申请类别" prop="applyType">
                      <el-select v-model="form.applyType" placeholder="请输入申请类别">
                          <el-option v-for="item in applyTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                      </el-form-item> 
                  </el-col> -->
                <!-- <el-col :span="8">
                    <el-form-item label="所属渔村区域" prop="villageId">
                    <span v-for="(region, key) in regions" :key="key">
                        <el-select v-model="regionChosen[key]">
                        <el-option v-for="item in region"
                                    :key="item.areaCode"
                                    :value="item.areaCode"
                                    :label="item.name"></el-option>
                        </el-select>
                    </span>
                    </el-form-item>
                </el-col> -->
                </el-row>
                <el-row>
                   
                    <!-- <el-col :span="8">
                      <el-form-item label="婚姻状态：" prop="maritalStatus">
                      <el-radio-group v-model="form.maritalStatus">
                          <el-radio  :label="0">未婚</el-radio>
                          <el-radio  :label="1">已婚</el-radio>
                      </el-radio-group>
                      </el-form-item>
                    </el-col> -->
                    <!-- <el-col :span="8">
                      <el-form-item label="期望薪资：" prop="salary">
                        <el-input v-model="form.salary"></el-input>
                      </el-form-item>
                    </el-col> -->
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="现住地址：" prop="preAddress">
                        <el-input v-model="form.preAddress"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="作业方式：" prop="workRequire">
                        <iep-dict-select v-model="form.workRequire" dict-name="tyb_resume_worktype"></iep-dict-select>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="文化程度：" prop="eduDegree">
                      <iep-dict-select v-model="form.eduDegree" dict-name="tyb_education_degree"></iep-dict-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="工作经验：" prop="workExprience">
                      <iep-dict-select v-model="form.workExprience" dict-name="tyb_work_exprience"></iep-dict-select> 
                      </el-form-item>
                  </el-col>
                </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="特长：" prop="speciality">
                        <el-input v-model="form.speciality"></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item  label="身份证正面照片：" prop="photoFront">
                      <el-upload
                        action="/api/admin/file/upload/avatar"
                        :class="{disabled:hideUpload}"
                        list-type="picture-card"
                        :headers="headers"
                        :on-change="uploadChangeFront"
                        :before-remove="beforeCardfrontRemove"
                        :on-success="handleAvatarSuccessFront" 
                        :file-list="frontList"
                        :limit="1"
                        :on-preview="previewFront"
                        :on-remove="handleAvatarDelFront">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="imgVisible" append-to-body>
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item  label="身份证反面照片：" prop="photoReverse">
                      <el-upload
                        action="/api/admin/file/upload/avatar"
                        :class="{disabled:hideUploadReverse}"
                        list-type="picture-card"
                        :headers="headers"
                        :on-change="uploadChangeReverse"
                        :before-remove="beforeCardreverseRemove"
                        :on-success="handleAvatarSuccessReverse" 
                        :file-list="reverseList"
                        :limit="1"
                        :on-preview="previewReverse"
                        :on-remove="handleAvatarDelReverse">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="imgVisibleReverse" append-to-body>
                        <img width="100%" :src="dialogImageUrlReverse" alt="">
                      </el-dialog>
                      
                      <!-- <el-upload
                        class="avatar-uploader"
                        action="/api/admin/file/upload/avatar"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccessReverse" :headers="headers"  accept="image/*">
                        <img v-if="form.photoReverse" :src="form.photoReverse" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item v-if="manager" label="身份证头像：" prop="idcardPhoto">
                      <img v-if="form.idcardPhoto" :src="form.idcardPhoto">
                      <i v-else class="el-icon-picture-outline"></i>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item v-if="manager" label="人脸照：" prop="facePhoto">
                      <img v-if="form.facePhoto" :src="form.facePhoto" style="width:350px;height:200px">
                      <i v-else class="el-icon-picture-outline"></i>
                    </el-form-item>
                  </el-col>
                </el-row>      
                <el-row>                                  
                  <el-col :span="12">   
                    <el-form-item  label="证件照：" prop="certPhoto">
                      <el-upload
                        action="/api/admin/file/upload/avatar"
                        :class="{disabled:hideUploadCert}"
                        list-type="picture-card"
                        :headers="headers"
                        :on-change="uploadChangeCert"
                        :before-remove="beforeCertRemove"
                        :on-success="handleAvatarSuccessCert" 
                        :file-list="CertList"
                        :on-preview="previewCert"
                        :on-remove="handleAvatarDelCert">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="imgVisibleCert" append-to-body>
                        <img width="100%" :src="dialogImageUrlCert" alt="">
                      </el-dialog>
                    </el-form-item>
                  </el-col>
                </el-row>      
                <iep-form-item class="form-half" prop="remark" label-name="备注信息" tip="请输入备注信息" v-if="!$route.query.userId">
                  <iep-input-area v-model="form.remark"></iep-input-area>
                </iep-form-item>
                <h1 style="font-size: 18px;">船员职务证书: </h1> 
                <div v-for="(item, index) in form.certList" :key="index">
                  <el-form label-width="150px" size="small" :disabled="type === 1">
                    <el-row>
                        <el-col :span="9">
                          <el-form-item label="证书编码：" prop="certNo">
                            <el-input v-model.trim="item.certNo"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="证书类型：" prop="certType">
                            <iep-dict-select v-model="item.certType" dict-name="tyb_crew_cert_type"></iep-dict-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item label="证书等级：" prop="certLevel">
                            <iep-dict-select v-model="item.certLevel" dict-name="tyb_crew_cert_level"></iep-dict-select>
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>    
                        <el-col :span="8">
                          <el-form-item label="证书职务：" prop="certTitle">
                            <iep-dict-select v-model="item.certTitle" dict-name="tyb_crew_cert_title"></iep-dict-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="证书起始日期：" prop="certDateIssue">
                            <el-date-picker v-model="item.certDateIssue" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker> 
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="证书结束日期：" prop="certDateExpire">
                            <el-date-picker v-model="item.certDateExpire" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker> 
                          </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                          <el-form-item label="扫描件：" prop="certFile">
                            <el-upload class="upload-demo" action="/api/admin/file/upload/avatar" :show-file-list="false"
                            :on-success="handleAvatarSuccessFile" :limit="1"  :headers="headers" accept="image/*">
                            <el-button size="mini" type="primary" @click="fileUpload(index)">点击上传</el-button>
                            <img v-if="item.certFile" :src="item.certFile" class="certAvatar">
                            <i v-else class="el-icon-picture-outline"></i>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4" style="text-align:center">
                          <!-- manager || !$route.query.edit -->
                          <el-button v-if="isShowDeleteBtn(item)" type="primary" size="small" plain @click="remove(index)">删除</el-button>
                        </el-col>
                    </el-row>
                  </el-form>
                </div>
                <div style="text-align:center">
                  <iep-button style="width: 86%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" plain @click="newMember">新增</iep-button>
                </div>
            </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <template v-if="$route.query.shipCrew">
            <el-button @click="$router.go(-1)">返回</el-button>
          </template>
          <template v-else-if="$route.query.from">
            <el-button @click="onBackByFrom()">返回</el-button>
          </template>
          <template v-else>
            <el-button @click="$router.go(-1)">返回</el-button>
            <!-- <el-button v-if="manager" @click="$router.push({name:'crewboatMan'})">返回</el-button>     -->
            <!-- <el-button v-if="!manager" @click="$router.push({name:'crewboatMan'})">返回</el-button> -->
          </template>
          <el-button v-if="manager && !$route.query.see" @click="collect">数据读取</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
// import InlineFormTable from '@/views/hrms/ComponentsNew/InlineFormTable'
import { getArea,getPosition} from '@/api/post/admin'
import { saveCrew, detailCrew, editCrew, uploadPic, getCrewData } from '@/api/tmlms/boatMan'
import { getLastData } from '@/api/hrms/databuspayload'
import { certificateColumns } from '@/views/hrms/ComponentsNew/options'
import { getUserInfo } from '@/api/login'
import { getMyCretList } from '@/api/post/cert'
// import { addUserRole } from '@/api/admin/user'
import information from '@/mixins/information'
import VueSocketio from 'vue-socket.io'
import Vue from 'vue'
import store from '@/store'
import debounce from 'lodash/debounce'
import { mapState } from 'vuex' 
import { mapGetters } from 'vuex'  
Vue.use(new VueSocketio({
    debug: false,
    connection: 'http://localhost:5000', //地址+端口，由后端提供
}))
export default {
  mixins: [information],
  data () {
    this.getidcardList = debounce(this.getidcardList, 800)
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系电话'))
        } else if (!/(^1[3456789]d{9}$)|(^((\d{2,4})|(\d{2,4}-))?\d{7,8}$)/.test(value)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
            callback()
        }
      }
      const checkidCard = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号码'))
        } else if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
          callback(new Error('请输入正确的身份证号码!'))
        } else {
            callback()
        }
      }
    return {
      certificateColumns,
      imgVisible:false,
      dialogImageUrl:'',
      imgVisibleReverse:false,
      dialogImageUrlReverse:'',
      imgVisibleCert:false,
      dialogImageUrlCert:'',
      frontList:[],
      reverseList:[],
      CertList:[],
      hideUpload: false,
      hideUploadReverse:false,
      hideUploadCert:false,
      limitCount:1,  
      form: {
          address: '',
          idcard: '',
          realName: '',
          birthday: '',
          nation: '',
          gender: 1,
          isTrain: 0,
          districtId: '',
          remark:'',
          positionId: '',
          nationality: '中国',
          speciality: '',
          photoFront: '',
          photoReverse: '',
          idcardPhoto: '',
          facePhoto: '',
          cityId:'',
          contactPhone: '',
          contactName: '',
          phone: '',
          applyType: '',
          workStatus:9,
          maritalStatus:0,
          salary:'',
          preAddress:'',
          eduDegree:'',
          workExprience:'',
          certPhoto:'',
      },
      agent:{
        businessLicense:'',
      },
      position: [],
      province:[],
      city:[],
      district:[],
      nationals: [
        {id:1 ,name:'汉族'}, {id:2 ,name:'蒙古族'}, {id:3 ,name:'回族'}, {id:4 ,name:'藏族'}, {id:5 ,name:'维吾尔族'},
		    {id:6 ,name:'苗族'}, {id:7 ,name:'彝族'}, {id:8 ,name:'壮族'}, {id:9 ,name:'布依族'}, {id:10,name:'朝鲜族'},
        {id:11,name:'满族'}, {id:12,name:'侗族'}, {id:13,name:'瑶族'}, {id:14,name:'白族'}, {id:15,name:'土家族'},
        {id:16,name:'哈尼族'}, {id:17,name:'哈萨克族'}, {id:18,name:'傣族'}, {id:19,name:'黎族'},{id:20,name:'傈僳族'},
        {id:21,name:'佤族'}, {id:22,name:'畲族'}, {id:23,name:'高山族'}, {id:24,name:'拉祜族'}, {id:25,name:'水族'},
        {id:26,name:'东乡族'}, {id:27,name:'纳西族'}, {id:28,name:'景颇族'}, {id:29,name:'柯尔克孜族'},{id:30,name:'土族'}, 
        {id:31,name:'达翰尔族'}, {id:32,name:'么佬族'}, {id:33,name:'羌族'}, {id:34,name:'布朗族'}, {id:35,name:'撒拉族'}, 
        {id:36,name:'毛南族'}, {id:37,name:'仡佬族'}, {id:38,name:'锡伯族'}, {id:39,name:'阿昌族'}, {id:40,name:'普米族'}, 
        {id:41,name:'塔吉克族'}, {id:42,name:'怒族'}, {id:43,name:'乌孜别克族'}, {id:44,name:'俄罗斯族'}, {id:45,name:'鄂温克族'},
        {id:46,name:'德昂族'}, {id:47,name:'保安族'}, {id:48,name:'裕固族'}, {id:49,name:'京族'}, {id:50,name:'塔塔尔族'},
        {id:51,name:'独龙族'}, {id:52,name:'鄂伦春族'}, {id:53,name:'赫哲族'}, {id:54,name:'门巴族'}, {id:55,name:'珞巴族'},
        {id:56,name:'基诺族'},
      ],
      rules: {
        realName: [
            { required: true, message: '请填写个人姓名', trigger: 'blur' },
        ],
        contactName: [
            { required: true, message: '请填联系人', trigger: 'blur' },
        ],
        gender: [
            { required: true, message: '请填写性别', trigger: 'blur' },
        ],
        idcard: [
            { required: true, message: '请填写身份证信息', trigger: 'blur' },
            { validator: checkidCard, trigger: 'blur' },
        ],
        birthday: [
            { required: true, message: '请填写生日信息', trigger: 'blur' },
        ],
        // districtId: [
        //     { required: true, message: '请填写地区', trigger: 'blur' },
        // ],
        nationality: [
            { required: true, message: '请填写国籍', trigger: 'blur' },
        ],
        // certExpDate: [
        //     { required: true, message: '请填写有效期限', trigger: 'blur' },
        // ],
        contactPhone: [
            { required: true, message: '请填写联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
        ],
        positionId: [
            { required: true, message: '请填写职位', trigger: 'blur' },
        ],
        // crewCert: [
        //     { required: true, message: '请填写船员号码', trigger: 'blur' },
        // ],
        applyType: [
            { required: true, message: '请填写申请类别', trigger: 'blur' },
        ],
        address:[
            { required: true, message: '请填写地址', trigger: 'blur' },
        ],
        phone: [
            { required: true, message: '请填写联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
        ],
        // speciality: [
        //     { required: true, message: '请填写特长', trigger: 'blur' },
        // ],
      },
      shipCrewRules:{},
      options: [],
      applyTypes: [
        {id:1, name:'以旧换新'}, {id:2, name:'普通船员'}, {id:3, name:'职务船员'}, {id:4, name:'证书换发'}, 
        {id:5, name:'证书补发'}, {id:6, name:'其他'}, 
      ],
      // userRole: {
      //   userId: '',
      //   roleId: 105,
      // },
      dataLoad: [],
      sn: '',
      manager: false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      isIdcard: false,
      // fileList:[],
      idx:'',
      loading: false,
      idcards: [],
      isShipCrew:false,
    }
  },
  methods: {
    onBackByFrom () {
      let from = this.$route.query.from
      if (from) {
        let to = from + '?'
        let query = this.$route.query
        for (let key in query) {
          if (key !== 'from') {
            to += `${key}=${query[key]}&`
          }
        }
        // console.log('to', to)
        this.$router.push(to)
      }
    },
    setBirthTimeFormat (time) {
      return time + ' 00:00:00'
    },
    removeBirthTimeFormat (time) {
      return time.split(' ')[0]
    },
    isShowDeleteBtn (data) {
      if (this.$route.query.edit) {
        let status = true
        let arr = ['certNo', 'certType', 'certLevel', 'certTitle', 'certDateIssue', 'certDateExpire', 'certFile']
        for (let key in data) {
          if (arr.includes(key) && data[key]) {
            status = false
          }
        }
        return this.manager || status
      } else if (this.$route.query.see) {
        return false
      } else {
        return this.manager || !this.$route.query.edit
      }
    },
    validateCertificate (data) {
      if (!data.certNo) {
         this.$message({
          showClose: true,
          message: '证书编码不能为空',
          type: 'warning',
        })
        return false
      } else if (!data.certType) {
        this.$message({
          showClose: true,
          message: '证书类型不能为空',
          type: 'warning',
        })
        return false
      } else if (!data.certLevel) {
        this.$message({
          showClose: true,
          message: '证书等级不能为空',
          type: 'warning',
        })
        return false
      } else if (!data.certTitle) {
        this.$message({
          showClose: true,
          message: '证书职务不能为空',
          type: 'warning',
        })
        return false
      } else if (!data.certDateIssue) {
        this.$message({
          showClose: true,
          message: '证书起始日期不能为空',
          type: 'warning',
        })
        return false
      } else if (!data.certDateExpire) {
        this.$message({
          showClose: true,
          message: '证书结束日期不能为空',
          type: 'warning',
        })
        return false
      }
      return true
    },
    // 提交表单
    async save () {
      if (this.form.idcardPhoto.length > 200) {
        await this.getIdcardFile()
      }
      if (this.form.facePhoto.length > 200) {
        await this.getFaceFile()
      }
      // console.log(this.form)
      this.$refs['form'].validate((valid) => {
          if (valid) {
            // let form = JSON.parse(JSON.stringify(this.form))
            if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.form.idcard)) {
              this.$message({
                message: '身份证号码不正确',
                type: 'warning',
              })
              return
           }
            if (this.form.certList && this.form.certList.length > 0) {
              for (let i = 0, len = this.form.certList.length; i < len; i++) {
                if (!this.validateCertificate(this.form.certList[i])) {
                  return false
                }
              }
            }
            let form = this.form
            // if (form.certList) {
            //   form.certList.forEach(item=>{
            //     item.certFile = item.annex
            //   })
            // }
            let type = 1
            this.form.birthday = this.removeBirthTimeFormat(this.form.birthday)
            if(this.$route.query.edit){
              //编辑
              // let data = JSON.parse(JSON.stringify(form))
              let data = form
              if(this.$route.query.userId){
                type = 2
                data.userId = this.$route.query.userId
              }
              if(this.$route.query.shipCrew){
                type = 3
                // data.userId = this.$route.query.userId
              }
              if(this.$route.query.shipId){
                type = 3
                data.shipId=this.$route.query.shipId
                saveCrew (data,type).then(()=>{
                  this.$message.success('船员添加成功!')
                  this.$router.go(-2)
                })
              }else{
              editCrew(data,type).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                  let from = this.$route.query.from
                  if (from) {
                    let to = from + '?'
                    let query = this.$route.query
                    for (let key in query) {
                      if (key !== 'from') {
                        to += `${key}=${query[key]}&`
                      }
                    }
                    console.log('to', to)
                    this.$router.push(to)
                    return
                  }
                   if(this.$route.query.userId){
                      this.$router.go(-1)
                   }else if(this.$route.query.shipCrew){
                      this.$router.go(-1)
                   }else if(this.$route.query.idcard){
                     this.$router.go(-1)
                   }else{
                     this.$router.go(-1)
                    //  this.$router.push({name:'crewboatMan'})  
                   }
              }).catch(err=>{
                this.$message.error(err.message)
              })}
            }else {
              //新增
                let data = JSON.parse(JSON.stringify(form))
                if(this.$route.query.userId){
                  type = 2
                  data.userId = this.$route.query.userId
                }
                if (this.isIdcard === true) {
                  editCrew(data,type).then(res=>{
                      this.$message({
                        message: res.data.msg,
                        type: 'success',
                      })
                      if(this.$route.query.userId){
                            this.$router.go(-1) 
                      }else{
                            this.$router.push({name:'crewboatMan'})  
                      }
                  }).catch(err=>{
                    this.$message.error(err.message)
                  })
                } else {
                  saveCrew(data,type).then(res=>{
                      this.$message({
                        message: res.data.msg,
                        type: 'success',
                      })
                      if(this.$route.query.userId){
                          this.$router.go(-1) 
                      }else{
                        this.$router.push({name:'crewboatMan'})  
                      }
                  }).catch(err=>{
                    this.$message.error(err.message)
                  })
                }
                // this.userRole.userId = data.userId
                // addUserRole(this.userRole)
            }
          } else {
          return false
        }
      })
    },
    // 选择城市
    choseProvince (id) {
      this.form.cityId = ''
      this.form.districtId = ''
      this.form.villageId = ''
      this.district = []
      getArea(id).then(({ data }) => {
          this.city = data.data
      })
    },
    // 获取子组件数据
    setData (val) {
      this.form.certList = val
    },
    // 改变城市
    choseCity (id) {
      getArea(id).then(({ data }) => {
        this.district = data.data
      })
    },
    // handleSave
    handleSave () {},
    collect () {
      // const crewData = 
      this.sn = ''
      getLastData({sn:this.sn}).then((data) => {
        getCrewData(data.data.data.identityNumber).then(res => {
          if (res.data.data !== true) {
            this.choseProvince(res.data.data.provinceId)
            this.choseCity(res.data.data.cityId)
            this.form = res.data.data
            this.$set(this.form, 'idcardPhoto', 'data:image/png;base64,' + data.data.data.photo)
            this.$set(this.form, 'facePhoto', 'data:image/png;base64,' + data.data.data.picture)
            // this.form.certList = []
            this.$set(this.form, 'certList',[])
            this.isIdcard = true
            getMyCretList(data.data.data.identityNumber).then(val => {
              // this.form.certList = val.data.data.map(v => v)
              val.data.data.forEach(item =>{
                this.form.certList.push(item)
                  if(this.form.certList) {
                    let id = 0
                    this.form.certList.forEach(item => {
                      item.id = id
                      id ++
                    })
                  }
                // this.form.certList.forEach(item => {
                //   item.annex = item.certFile
                // })
              })   
            })
          } else {
            if(data.data.code === 0){
              this.form.address = data.data.data.address
              this.form.idcard = data.data.data.identityNumber
              this.form.realName = data.data.data.name
              // this.form.birthday = data.data.data.birth
              this.form.nation = data.data.data.nation
              this.$set(this.form, 'idcardPhoto', 'data:image/png;base64,' + data.data.data.photo)
              this.$set(this.form, 'facePhoto', 'data:image/png;base64,' + data.data.data.picture)
              // this.form.idcardPhoto = 'data:image/png;base64,' + data.data.data.photo
              // this.form.facePhoto = 'data:image/png;base64,' + data.data.data.picture
            }
          }
        })
      }).catch(err=>{
        this.$message.error(err.message)
      })    
    },
    //身份证正面
    handleAvatarSuccessFront (file,fileList) {
      console.log(fileList)
      console.log('frontList')
      console.log(this.frontList)
      this.form.photoFront = file.data.url
    },
    handleAvatarDelFront (file,fileList) {
      this.form.photoFront = ''
      this.hideUpload = fileList.length >= this.limitCount
    },
    beforeCardfrontRemove () {
      return this.$confirm('确定删除身份证正面照片吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
      })
    },
    uploadChangeFront (file,fileList) {
      this.hideUpload = fileList.length >= this.limitCount
    },
    previewFront (url) {
        this.dialogImageUrl = url.url
        this.imgVisible = true
    },
    //身份证反面
    handleAvatarSuccessReverse (file,fileList) {
      console.log(fileList)
      this.form.photoReverse = file.data.url
    },
    handleAvatarDelReverse (file,fileList) {
      this.form.photoReverse = ''
      this.hideUploadReverse = fileList.length >= this.limitCount
    },
    beforeCardreverseRemove () {
      return this.$confirm('确定删除身份证反面照片吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
      })
    },
    uploadChangeReverse (file,fileList) {
      this.hideUploadReverse = fileList.length >= this.limitCount
    },
    previewReverse (url) {
        this.dialogImageUrlReverse = url.url
        this.imgVisibleReverse = true
    },
    //证件照
    handleAvatarSuccessCert (file,fileList) {
      console.log(fileList)
      this.form.certPhoto = file.data.url
    },
    handleAvatarDelCert (file,fileList) {
      this.form.certPhoto = ''
      this.hideUploadCert = fileList.length >= this.limitCount
    },
    beforeCertRemove () {
      return this.$confirm('确定删除证件照片吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
      })
    },
    uploadChangeCert (file,fileList) {
      this.hideUploadCert = fileList.length >= this.limitCount
    },
    previewCert (url) {
        this.dialogImageUrlCert = url.url
        this.imgVisibleCert = true
    },
    async getIdcardFile () {
      let idcardFile = this.dataURLtoFile(this.form.idcardPhoto)
      let formdata  =  new FormData() 
      formdata.append('file', idcardFile)
      await uploadPic(formdata).then(res => {
        return this.form.idcardPhoto = res.data.data.url
      })
    },
    async getFaceFile () {
      let faceFile = this.dataURLtoFile(this.form.facePhoto)
      let formdata  =  new FormData() 
      formdata.append('file', faceFile)
      await uploadPic(formdata).then(res => {
        return this.form.facePhoto = res.data.data.url
      })
    },
    dataURLtoFile (dataurl, filename = 'img') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      })
    },
    newMember () {
      if (!this.form.certList) {
        this.$set(this.form, 'certList',[])
      }
      const length = this.form.certList.length
      if (length < 2 && this.form.certList) {
        this.form.certList.push({
          id: length ? (parseInt(this.form.certList[length - 1].id) + 1).toString() : '0',
        })
      } else {
        this.$message({
          message: '最多两个证书',
          type: 'warning',
        })
      }
    },
    remove (index) {
      this.$confirm('此操作将永久删除该证书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        if (this.form.certList.length === 2) {
          const newCase = this.form.certList.filter(item => item.id != index)
          this.form.certList = newCase
        } else if (this.form.certList.length === 1) {
          const newCase = this.form.certList.filter(item => item.id == 2)
          this.form.certList = newCase
        }
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
    handleAvatarSuccessFile (response) {
      this.$set(this.form.certList[this.idx],'certFile', response.data.url)
    },
    fileUpload (index) {
      this.idx = index
    },
    idcardChange (card) {
      console.log('idcardChange')
      if (typeof card === 'object') {
        this.refreshCard(card)
      } else {
        this.refreshCard({idcard: card})
      }
      this.idcards = []
    },
    refreshCard (card) {
      // console.log('card', card)
      if(card !== null) {
        let { idcard = ''} = card
        this.form.idcard = idcard
      } else {
        this.form.idcard = ''
      }
    },
    getidcardList (e) {
      let number = e.target.value || ''
      // console.log('number', number, e.target.value)
      // console.log('getidcardList')
      // if (number) {
      //   number = number.trim()
      // }
      if (number.length !== 18) {
        return
      }
      if (!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(number)) {
        this.$message({
          message: '身份证号码不正确',
          type: 'warning',
        })
        this.form.idcard = ''
        return
      }
      this.loading = false
      if (number !== '') {
        getCrewData(number).then(res => {
          if(!(this.roles.includes(111) || this.roles.includes(1))){
            if (res.data.data.userId !== 0 && res.data.data !== true ) {
              this.$message.error('该船员已存在，请重新填写！')
              this.form = {}
              return
            }
          }
          if(res.data.data !== true) {
            this.choseProvince(res.data.data.provinceId)
            this.choseCity(res.data.data.cityId)
            this.form = res.data.data
            this.$set(this.form, 'certList',[])
            this.isIdcard = true
            this.form.birthday = this.setBirthTimeFormat(this.form.birthday)
            getMyCretList(number).then(val => {
              val.data.data.forEach(item =>{
                this.form.certList.push(item)
                  if(this.form.certList) {
                    let id = 0
                    this.form.certList.forEach(item => {
                      item.id = id
                      id ++
                    })
                  }
              })   
            })        
          } else {
            this.form.realName = ''
            this.form.positionId = ''
            this.form.birthday = this.form.birthday = this.setBirthTimeFormat(number.slice(6, 10) + '-' + number.slice(10, 12) + '-' + number.slice(12, 14))
            this.form.provinceId = ''
            this.form.cityId = ''
            this.form.districtId = ''
            this.form.address = ''
            this.form.phone = ''
            this.form.contactName = ''
            this.form.contactPhone = ''
            this.form.applyType = ''
            this.form.remark = ''
            this.form.nation = ''
            this.form.speciality = ''
            this.form.photoFront = ''
            this.form.photoReverse = ''
            this.form.idcardPhoto = ''
            this.form.facePhoto = ''
            this.form.certList = []
          }
        })
      } else {
        this.idcards = []
      }
      this.loading = false
    },
    getIdCardData () {
      return new Promise((resolve) => {
        this.$jsonp('https://localhost:9199/api/ReadMsg?cardImg=1').then((res) => {
          let form = {
            photoFront: res.frontImg,
            photoReverse: res.backImg,
          }
          // this.form.photoFront = res.frontImg
          // this.form.photoReverse = res.backImg
          // console.log('form1', this.form)
          resolve(form)
        })
      })
    },
  },
  // components: { InlineFormTable },
  created () {
    getArea(0).then(({ data }) => {
      this.province = data.data
    })
    getPosition('tyb_resume_position').then(({ data }) => {
        this.position = data.data
    })
    if(this.$route.query.edit || this.$route.query.see || this.$route.query.userId){
      getAll.call(this)
    }
    // this.getInformation('form',['phone','realName',true])
        // 获取编辑数据
    async function getAll () {    
      // 异步获取ID
      let data = await detailCrew(this.$route.query.edit || this.$route.query.see || this.$route.query.idcard).then( res=>{
        return res.data.data
      })
      data.birthday = this.setBirthTimeFormat(data.birthday)
      console.log('船员信息')
      console.log(data.photoFront)
      if(data.photoFront){
      this.frontList.push({name: 'photoFront', url: data.photoFront})
      this.hideUpload = this.frontList.length >= this.limitCount
      }
      if(data.photoReverse){
      this.reverseList.push({name: 'photoReverse', url: data.photoReverse})
      this.hideUploadReverse = this.reverseList.length >= this.limitCount
      }
      if(data.certPhoto){
        this.CertList.push({name: 'certPhoto', url: data.certPhoto})
        this.hideUploadCert = this.CertList.length >= this.limitCount
      }
      
      // this.frontList.push(JSON.parse(data.photoFront))
      // this.reverseList.push(data.photoReverse)
      // this.CertList.push(data.certPhoto)
      // console.log(this.frontList)
      // // 拿到ID 同步获取地址和选中的地址
      let a = await this.choseProvince(data.provinceId)
      let b = await this.choseCity(data.cityId) 
      console.log(a)
      console.log(b)
      if(data.certList) {
        let id = 0
        data.certList.forEach(item => {
          item.id = id
          id ++
        })
      }
      this.form = data
    }
    getUserInfo().then(res => {
      if (res.data.data.roles.includes(111)) {
        this.manager = true
      } else {
        this.manager = false
      }
      if (res.data.data.roles.indexOf(111) !== -1) {
        this.isManger = false
      } else if (res.data.data.roles.indexOf(112) !== -1) {
        this.isManger = false
      } else {
        this.isManger = true
      }   
      res.data.data.sysUser.userId
    })
  },
  beforeDestroy () {
    this.sockets.unsubscribe('card message')
  },
  mounted () {
            //添加socket事件监听
        // this.$socket.emit('connect')
        this.$socket.emit('startRead')
        // this.sockets.listener.subscribe('card message', (msg) => {
          this.sockets.subscribe('card message', (msg) => {
          var base = new Base64()
          //2.解密后是json字符串mou
          var result1 = base.decode(msg)
          var data = eval('('+result1+')')
          // 将数据录入
          this.getIdCardData().then((getD) => {
            getCrewData(data.cardno).then(res=>{
              if (res.data.data !== true) {
                this.choseProvince(res.data.data.provinceId)
                this.choseCity(res.data.data.cityId)
                this.form = res.data.data
                if (!this.form.photoFront) {
                  this.$set(this, 'frontList', [{ url: getD.photoFront }])
                  this.form.photoFront = getD.photoFront
                } else {
                  this.$set(this, 'frontList', [{ url: this.form.photoFront}])
                }

                if (!this.form.photoReverse) {
                  this.$set(this, 'reverseList', [{ url: getD.photoReverse }])
                  this.form.photoReverse = getD.photoReverse
                } else {
                  this.$set(this, 'reverseList', [{ url: this.form.photoReverse}])
                }
                console.log('this.form', this.form)
                // if (!this.form.photoReverse) {
                //   this.form = getD.photoReverse
                // }
                // this.form.certList = []
                this.$set(this.form, 'certList',[])
                this.isIdcard = true
                getMyCretList(data.cardno).then(val => {
                  // this.form.certList = val.data.data.map(v => v)
                  val.data.data.forEach(item =>{
                    this.form.certList.push(item)
                      if(this.form.certList) {
                        let id = 0
                        this.form.certList.forEach(item => {
                          item.id = id
                          id ++
                        })
                      }
                    // this.form.certList.forEach(item => {
                    //   item.annex = item.certFile
                    // })
                  })   
                })
            } else {
                let cardMsg = {}
                this.form.realName = data.name
                this.form.birthday = this.setBirthTimeFormat(data.born.slice(0,4)+'-'+data.born.slice(4,6)+'-'+data.born.slice(6))
                this.form.idcard = data.cardno
                this.form.address = data.address
                this.form.nation = data.nation
                this.form.gender = data.sex=='男' ? 1 : 2
                this.form.nationality  = '中国'
                cardMsg.provinceId = parseInt(data.cardno.substring(0,2)+'0000000000')
                cardMsg.cityId = parseInt(data.cardno.substring(0,4)+'00000000')
                cardMsg.districtId = parseInt(data.cardno.substring(0,6)+'000000')
                this.choseProvince(cardMsg.provinceId)
                this.choseCity(cardMsg.cityId)
                this.form.provinceId = cardMsg.provinceId
                this.form.cityId = cardMsg.cityId
                this.form.districtId = cardMsg.districtId
              }
            })
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
    ...mapGetters(['userInfo']),
    uploadDisabled:function () {
      console.log(this.imagelist.length)
        return this.imagelist.length >0
    },
    type () {
      if (this.$route.query.see) {
        return 1
      }
      return 2
    },
    ...mapState({
          roles: state => state.user.roles,    
    }),
  },
  watch: {
    // 'form.idcard': {
      // handler: function (val) {
        // if (val.length > 18) {
        //   this.form.idcard = val.slice(18)
        //   console.log('this.form.idcard', this.form.idcard)
        // }
        // if ( val !== undefined && val.length === 18) {
        //   var bri = val.substr(6,8).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
        //   this.form.birthday = this.setBirthTimeFormat(bri)
        // }
      // },
      // deep: true,
    // },
  },
}
</script>
<style lang="scss">
.el-form {
  margin-right:16%;
}
.agent-add {
  .avatar-uploader .el-upload {
    border: 1px solid #CCC;
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
    width: 356px;
    height: 178px;
    display: block;
  }
  .pic-edit {
    width: 356px;
    height: 178px;
    background:#333;
    position:absolute;
    top:0px;
    border-radius: 6px;
    opacity:0.5;
    text-align:center;
    line-height:178px;
    i{
      color:#fff;
      padding:0px 10px;
      cursor:pointer;
      font-size:20px;
    }
  }
  .certAvatar {
    width: 80px;
    height: 30px;
    display: block;
  }
}
.disabled .el-upload--picture-card {
    display: none;
}
</style>