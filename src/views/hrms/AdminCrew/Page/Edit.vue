<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}船员信息`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
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
              <el-input v-model="form.idcard"></el-input>
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
            <el-form-item label="地址：">
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
                @change="choseDistrict(form.districtId)"
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
            <el-form-item label="名族" prop="nation">
              <el-select v-model="form.nation" placeholder="请输入名族">
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="船民证号码" prop="crewCert">
              <el-input v-model="form.crewCert"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="certExpDate" label-name="船民证有效期限">
              <iep-date-picker v-model="form.certExpDate" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
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
            <el-form-item label="是否需要培训" prop="isTrain">
              <el-radio-group v-model="form.isTrain">
                <el-radio v-for="(item,i) in dictsMap.isTrain" :key="i" :label="+i">{{item}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请类别" prop="applyType">
              <el-select v-model="form.applyType" placeholder="请输入申请类别">
                <el-option v-for="item in applyTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
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
        <iep-form-item class="form-half" prop="remark" label-name="备注信息" tip="请输入备注信息">
          <iep-input-area v-model="form.remark"></iep-input-area>
        </iep-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">保存</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getCrewByUserId, addPosition, putPosition,getArea,getPosition,getWholeInfo ,
getRogionList} from '@/api/post/admin'
import { getMyCerts } from '@/api/post/cert'
import { initForm, formToDto, rules, dictsMap, certificateColumns } from '../options'
// import CertFormTable from '@/views/hrms/AdminCrew/Page/CertFormTable'
import VueSocketio from 'vue-socket.io'
import Vue from 'vue'
Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://localhost:5000', //地址+端口，由后端提供
}))
export default {
  // components: { CertFormTable },
  data () {
    return {
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      form: initForm(),
      province:[],
      city:[],
      district:[],
      village:[],
      parentCode:0,
      position:[],
      regions: {
        province: [],
        city: [],
        district: [],
        town: [],
        village: [],
      },
      regionChosen: {
        province: '',
        city: '',
        district: '',
        town: '',
        village: '',
        shipId:'',
      },
      dicID:'tyb_resume_position',
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
      applyTypes: [
        {id:1, name:'以旧换新'}, {id:2, name:'普通船员'}, {id:3, name:'职务船员'}, {id:4, name:'证书换发'}, 
        {id:5, name:'证书补发'}, {id:6, name:'其他'}, 
      ],
      certificateColumns,
      tableData: [],

    }
  },
  computed: {
    userId () {
      return +this.$route.params.userId
    },
    methodName () {
      return this.userId ? '编辑' : '发布'
    },
  },
  created () {
    this.getRogionList(0, 'province')
   
    if (this.userId) {
      getCrewByUserId(this.userId).then(({ data }) => {
        console.log(data)
        this.form = this.$mergeByFirst(initForm(), data.data)
          let villageId = this.form.villageId
          let districtId = this.form.districtId
          let cityId = this.form.cityId
          let provinceId =this.form.provinceId 
          // this.getShipDetail(villageId)
          this.getAllInfo(villageId,4)
          this.getAllInfo(districtId,3)
          this.getAllInfo(cityId,2) 
          this.getAllInfo(provinceId,1)
      })
    }else{
         this.init = true
    }
    getArea(this.parentCode).then(({ data }) => {
        this.province=data.data
      })
    getPosition(this.dicID).then(({ data }) => {
        this.position=data.data
    })
    this.getCerts()
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
    if (this.$route.query.position) {
      const position = this.$route.query.position.map(m => +m) || []
      this.form.position = position || []
      setTimeout(() => {
        this.$refs['IepCascader'].handleChange(position)
      }, 2000)
    }
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
   watch: {
    'regionChosen.province': function (val) {
      if (this.init) {
        this.regionChosen.city = ''
        this.regionChosen.district = ''
        this.regionChosen.town = ''
        this.regionChosen.village = ''
      }
      this.regions.city = []
      this.regions.district = []
      this.regions.town = []
      this.regions.village = []
      if (val) this.getRogionList(val, 'city')
    },
    'regionChosen.city': function (val) {
      if (this.init) {
        this.regionChosen.district = ''
        this.regionChosen.town = ''
        this.regionChosen.village = ''
      }
      this.regions.district = []
      this.regions.town = []
      this.regions.village = []
      if (val) this.getRogionList(val, 'district')
    },
    'regionChosen.district': function (val) {
      if (this.init) {
        this.regionChosen.town = ''
        this.regionChosen.village = ''
      }
      this.regions.town = []
      this.regions.village = []
      if (val) this.getRogionList(val, 'town')
    },
    'regionChosen.town': function (val) {
      if (this.init) {
        this.regionChosen.village = ''
      }
      this.regions.village = []
      if (val) this.getRogionList(val, 'village')
    },
    'regionChosen.village': function (val) {
      this.form.villageId = val
    },
    'form.idcard': {
      handler: function (val) {
        if (val.length === 18) {
          var bri = val.substr(6,8).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
          this.form.birthday = bri
        }
      },
      deep: true,
    },
  },
  methods: {
    getRogionList (pid, target) {
      getRogionList(pid).then(({data}) => {
        if (data.code === 0) {
          this.regions[target] = data.data
        }
      }, (error) => {
        this.$message.error(error.message)
      })
    },
    clickButton (data) {
        // $socket is socket.io-client instance
        this.$socket.emit('connect', data)
    },
    // getShipDetail (villageId) {
    //   getwhole({areaCode: villageId}).then(({data}) => {
    //     console.log(data)
    //     if (data.code === 0) {
    //       let child = data.data
    //       this.regionChosen.province = child.name
    //       this.regionChosen.city = child.child.name
    //       this.regionChosen.district = child.child.child.name
    //       this.regionChosen.town = child.child.child.child.name
    //       this.regionChosen.village = child.child.child.child.child ? child.child.child.child.child.name : ''
    //       console.log(' this.regionChosen',  this.regionChosen)
    //       this.$nextTick(() => {
    //         this.init = true
    //       })
    //     }
    //   }, (error) => {
    //     this.$message.error(error.message)
    //   })
    // },
    getAllInfo (id,type) {
      getWholeInfo(id).then(({ data }) => {
        if (type == 1){
           this.province.push(data.data)
        }else if (type == 2){
           this.city.push(data.data)
        }else if (type == 3){
          this.district.push(data.data)
        }else{
          this.village.push(data.data)
        }
      })  
    },
    choseProvince (id) {
      this.form.cityId = ''
      this.form.districtId = ''
      this.form.villageId = ''
      getArea(id).then(({ data }) => {
          this.city=data.data
      })
    },
    choseCity (id) {
      getArea(id).then(({ data }) => {
        this.district=data.data
      })
    },
    choseDistrict (id) {
      getArea(id).then(({ data }) => {
        this.village=data.data
      })
    },
    onGoBack () {
      this.$router.push({
        path: '/hrms_spa/crew_admin_list',
      })    
    },
    handleSubmit () {
      const submitFunction = this.userId ? putPosition : addPosition
      this.$refs['form'].validate((valid) => {
        if (valid) {
          submitFunction(formToDto(this.form)).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: '操作成功',
                type: 'success',
              })
              this.onGoBack()
            }
          }, (error) => {
            this.$message.error(error.message)
          })
        }
      })
    },
    getCerts () {
      getMyCerts(this.userId).then(({data}) => {
        this.tableData = data.data
      })
    },
  },
}
</script>
<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
