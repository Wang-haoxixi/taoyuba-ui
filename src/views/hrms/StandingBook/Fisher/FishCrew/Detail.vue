<template>
  <div class="agent-add">
    <basic-container>
        <h1 v-if="!$route.query.idcard">{{ $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}船员信息</h1>
        <h1 v-if="$route.query.idcard">完善个人信息</h1>                
        <el-form v-if="isExist === false" :model="form" ref="form" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:" prop="realName">
                <el-input v-model="form.realName" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ form.realName }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- <el-form-item label="身份证号码:" prop="idcard">
                <el-input v-model="form.idcard" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ form.idcard }}</div>
              </el-form-item> -->
              <el-form-item label="身份证号:" prop="idcard">
                <el-input v-model="form.idcard" placeholder="" v-if="!$route.query.see"></el-input>
                <!-- <el-select v-if="!$route.query.see" v-model="form.idcard"
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
                <div v-else>{{ form.idcard }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码:" prop="phone">
                <el-input v-model="form.phone" placeholder="" v-if="!$route.query.see"></el-input>
                <div v-else>{{ form.phone }}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位:" prop="positionId">
                <iep-dict-select  v-if="!$route.query.see" v-model="form.positionId" dict-name="tyb_resume_position">></iep-dict-select>
                <div v-else>{{ form.positionId }}</div>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
        <el-form v-if="isExist === true" :model="formSecond" ref="formSecond" label-width="150px" :rules="rules">
                <el-row>
                <el-col :span="12">
                  <el-form-item label="个人姓名：" prop="realName">
                    <div>{{ formSecond.realName }}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="gender">   
                    <el-radio disabled v-model="formSecond.gender" :label="1">男</el-radio>
                    <el-radio disabled v-model="formSecond.gender" :label="2">女</el-radio>
                  </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                  <el-form-item label="身份证号码：" prop="idcard">
                    <div>{{ formSecond.idcard }}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <iep-form-item class="form-half" prop="birthday" label-name="出生日期">
                    <iep-date-picker disabled v-model="formSecond.birthday" type="date" placeholder="选择日期" readonly></iep-date-picker>
                  </iep-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                  <el-form-item label="籍贯地区：" prop="districtId">
                    <span>{{ formSecond.provinceId }}</span>
                    <span>{{ formSecond.cityId }}</span>
                    <span>{{ formSecond.districtId }}</span>         
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="国籍" prop="nationality">
                    <div>{{ formSecond.nationality }}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="民族" prop="nation">
                    <div>{{ formSecond.nation }}</div>
                  </el-form-item> 
                </el-col>
                </el-row>  
                <el-row>
                <el-col :span="12">
                  <el-form-item label="家庭地址：" prop="address">
                    <div>{{ formSecond.address }}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" prop="phone">
                    <div>{{ formSecond.phone }}</div>
                  </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                  <el-form-item label="家庭联系人：" prop="contactName">
                    <div>{{ formSecond.contactName }}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="家庭联系电话：" prop="contactPhone">
                    <div>{{ formSecond.contactPhone }}</div>
                  </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                      <el-form-item label="职位：" prop="positionId">
                      <div>{{ formSecond.positionId }}</div>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否需要培训：" prop="isTrain">
                      <el-radio-group v-model="formSecond.isTrain">
                        <el-radio disabled :label="0">否</el-radio>
                        <el-radio disabled :label="1">是</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请类别：" prop="applyType">
                      <div>{{ formSecond.applyType }}</div>
                    </el-form-item> 
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="特长：" prop="speciality">
                      <div>{{ formSecond.speciality }}</div>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="身份证正面照片：" prop="photoFront">
                      <img v-if="formSecond.photoFront" :src="formSecond.photoFront" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="身份证反面照片：" prop="photoReverse">
                      <img v-if="formSecond.photoReverse" :src="formSecond.photoReverse" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="身份证头像：" prop="idcardPhoto">
                      <img v-if="formSecond.idcardPhoto" :src="formSecond.idcardPhoto">
                      <i v-else class="el-icon-picture-outline"></i>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="人脸照：" prop="facePhoto">
                      <img v-if="formSecond.facePhoto" :src="formSecond.facePhoto" style="width:350px;height:200px">
                      <i v-else class="el-icon-picture-outline"></i>
                    </el-form-item>
                  </el-col>
                </el-row>            
                <iep-form-item class="form-half" prop="remark" label-name="备注信息" tip="请输入备注信息">
                  <iep-input-area v-model="formSecond.remark"></iep-input-area>
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
import { addShipCrew, detailShipCrew } from '@/api/ships/shipcrew/index'
import { getIdcardCheck } from '@/api/tmlms/boatMan/index'
import debounce from 'lodash/debounce'
import { remote } from '@/api/admin/dict'
import { detailCrew } from '@/api/tmlms/boatMan/index'
import { getWholeInfo } from '@/api/post/admin'
export default {
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
      form:{
        realName:'',
        idcard: '',
        phone: '',
        positionId: '',
      },
      formSecond: {
        realName: '',
        gender: '',
        idcard: '',
        birthday: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        nationality: '',
        nation: '',
        address: '',
        phone: '',
        contactName: '',
        contactPhone: '',
        positionId: '',
        isTrain: '',
        applyType: '',
        speciality: '',
        photoFront: '',
        photoReverse: '',
        idcardPhoto: '',
        facePhoto: '',
        remark: '',
      },
      applyTypes: [
        {id:1, name:'以旧换新'}, {id:2, name:'普通船员'}, {id:3, name:'职务船员'}, {id:4, name:'证书换发'}, 
        {id:5, name:'证书补发'}, {id:6, name:'其他'}, 
      ],
      rules: {
          realName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          idcard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ],
      },
      idcards: [],
      loading: false,
      isExist: false,
      crewIdcard: '',
    }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {

        // this.form.shipId = this.$route.query.edit
        this.form.shipId=this.$route.params.shipId
        console.log(this.$route.params.shipId)
        if (valid) {
          // if (this.$route.query.edit){
          //   addShipCrew (this.form).then(() => {
          //     this.$message.success('新增成功!')
          //     this.$router.go(-1)
          //   })
          // }
          if(this.$route.params.shipId){
            addShipCrew (this.form).then(() => {
              this.$message.success('新增成功!')
              this.$router.go(-1)
            })
          }
        } else {
          return false
        }
      })
    },
    idcardChange (card) {
      if (typeof card === 'object') {
        //this.refreshCard(card)
      } else {
        //this.refreshCard({idcard: card})
      }
      this.idcards = []
    },
    refreshCard (card) {
      if(card !== null) {
        let { idcard = '', phone = '', realName ='', positionId ='' } = card
        this.form.phone = phone
        this.form.idcard = idcard
        this.form.positionId = positionId
        this.form.realName = realName      
      } else {
        this.form.phone = ''
        this.form.idcard = ''
        this.form.positionId = ''
        this.form.realName = ''  
      }
    },
    getidcardList (number) {
      this.loading = false
      if (number !== '') {
        getIdcardCheck(number).then(({data}) => {
          if (data.data !== true) {
            this.idcards.push(data.data)
          } else {
            this.form.idcard = number
          }
        })
      } else {
        this.idcards = []
      }
      this.loading = false
    },
    getDict (name, val) {
      return remote(name).then(res =>{
        let dicName = ''
        res.data.data.forEach(m => {
          if (m.value === val) {
            dicName = m.label
          }         
        })
        return dicName
      })
    },
    async getcrewIdcard () {
      await detailShipCrew(this.$route.query.see).then(res => {
        this.crewIdcard = res.data.data.idcard
      })
      detailCrew(this.crewIdcard).then(data => {
        if(JSON.stringify(data.data.data) !== '{}') {
          this.isExist = true
          this.formSecond = data.data.data
          this.getDict('tyb_resume_position', this.formSecond.positionId).then(res => { this.formSecond.positionId = res })
          this.applyTypes.forEach(m => { if (m.id === this.formSecond.applyType) { this.formSecond.applyType = m.name }})
          getWholeInfo(this.formSecond.provinceId).then(res => { this.formSecond.provinceId = res.data.data.name })
          getWholeInfo(this.formSecond.cityId).then(res => { this.formSecond.cityId = res.data.data.name })
          getWholeInfo(this.formSecond.districtId).then(res => { this.formSecond.districtId = res.data.data.name })
        } else {
          this.isExist = false
          this.getdetailShipCrew()
        }   
      })
    },
    getdetailShipCrew () {
      detailShipCrew(this.$route.query.see).then( res=>{
        if (this.isExist === false) {
          this.form = res.data.data
          this.getDict('tyb_resume_position', this.form.positionId).then(res => { this.form.positionId = res })
        }
      })
    },
  },
  computed: {
  },
  created () {
    if(this.$route.query.see){    
      this.getcrewIdcard()
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
