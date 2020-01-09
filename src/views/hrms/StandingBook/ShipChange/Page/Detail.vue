<template>
  <div class="training_detail">
    <basic-container>
        <h1>{{  $route.query.see ? '查看' : $route.query.edit ? '编辑' :'新增' }}变更渔船信息</h1>
        <el-form :model="shipChange" ref="form" label-width="150px" :rules="rules" :disabled="seeManager">
          <el-row>
            <el-col :span="12">
              <el-form-item label="变更类型:" prop="type">
                <el-radio-group v-model="shipChange.type" @change="changeType" :disabled="isDisabled">
                  <el-radio :label="1">变更船名</el-radio>
                  <el-radio :label="2">变更持证人</el-radio>
                  <el-radio :label="3">变更服务公司</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">           
              <el-form-item label="渔船名:" prop="shipName" v-if="isType === 1 || isType === 2 || isType === 3">
                <el-select v-model="shipChange.shipName"
                  ref="select" placeholder="请填写" filterable remote maxlength="20"
                  :loading="loading" clearable @change="shipNameChange"
                  :remote-method="getShipNameList" style="width:380px!important" :disabled="isDisabled">
                  <el-option v-for="item in shipNames" :key="item.shipNo" :label="item.shipName" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="变更渔船名:" prop="newShipName" v-if="isType === 1">
                <el-input v-model="shipChange.newShipName" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="持证人姓名:" prop="shipownerName" v-if="isType === 1 || isType === 2">
                <el-input v-model="shipChange.shipownerName" placeholder="" :disabled="isOpen"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="持证人身份证:" prop="shipownerIdcard" v-if="isType === 1 || isType === 2">
                <el-input v-model="shipChange.shipownerIdcard" placeholder="" :disabled="isOpen"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="联系电话:" prop="shipownerPhone" v-if="isType === 1 || isType === 2">
                <el-input v-model="shipChange.shipownerPhone" placeholder="" :disabled="isOpen"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="应急联系电话:" prop="otherPhone" v-if="isType === 1 || isType === 2">
                <el-input v-model="shipChange.otherPhone" placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">        
              <el-form-item label="挂靠基层:" prop="villageId" v-if="isType === 3">
                <el-select v-model="shipChange.villageId"
                  ref="selectVail" placeholder="请填写" filterable remote maxlength="20"
                  :loading="loading" clearable
                  :remote-method="getVillageIdList" style="width:380px!important">
                  <el-option v-for="item in villageIds" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">        
              <el-form-item label="持证人身份证照片:" prop="idcardimages" v-if="isType === 1 || isType === 2">
                <el-upload action="/api/admin/file/upload/avatar" list-type="picture-card" ref="uploadIdcard"
                  :on-success="handleImageIdcard" :headers="headers" :file-list="idcardList"
                  :on-remove="handleIdcardRemove" :limit="num" accept="image/*">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">        
              <el-form-item label="转移证明:" prop="changeimages" v-if="isType === 1">
                <el-upload action="/api/admin/file/upload/avatar" list-type="picture-card" ref="uploadChange"
                  :on-success="handleImageChange" :headers="headers" :file-list="changeList"
                  :on-remove="handleChangeRemove" :limit="num" accept="image/*">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">        
              <el-form-item label="船名核准书:" prop="shipNameimages" v-if="isType === 1">
                <el-upload action="/api/admin/file/upload/avatar" list-type="picture-card" ref="uploadShipname"
                  :on-success="handleShipnameChange" :headers="headers" :file-list="shipnameList"
                  :on-remove="handleShipnameRemove" :limit="num" accept="image/*">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">        
              <el-form-item label="挂靠合同:" prop="contractimages" v-if="isType === 2 || isType === 3">
                <el-upload action="/api/admin/file/upload/avatar" list-type="picture-card" ref="uploadContract"
                  :on-success="handleImageContract" :headers="headers" :file-list="contractList"
                  :on-remove="handleContractRemove" :limit="num" accept="image/*">
                  <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div style="text-align:center">
          <el-button @click="save" v-if="shipChange.type > 0">提交</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </basic-container>
  </div>
