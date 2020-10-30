<template>
  <div class="agent-add">
    <basic-container>
        <h1 v-if="!$route.query.userId">
            <!-- {{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }} -->
            {{$route.query.shipName}}上船登记</h1>           
            <el-form :model="form" :rules="userRule" ref="userInfoForm" :disabled="false" label-width="150px" size="small" >
                <el-row>
                <el-col :span="12">
                    <el-form-item label="个人姓名：" prop="realName">
                    <el-input v-model="form.realName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号码：" prop="idcard">
                    <el-input v-model="form.idcard" ></el-input>
                    <!-- <el-select :disabled="$route.query.edit" v-model="form.idcard"
                              placeholder="请选择"
                              filterable
                              remote
                              maxlength="20"
                              :loading="loading"
                              allow-create
                              clearable
                              @change="idcardChange"
                              :remote-method="getidcardList">
                      <el-option v-for="item in idcards" :key="item.id" :label="item.idcard + '(手机号：' + item.phone + ')'" :value="item"></el-option>
                    </el-select> -->
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="12">
                    <el-form-item label="性别" prop="gender">   
                    <el-radio v-model="form.gender" :label="1">男</el-radio>
                    <el-radio v-model="form.gender" :label="2">女</el-radio>
                    </el-form-item>
                </el-col> -->
                </el-row> 
                <el-row>
                <el-col :span="12">
                    <el-form-item label="地址：" prop="address">
                    <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
                  <el-col :span="12" style="text-align: right;">
                    <el-button type="primary" size="small" @click="addUserInfo">添加</el-button>
                  </el-col>
                </el-row>                   

            </el-form>
            
              <el-table
              :data="crewList"
              >
          <el-table-column prop="realName" label="姓名" >
          </el-table-column>
          <el-table-column prop="idcard" label="身份证">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="180">
            <template slot-scope="scope">
              <operation-wrapper>
                <!-- <iep-button size="mini" plain @click="handleDelete(scope.row.id)">签合同</iep-button>                        -->
                <iep-button size="mini" plain @click="handleDelete(scope.row.idcard)">删除</iep-button>
              </operation-wrapper>
            </template>
          </el-table-column>
            </el-table>
        <div style="text-align:center;margin-top:40px;">
            <el-button @click="save" >提交</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
// import InlineFormTable from '@/views/hrms/ComponentsNew/InlineFormTable'
import { getArea,getPosition} from '@/api/post/admin'
import { saveCrewBatch, detailCrew,  uploadPic, getCrewData,checkCrewRelation } from '@/api/tmlms/boatMan'
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
Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://localhost:5000', //地址+端口，由后端提供
}))
export default {
  mixins: [information],
  data () {
    this.getidcardList = debounce(this.getidcardList, 800)
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
      certificateColumns,
      form: {
          address: '',
          idcard: '',
          realName: '',
          birthday: '',
          nation: '',
          gender: 1,
          districtId: '',
          cityId:'',
      },
      crewList:[],
      agent:{
        businessLicense:'',
      },
      position: [],
      province:[],
      city:[],
      district:[],
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
      userRule: {
        realName: [
          { required: true, message: '请填写个人姓名', trigger: 'blur' },
        ],
        idcard: [
            { required: true, message: '请填写身份证信息', trigger: 'blur' },
        ],
        address:[
            { required: true, message: '请填写地址', trigger: 'blur' },
        ],
      },
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
    addUserInfo () {
      this.$refs.userInfoForm.validate((valid) => {
          if (valid) {
            this.crewList.push(Object.assign({}, this.form))
            console.log('this.crewList', this.crewList)
            this.form.realName = ''
            this.form.idcard = ''
            this.form.address = ''
          } else {
            return false
          }
        })
    },
    handleDelete (idcard){
      this.crewList=this.crewList.filter(m => {
        if(m.idcard!==idcard){
          return m
        }
      })
    },
    // 提交表单
    save () {
      let type=1
      console.log(this.crewList)
      if(this.crewList){
        this.$confirm('提交之后将无法修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        }).then(()=>{
          checkCrewRelation(this.crewList).then(res=>{
            console.log('三艘船')
            if(res.data.data){
              saveCrewBatch(this.crewList,type).then(res=>{
              console.log(res)
              this.$message.success('船员批量添加成功!')
              this.$router.go(-1)
              })
            }
          }).catch(err=>{
            this.$message.error(err.message)
          })
        })
      }
    },
    // 选择城市
    choseProvince (id) {
      this.form.cityId = ''
      this.form.districtId = ''
      // this.form.villageId = ''
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
    handleAvatarSuccessFront (response) {
      this.form.photoFront = response.data.url
    },
    handleAvatarSuccessReverse (response) {   
      this.form.photoReverse = response.data.url
    },
    handleAvatarSuccessCert (response) {
        this.form.certPhoto = response.data.url
        // console.log(this.form.certPhoto)
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
      console.log(dataurl)
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
      if (length < 2) {
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
      if (typeof card === 'object') {
        this.refreshCard(card)
      } else {
        this.refreshCard({idcard: card})
      }
      this.idcards = []
    },
    refreshCard (card) {
      if(card !== null) {
        let { idcard = ''} = card
        this.form.idcard = idcard
      } else {
        this.form.idcard = ''
      }
    },
    getidcardList (number) {
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
            this.form.birthday = ''
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
      // console.log('船员信息')
      // console.log(data)
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
      console.log('编辑数据')
      console.log(data)
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
  mounted () {
            //添加socket事件监听
        this.$socket.emit('connect')
        this.$socket.emit('startRead')
        // this.sockets.listener.subscribe('card message', (msg) => {
          this.sockets.subscribe('card message', (msg) => {
          var base = new Base64()  			  
          //2.解密后是json字符串mou
          var result1 = base.decode(msg)
          var data = eval('('+result1+')')
          // 将数据录入
              let cardMsg = {}
              let crew = {}
              let flag = false
              this.form.realName = data.name
              this.form.birthday = data.born.slice(0,4)+'-'+data.born.slice(4,6)+'-'+data.born.slice(6)
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
              this.form.shipId = this.$route.params.shipId
              this.form.flag = 1
              crew = JSON.parse(JSON.stringify(this.form))
              if(this.crewList.length){
                this.crewList.forEach(item=>{
                if(crew.idcard==item.idcard){
                  flag= true
                }
                })
              }
              if(!flag) {
                this.crewList.push(crew)
              }
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
    'form.idcard': {
      handler: function (val) {
        if ( val !== undefined && val.length === 18) {
          var bri = val.substr(6,8).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
          this.form.birthday = bri
        }
      },
      deep: true,
    },
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
  .certAvatar {
    width: 80px;
    height: 30px;
    display: block;
  }
}
</style>