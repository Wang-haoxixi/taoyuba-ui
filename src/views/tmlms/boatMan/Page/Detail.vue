<template>
  <div class="agent-add">
    <basic-container>
        <h1 v-if="!$route.query.userId">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}船员信息</h1>
        <h1 v-if="$route.query.userId">完善个人信息</h1>                
              <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="small">
                <el-row>
                <el-col :span="12">
                    <el-form-item label="个人姓名：" prop="realName">
                    <el-input v-model="form.realName" :disabled="haveInfo.realName"></el-input>
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
                    <el-input v-model="form.idcard" :disabled="haveInfo.idcard"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <iep-form-item class="form-half" prop="birthday" label-name="出生日期">
                    <iep-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></iep-date-picker>
                    </iep-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="地址：" prop="districtId">
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
                <el-col :span="6">
                    <el-form-item label="国籍" prop="nationality">
                    <el-input v-model="form.nationality"></el-input>
                    </el-form-item>
                </el-col>
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
                    <el-input v-model="form.phone" :disabled="haveInfo.phone"></el-input>
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
                <el-row>
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
                </el-row>
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
                    <el-form-item label="职位" prop="positionId">
                    <el-select
                        v-model="form.positionId"
                        placeholder="职位">
                        <el-option
                        v-for="item in position"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="申请类别" prop="applyType">
                    <el-select v-model="form.applyType" placeholder="请输入申请类别">
                        <el-option v-for="item in applyTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    </el-form-item> 
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否需要培训" prop="isTrain">
                    <el-radio-group v-model="form.isTrain">
                        <el-radio  :label="0">否</el-radio>
                        <el-radio  :label="1">是</el-radio>
                    </el-radio-group>
                    </el-form-item>
                </el-col>
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
                <iep-form-item class="form-half" prop="remark" label-name="备注信息" tip="请输入备注信息" v-if="!$route.query.userId">
                <iep-input-area v-model="form.remark"></iep-input-area>
                </iep-form-item>
            </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { getArea,getPosition} from '@/api/post/admin'
import { saveCrew, detailCrew, editCrew } from '@/api/tmlms/boatMan'
import VueSocketio from 'vue-socket.io'
import { getUserInfo } from '@/api/login'
import Vue from 'vue'
Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://localhost:5000', //地址+端口，由后端提供
}))
export default {
  data () {
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系电话'))
        } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)) {
          callback(new Error('请输入正确的手机号码!'))
        } else {
            callback()
        }
      }
    return {
      haveInfo: {},
      form: {
          gender: 1,
          isTrain: 0,
          districtId: '',
          remark:'',
          positionId: '',
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
        ],
        birthday: [
            { required: true, message: '请填写生日信息', trigger: 'blur' },
        ],
        districtId: [
            { required: true, message: '请填写地区', trigger: 'blur' },
        ],
        nationality: [
            { required: true, message: '请填写国籍', trigger: 'blur' },
        ],
        certExpDate: [
            { required: true, message: '请填写有效期限', trigger: 'blur' },
        ],
        contactPhone: [
            { required: true, message: '请填写联系电话', trigger: 'blur' },
        ],
        positionId: [
            { required: true, message: '请填写职位', trigger: 'blur' },
        ],
        crewCert: [
            { required: true, message: '请填写船员号码', trigger: 'blur' },
        ],
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
      },
      options: [],
      applyTypes: [
        {id:1, name:'以旧换新'}, {id:2, name:'普通船员'}, {id:3, name:'职务船员'}, {id:4, name:'证书换发'}, 
        {id:5, name:'证书补发'}, {id:6, name:'其他'}, 
      ],
    }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let type = 1
            if(this.$route.query.edit){
              let data = JSON.parse(JSON.stringify(this.form))
              if(this.$route.query.userId){
                type = 2
                data.userId = this.$route.query.userId
              }
              editCrew(data,type).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                   if(this.$route.query.userId){
                        this.$router.go(-1) 
                   }else{
                        this.$router.push({name:'boatMan'})  
                   }
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }else {
                let data = JSON.parse(JSON.stringify(this.form))
                if(this.$route.query.userId){
                  type = 2
                  data.userId = this.$route.query.userId
                }
                saveCrew(data,type).then(res=>{
                    this.$message({
                      message: res.data.msg,
                      type: 'success',
                    })
                    if(this.$route.query.userId){
                        this.$router.go(-1) 
                    }else{
                        this.$router.push({name:'boatMan'})  
                    }
                }).catch(err=>{
                  this.$message.error(err.message)
                })
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
    // 改变城市
    choseCity (id) {
      getArea(id).then(({ data }) => {
        this.district = data.data
      })
    },
  },
  computed: {
  },
  created () {
    getArea(0).then(({ data }) => {
        this.province = data.data
      })
    getPosition('tyb_resume_position').then(({ data }) => {
        this.position = data.data
    })
    if(this.$route.query.edit || this.$route.query.see){
      getAll.call(this)
    }
        // 判断是否有数据
    getUserInfo().then(res=>{
      if(res.data.data.roles.indexOf(1) === -1 && res.data.data.roles.indexOf(111) === -1){
          if(res.data.data.sysUser.phone){
            this.haveInfo.phone = true
            this.form.phone = res.data.data.sysUser.phone
          }
          if(res.data.data.sysUser.realName){
            this.haveInfo.realName = true
            this.form.realName = res.data.data.sysUser.realName
          }
          if(res.data.data.sysUser.idCard){
            this.haveInfo.idcard = true
            this.form.idcard = res.data.data.sysUser.idCard
          }
      }
    })
        // 获取编辑数据
    async function getAll () {
      // 异步获取ID
      let data = await detailCrew(this.$route.query.edit || this.$route.query.see).then( res=>{
        return res.data.data
      })
      // 拿到ID 同步获取地址和选中的地址
      let a = await this.choseProvince(data.provinceId)
      let b = await this.choseCity(data.cityId) 
      console.log(a)
      console.log(b)
      this.form = data
    }
  },
  mounted () {
            //添加socket事件监听
        this.$socket.emit('connect')
        this.$socket.emit('startRead')
        this.sockets.subscribe('card message', (msg) => {
          var base = new Base64()  			  
          //2.解密后是json字符串
          var result1 = base.decode(msg)
          var data = eval('('+result1+')')
          // 将数据录入
          this.form.realName = data.name
          this.form.birthday = data.born.slice(0,4)+'-'+data.born.slice(4,6)+'-'+data.born.slice(6)
          this.form.idcard = data.cardno
          this.form.address = data.address
          this.form.nation = data.nation
          this.form.gender = data.sex=='男' ? 1 : 2
          this.form.nationality  = '中国'
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
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