</template>
<script>
import { saveShipChange, detailShipChange, editShipChange } from '@/api/hrms/shipchange'
import { getImageById } from '@/api/tmlms/multiimage'
import { getByVillagename } from '@/api/tmlms/bvillage/index'
import { findMyship } from '@/api/ships/index'
// import debounce from 'lodash/debounce'
import store from '@/store'
export default {
  data () {
    // this.getShipNameList = debounce(this.getShipNameList, 50)
      // var checkPhone = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入手机号码'))
      //   } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)) {
      //     callback(new Error('请输入正确的手机号码!'))
      //   } else {
      //     callback()
      //   }
      // }
    return {
        show: false,
        shipChange: {
          type: 0,
          shipNo: '',
          shipName: '',
          newShipName: '',
          shipownerName: '',
          shipownerIdcard: '',
          shipownerPhone: '',
          otherPhone: '',
          villageId: '',
          imageIdcard: '',
          imageChange: '',
          imageShipname: '',
          imageContract: '',
          idcardimages: '',
          changeimages: '',
          shipNameimages: '',
          contractimages: '',
        },
        rules: {
          shipName: [
            { required: true, message: '请输入渔船名', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请输入变更类型', trigger: 'blur' },
          ],
          // newShipName: [
          //   { required: true, message: '请输入变更渔船名', trigger: 'blur' },
          // ],
          // phone: [
          //     { required: true, message: '请输入联系电话', trigger: 'blur' },
          //     { validator: checkPhone, trigger: 'blur' },
          // ],
        },
        headers: {
          Authorization: 'Bearer ' + store.getters.access_token,
        },
        num: 5,
        loading: false,
        shipNames: [],
        villageIds: [],
        no: '',
        changeList: [],
        idcardList: [],
        shipnameList: [],
        contractList: [],
    }
  },
  methods: {
    // 提交表单
    save () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (+this.$route.query.add === 0) {
            this.shipChange.shipNo = this.no
            this.shipChange.shipName = this.shipChange.shipName.shipName
            saveShipChange(this.shipChange).then(() => {
              this.$message.success('提交成功！')
              this.$router.push('/hrms_spa/shipChange__list') 
            }).catch(err => {
              this.$message.error(err.msg)
            })
          } else if(this.$route.query.edit) {
            this.$set(this.shipChange, 'imageIdcard', '')
            this.$set(this.shipChange, 'imageChange', '')
            this.$set(this.shipChange, 'imageShipname', '')
            this.$set(this.shipChange, 'imageContract', '')
            editShipChange(this.shipChange).then(() => {
              this.$message.success('修改成功！')
              this.$router.push('/hrms_spa/shipChange__list') 
            }).catch(err => {
              this.$message.error(err.msg)
            })
          }
        } else {
          return false
        }
      })
    },
    onSearchResult (pois) {
      this.mapCenter = [pois[0].lng, pois[0].lat]
      this.marker = [pois[0].lng, pois[0].lat]
    },
    getData () {
      detailShipChange(this.$route.query.edit || this.$route.query.see).then(data => {
        this.shipChange = data.data.data
        if (this.shipChange.imageChange) {
          this.$set(this.shipChange, 'changeimages', '')
          let id = this.shipChange.imageChange.split(',').map(Number)
          id.forEach(v => {
            getImageById(v).then(m => {
              this.changeList.push({ url: m.data.data.image })
              this.shipChange.changeimages = m.data.data.image + ',' + this.shipChange.changeimages
            })
          })
        }
        if (this.shipChange.imageContract) {
          this.$set(this.shipChange, 'contractimages', '')
          let id = this.shipChange.imageContract.split(',').map(Number)
          id.forEach(v => {
            getImageById(v).then(m => {
              this.contractList.push({ url: m.data.data.image })
              this.shipChange.contractimages = m.data.data.image + ',' + this.shipChange.contractimages
            })
          })
        }
        if (this.shipChange.imageIdcard) {
          this.$set(this.shipChange, 'idcardimages', '')
          let id = this.shipChange.imageIdcard.split(',').map(Number)
          id.forEach(v => {
            getImageById(v).then(m => {
              this.idcardList.push({ url: m.data.data.image })
              this.shipChange.idcardimages = m.data.data.image + ',' + this.shipChange.idcardimages
            })
          })
        }
        if (this.shipChange.imageShipname) {
          this.$set(this.shipChange, 'shipNameimages', '')
          let id = this.shipChange.imageShipname.split(',').map(Number)
          id.forEach(v => {
            getImageById(v).then(m => {
              this.shipnameList.push({ url: m.data.data.image })
              this.shipChange.shipNameimages = m.data.data.image + ',' + this.shipChange.shipNameimages
            })
          })
        }
      })
    },
    changeType () {
      this.$refs.form.clearValidate()
      if (this.$refs.uploadIdcard) {
        this.$refs.uploadIdcard.clearFiles()
      }
      if (this.$refs.uploadChange) {
        this.$refs.uploadChange.clearFiles()
      }
      if (this.$refs.uploadShipname) {
        this.$refs.uploadShipname.clearFiles()
      }
      if (this.$refs.uploadContract) {
        this.$refs.uploadContract.clearFiles()
      }
      this.$set(this.shipChange, 'shipName', '')
      this.$set(this.shipChange, 'shipNo', '')
      this.$set(this.shipChange, 'newShipName', '')
      this.$set(this.shipChange, 'shipownerName', '')
      this.$set(this.shipChange, 'shipownerIdcard', '')
      this.$set(this.shipChange, 'shipownerPhone', '')
      this.$set(this.shipChange, 'otherPhone', '')
      this.$set(this.shipChange, 'villageId', '')
      this.$set(this.shipChange, 'imageIdcard', '')
      this.$set(this.shipChange, 'imageChange', '')
      this.$set(this.shipChange, 'imageShipname', '')
      this.$set(this.shipChange, 'imageContract', '')
      this.$set(this.shipChange, 'idcardimages', '')
      this.$set(this.shipChange, 'changeimages', '')
      this.$set(this.shipChange, 'shipNameimages', '')
      this.$set(this.shipChange, 'contractimages', '')
    },
    handleImage (data, obj) {
      let image = ''
      image= data.data.url
      if(obj === '' || obj === undefined) {
        obj = image
      } else {
        obj = obj + ',' + image
      }
      return obj
    },
    handleRemove (data, obj) {
      if (data.length === 0) {
        obj = ''
      } else {
        let images = ''
        data.forEach(v => {
          if (v.url && !v.response) {
            images = v.url + ',' + images
          } else if (v.response && v.url) {
            images = v.response.data.url + ',' + images
          }
        })
        obj = images
      }
      // if (data.length === 0) {
      //   obj = ''
      // } else if (data.length >0 && data[0].url) {
      //   data.forEach(v => {
      //     images = v.url + ',' + images
      //   })
      //   obj = images
      // } else if (data.length > 0 && data[0].response){
      //   data.forEach(v => {
      //     images = v.response.data.url + ',' + images
      //   })
      //   obj = images
      // }
      return obj
    },
    handleImageIdcard (response) {
      this.shipChange.idcardimages = this.handleImage (response, this.shipChange.idcardimages)
    },
    handleImageChange (response) {
      this.shipChange.changeimages = this.handleImage (response, this.shipChange.changeimages)
    },
    handleShipnameChange (response) {
      this.shipChange.shipNameimages = this.handleImage (response, this.shipChange.shipNameimages)
    },
    handleImageContract (response) {
      this.shipChange.contractimages = this.handleImage (response, this.shipChange.contractimages)
    },
    handleIdcardRemove (file, fileList) {
      this.shipChange.idcardimages = this.handleRemove(fileList, this.shipChange.idcardimages)
    },
    handleChangeRemove (file, fileList) {
      this.shipChange.changeimages = this.handleRemove(fileList, this.shipChange.changeimages)
    },
    handleShipnameRemove (file, fileList) {
      this.shipChange.shipNameimages = this.handleRemove(fileList, this.shipChange.shipNameimages)
    },
    handleContractRemove (file, fileList) {
      this.shipChange.contractimages = this.handleRemove(fileList, this.shipChange.contractimages)
    },
    getShipNameList (shipName) {
      this.shipNames = []
      if (shipName !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          findMyship(shipName).then(({data}) => {
            if (data.data !== false) {
              this.shipNames.push(data.data)
            } else {
              this.$message.error(data.msg)
            }
          })
        }, 200)
      } else {
        this.shipNames = []
      }
    },
    shipNameChange (name) {
      this.no = name.shipNo                           
      if (typeof name === 'object') {      
        this.refreshShipName(name)
      } else {                                                    
        this.refreshShipName({shipName: name})
      }   
      this.shipNames = []       
    },
    refreshShipName (name) {
      if (name !== null) {
        let {shipowner = '', shipownerIdcard = '', mobile = '' } = name
        this.shipChange.shipownerName = shipowner
        this.shipChange.shipownerIdcard = shipownerIdcard
        this.shipChange.shipownerPhone = mobile
      } else {
        this.shipChange.shipName = ''
        this.shipChange.shipownerName = ''
        this.shipChange.shipownerIdcard = ''
        this.shipChange.shipownerPhone = ''
      }
    },
    getVillageIdList (villageName) {
      this.villageIds = []
      if (villageName !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          getByVillagename({villageName: villageName}).then(({data}) => {
            if (data.data.length > 0) {
              data.data.forEach(v => {
                this.villageIds.push({
                  label: v.villageName,
                  value: v.userId,
                })
              })
            } else {
              this.$message.error('请输入正确的挂靠基层！')
            }
          })
        }, 200)
      } else {
        this.villageIds = []
      }
    },
  },
  computed: {
    isType () {
      if (this.shipChange.type === 1) {
        let rule = [
          {
            required: true, message: '请输入变更渔船名', trigger: 'blur',
          },
        ]
        let rule2 = [
          {
            required: true, message: '请输入持证人身份证照片', trigger: 'blur',
          },
        ]
        let rule3 = [
          {
            required: true, message: '请输入转移证明', trigger: 'blur',
          },
        ]
        let rule4 = [
          {
            required: true, message: '请输入船名核准书', trigger: 'blur',
          },
        ]
        this.$set(this.rules, 'newShipName', rule)
        this.$set(this.rules, 'idcardimages', rule2)
        this.$set(this.rules, 'changeimages', rule3)
        this.$set(this.rules, 'shipNameimages', rule4)
        this.$delete(this.rules, 'shipownerName')
        this.$delete(this.rules, 'shipownerIdcard')
        this.$delete(this.rules, 'shipownerPhone')
        this.$delete(this.rules, 'villageId')
        this.$delete(this.rules, 'contractimages')
        return 1
      } else if (this.shipChange.type === 2) {
        var checkPhone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入手机号码'))
          } else if (!value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/)) {
            callback(new Error('请输入正确的手机号码!'))
          } else {
            callback()
          }
        }
        let rule1 = [
          {
            required: true, message: '请输入持证人姓名', trigger: 'blur',
          },
        ]
        let rule2 = [
          {
            required: true, message: '请输入持证人身份证', trigger: 'blur',
          },
        ]
        let rule3 = [
          {
            required: true, message: '请输入联系电话', trigger: 'blur',
          },
          { 
            validator: checkPhone, trigger: 'blur',
          },
        ]
        let rule4 = [
          {
            required: true, message: '请输入持证人身份证照片', trigger: 'blur',
          },
        ]
        let rule5 = [
          {
            required: true, message: '请输入挂靠合同', trigger: 'blur',
          },
        ]
        this.$set(this.rules, 'shipownerName', rule1)
        this.$set(this.rules, 'shipownerIdcard', rule2)
        this.$set(this.rules, 'shipownerPhone', rule3)
        this.$set(this.rules, 'idcardimages', rule4)
        this.$set(this.rules, 'contractimages', rule5)
        this.$delete(this.rules, 'newShipName')
        this.$delete(this.rules, 'villageId')
        this.$delete(this.rules, 'shipNameimages')
        this.$delete(this.rules, 'imageShipname')
        return 2
      } else if (this.shipChange.type === 3) {
        let rule = [
          {
            required: true, message: '请输入挂靠基层', trigger: 'blur',
          },
        ]
        let rule2 = [
          {
            required: true, message: '请输入挂靠合同', trigger: 'blur',
          },
        ]
        this.$set(this.rules, 'villageId', rule)
        this.$set(this.rules, 'contractimages', rule2)
        this.$delete(this.rules, 'newShipName')
        this.$delete(this.rules, 'shipownerName')
        this.$delete(this.rules, 'shipownerIdcard')
        this.$delete(this.rules, 'shipownerPhone')
        this.$delete(this.rules, 'idcardimages')  
        this.$delete(this.rules, 'imageChange')  
        this.$delete(this.rules, 'changeimages')     
        return 3
      } else {
        return 0
      }
    },
    isDisabled () {
      if (this.$route.query.edit || this.$route.query.see) {
        return true
      } else {
        return false
      }
    },
    seeManager () {
      if (this.$route.query.see) {
        return true
      } else {
        return false
      }
    },
    isOpen () {
      if(this.shipChange.type === 2) {
        return false
      } else {
        return true
      }
    },
  },
  created () {
    if (this.$route.query.edit || this.$route.query.see) {
      this.getData()
    } 
  },
  // activated () {
  //   this.$refs.form.resetFields()
  // },
}
</script>
<style lang="scss">
.el-form {
  margin-right: 16%;
}
.training_detail {
    .amap-demo {
        height: 300px;
        margin-top: 60px;
    }
    .search-box {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
    }
    .amap-page-container {
        position: relative;
    }
    .amap-logo {
        display: none;
    }
    .el-vue-search-box-container .search-tips {
        position: absolute;
        top: 100%;
        border: 1px solid #dbdbdb;
        background: #fff;
        overflow: auto;
        height: 300px;
        overflow: auto;
    }
}
</style>
