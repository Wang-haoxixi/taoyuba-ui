<template>
  <div class="contract-box">
    <basic-container>
        <h1 v-if="!$route.query.userId">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}船东信息</h1>
        <h1 v-if="$route.query.userId">完善个人信息</h1>
        <el-form :model="shipowner" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:" prop="realName">
                <el-input v-model="shipowner.realName" placeholder="" v-if="!$route.query.see" :disabled="isManger"></el-input>
                <div v-else>{{ shipowner.realName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号:" prop="idcard">
                <el-input v-model="shipowner.idcard" placeholder="" v-if="!$route.query.see" @blur="ifexist" :disabled="isManger"></el-input>
                <div v-else>{{ shipowner.idcard }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址:" prop="address">
                <el-input v-model="shipowner.address" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ shipowner.address }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="shipowner.phone" placeholder="" v-if="!$route.query.see" :disabled="isManger"></el-input>
                <div v-else>{{ shipowner.phone }}</div>
              </el-form-item>
            </el-col>
          </el-row>
            <!-- <el-col :span="16">                                       
              <el-form-item label="所属渔村区:" prop="villageId">                                                                                                 
                <el-cascader v-if="!$route.query.see" :options="options" @active-item-change="handleItemChange" :props="props" v-model="shipowner.villageId" ></el-cascader>
                <div v-else>{{ shipowner.villageId }}</div>
              </el-form-item>
            </el-col> -->
            <el-row>
            <el-col :span="12">
              <el-form-item label="身份证头像：" prop="idcardPhoto">
                <img v-if="shipowner.idcardPhoto" :src="shipowner.idcardPhoto">
                <i v-else class="el-icon-picture-outline"></i>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="人脸照：" prop="facePhoto">
                <img v-if="shipowner.facePhoto" :src="shipowner.facePhoto" style="width:350px;height:200px">
                <i v-else class="el-icon-picture-outline"></i>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">     
                    <el-form-item  label="渔船所有权证书：" prop="licensesOwnerPhoto">    
                      <el-upload
                        class="avatar-uploader"
                        action="/api/admin/file/upload/avatar"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccessOwner"    
                         :headers="headers"  accept="image/*">    
                        <img v-if="shipowner.licensesOwnerPhoto" :src="shipowner.licensesOwnerPhoto" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                <el-col :span="12">                    
                    <el-form-item  label="捕捞许可证书：" prop="licensesFishingPhoto">    
                      <el-upload
                        class="avatar-uploader"
                        action="/api/admin/file/upload/avatar"
                        :show-file-list="false"                                             
                        :on-success="handleAvatarSuccessFish"
                         :headers="headers"  accept="image/*">    
                        <img v-if="shipowner.licensesFishingPhoto" :src="shipowner.licensesFishingPhoto" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item  label="国籍证书：" prop="licensesNationalPhoto">    
                      <el-upload
                        class="avatar-uploader"
                        action="/api/admin/file/upload/avatar"
                        :show-file-list="false"                                             
                        :on-success="handleAvatarSuccessNation"
                         :headers="headers"  accept="image/*">    
                        <img v-if="shipowner.licensesNationalPhoto" :src="shipowner.licensesNationalPhoto" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                </el-col>
              <el-col :span="12">                               
                    <el-form-item  label="船舶检验证书：" prop="licensesInspectionPhoto">    
                      <el-upload
                        class="avatar-uploader"
                        action="/api/admin/file/upload/avatar"
                        :show-file-list="false"                                             
                        :on-success="handleAvatarSuccessInspect"
                         :headers="headers"  accept="image/*">    
                        <img v-if="shipowner.licensesInspectionPhoto" :src="shipowner.licensesInspectionPhoto" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                </el-col>
            <el-col>
                <iep-form-item prop="workExperience" label-name="资质证书"> 
                  <inline-form-table :table-data="shipowner.shiplist" :columns="certificateColumns" requestName="certificate" type="employee_profile" @add="setData" @changeval="setData"></inline-form-table>
                </iep-form-item>
            </el-col>         
            </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="!$route.query.see">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
          <el-button v-if="manager" @click="collect">数据读取</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import InlineFormTable from '@/views/hrms/ComponentsNew/InlineFormTable/'
import { getArea } from '@/api/post/address.js'
import { saveShipowner, getShipownerByidcard, editShipowner, uploadPic } from '@/api/tmlms/shipowner'
// import { addUserRole } from '@/api/admin/user'
import { getUserInfo } from '@/api/login'
import { getLastData } from '@/api/hrms/databuspayload'
import Vue from 'vue'
import information from '@/mixins/information'
import VueSocketio from 'vue-socket.io'
import store from '@/store' 
Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://localhost:5000', //地址+端口，由后端提供
}))
export default {
  mixins: [information],
  data () {
    // 验证
      var card = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号'))
        } else if (!value.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
          callback(new Error('请输入正确的身份证号码!'))
        } else {
          callback()
        }
      }
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
      haveInfo: {
        phone: false,
      },
      certificateColumns: [
          {
            prop: 'shipName',
            label: '渔船名',
          },
          {
            prop: 'shipNo',
            label: '渔船编号',
          },
          {
            prop: 'licensesFishingNo',
            label: '捕捞许可证编号',
          },
          {
            prop: 'licensesOwnerShip',
            label: '渔船所有权登记证书',
          },
          {
            prop: 'licensesNationalNo',
            label: '国籍证书编号',
          },
          {
            prop: 'licensesInspectionNo',
            label: '船舶检验证书编号',
          },
      ],
      shipowner:{
        shiplist:[],
        address: '',
        idcard: '',
        realName:'',
        idcardPhoto: '',
        facePhoto: '',
        licensesOwnerPhoto:'',
        licensesFishingPhoto:'',
        licensesNationalPhoto:'',
        licensesInspectionPhoto:'',
      },
      rules: {
          realName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          idcard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { validator: card, trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入联系地址', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ],
          licensesOwnerPhoto: [
                  { required: true, message: '请上传所有权登记证书', trigger: 'blur' },
          ],
         licensesFishingPhoto: [
                  { required: true, message: '请上传捕捞许可证', trigger: 'blur' },
          ],
         licensesNationalPhoto: [
                  { required: true, message: '请上传国籍证书', trigger: 'blur' },
          ],
          licensesInspectionPhoto: [          
                  { required: true, message: '请上传船舶检验证书', trigger: 'blur' },
          ],
        
      },
      options: [],
      props: {
        value: 'areaCode',
        label: 'name',
        children: 'childList',
      },
      arr:[],
      // userRole: {
      //   userId: '',
      //   roleId: 108,
      // },
      sn: '',
      manager: false,
      isManger: false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  components: { InlineFormTable },
  methods: {
    // 提交表单
    async save () {     
        if (this.shipowner.idcardPhoto.length > 200) {
        await this.getIdcardFile()
      }
      if (this.shipowner.facePhoto.length > 200) {
        await this.getFaceFile()
      }
      this.$refs['form'].validate((valid) => {
          if (valid) {
            // let shipowner = JSON.parse(JSON.stringify(this.shipowner))
            let shipowner = this.shipowner
            if (shipowner.shiplist) {
              shipowner.shiplist.forEach(item=>{
                item.certFile = item.annex
              })
            }
            let type = 1
            if(this.$route.query.edit){
              // let data = JSON.parse(JSON.stringify(shipowner))
              let data = shipowner
              console.log(data)
              if(data.villageId){
                data.villageId = data.villageId[data.villageId.length-1]
              }
               // 用户调用这个界面的时候 需要传入ID
              if(this.$route.query.userId){
                type = 2
                data.userId = this.$route.query.userId
              }
              editShipowner(data,type).then(res=>{
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                  })
                 this.$router.go(-1)
              }).catch(err=>{
                this.$message.error(err.message)
              })
            }else{
              let data = JSON.parse(JSON.stringify(shipowner))
              if(data.villageId)            
              data.villageId = data.villageId[data.villageId.length-1]
              // 用户调用这个界面的时候 需要传入ID
              if(this.$route.query.userId){
                type = 2
                data.userId = this.$route.query.userId
              }
              saveShipowner(data,type).then(res=>{
                  this.$message({                   
                    message: res.data.msg,
                    type: 'success',
                  })
                  this.$router.go(-1)
              }).catch(err=>{
                this.$message.error(err.message)
              })
              // this.userRole.userId = data.userId
              // addUserRole(this.userRole)
            }
          } else {
          return false
        }
      })
    },
    // 5級聯動
    handleItemChange (val) {
      getArea(val[val.length-1]).then(res=>{
        let data = res.data.data
        this.getNode(this.options,val[val.length-1],data)
      })
    },
    // 循环找对应的节点
    getNode (node,val,data) {
      node.forEach(res=>{
        if(res.areaCode == val){
          res.childList = data
          if(res.level < 3){
              res.childList.forEach(item=>{
                if(item.childList === undefined){
                    this.$set(item,'childList',[])
                }
              })
          }
        }else{
          if(res.childList && res.childList.length !== 0){
            this.getNode(res.childList,val,data)
          }
        }
      })
    },
    // 获取子组件数据
    setData (val) {
      this.shipowner.shiplist = val
      console.log(val)    
    },
    // 遍历数组
    getarr (node) {
      if( this.$route.query.edit ){
        this.arr.push(node.areaCode)
        if(node.child){
          this.getarr(node.child)
        }
      }else if( this.$route.query.see ){
        if(this.arr instanceof Array) this.arr=''
        this.arr = `${this.arr}${this.arr? '/' : ''}${node.name}`
        if(node.child){
          this.getarr(node.child)
        }
      }
    },
    collect () {
      this.sn = ''    
      getLastData({sn:this.sn}).then((data) => {  
        console.log(data.data.code)                                      
        if(data.data.code === 0){
          this.shipowner.address = data.data.data.address
          this.shipowner.idcard = data.data.data.identityNumber
          this.shipowner.realName = data.data.data.name
          this.shipowner.idcardPhoto = 'data:image/png;base64,' + data.data.data.photo
          this.shipowner.facePhoto = 'data:image/png;base64,' + data.data.data.picture    
        } 
      }).catch(err=>{
                this.$message.error(err.message)
              })
    },
    ifexist () {    
          //
    },
    async getIdcardFile () {
      let idcardFile = this.dataURLtoFile(this.shipowner.idcardPhoto)
      let formdata  =  new FormData() 
      formdata.append('file', idcardFile)
      await uploadPic(formdata).then(res => {
        return this.shipowner.idcardPhoto = res.data.data.url
      })
    },
    async getFaceFile () {
      let faceFile = this.dataURLtoFile(this.shipowner.facePhoto)
      let formdata  =  new FormData() 
      formdata.append('file', faceFile)
      await uploadPic(formdata).then(res => {
        return this.shipowner.facePhoto = res.data.data.url
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
    handleAvatarSuccessOwner (response) {
        this.shipowner.licensesOwnerPhoto = response.data.url
    },
    handleAvatarSuccessFish (response) {    
        this.shipowner.licensesFishingPhoto =  response.data.url
    },
    handleAvatarSuccessInspect (response) {
       this.shipowner.licensesInspectionPhoto =  response.data.url
    },
    handleAvatarSuccessNation (response) {    
          this.shipowner.licensesNationalPhoto =  response.data.url
    },
  },
  computed: {
  },
  beforeDestroy () {
    this.sockets.unsubscribe('card message')
  },
  created () {
    // 编辑新增放同一个组件 判断分别
    if(this.$route.query.edit || this.$route.query.see){
      getAll.call(this)
    }else {
      getArea(0).then(res=>{
        this.options = res.data.data
        this.options.forEach(item=>{
          this.$set(item,'childList',[])
        })
      })
    }
    // 判断是否有数据
    // this.getInformation('shipowner',['phone','realName',true])
    // 获取编辑数据
    async function getAll () {
      // 异步获取ID
      let data = await getShipownerByidcard(this.$route.query.edit || this.$route.query.see).then( res=>{
        return res.data.data
      })
      // 拿到ID 同步获取地址和选中的地址
      // if(data.villageId !== 0){
      //   getAllArea(data.villageId).then( res=>{
      //     this.options = res.data.data
      //   })
      // }
    //   if(data.villageId === 0){     
       
    //   }else {   
    //   getAllAreaName(data.villageId).then( res=>{
    //     // 处理后端数据变成我要用的数据
       
    //     if(this.$route.query.edit || this.$route.query.see){
    //       this.getarr(res.data.data,this.arr)
    //       data.villageId = this.arr
    //       if(data.shiplist) {
    //         data.shiplist.forEach((item,index)=>{
    //           item.annex = item.certFile
    //           item.id = index
    //         })
    //       }
    //       this.shipowner = data
    //     }
        
    //   })
    //   this.shipowner = data
    // }
      if(data.shiplist) {
        data.shiplist.forEach((item,index)=>{
          item.annex = item.certFile
          item.id = index
        })
      } 
      this.shipowner = data
      // console.log(this.shipowner)
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
        this.sockets.subscribe('card message', (msg) => {
            var base = new Base64()  			  
            //2.解密后是json字符串
            var result1 = base.decode(msg)
            var data = eval('('+result1+')')
            // 将数据录入
            this.$set(this.shipowner,'realName',data.name)
            this.$set(this.shipowner,'idcard',data.cardno)
            this.$set(this.shipowner,'address',data.address)
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
<style lang="scss" >
.el-form {
  margin-right:16%;
}
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


</style>
