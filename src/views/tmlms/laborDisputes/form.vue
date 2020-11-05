<template>
 <basic-container>
   <page-header :title="title" :backOption="backOption"></page-header>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" :disabled="status === 'detail'">
      <div class="title">船东信息</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="渔船名" prop="shipName">
            <el-select v-model="form.shipName"
                      style="width: 100%;"
                      placeholder="请选择"
                      filterable
                      remote
                      maxlength="20"
                      :loading="loading"
                      clearable
                      @change="shipNameChange"
                      :remote-method="getShipNameList">
              <el-option v-for="item in shipNames" :key="item.shipId" :label="item.shipName" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="持证人/公司名称" prop="shipowner">
            <el-input v-model.trim="form.shipowner"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证/企业代码" prop="shipownerIdcard">
            <el-input v-model.trim="form.shipownerIdcard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系号码" prop="shipownerMobile">
            <el-input v-model.trim="form.shipownerMobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">船员信息</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="船员姓名" prop="crewRealName">
            <el-input v-model.trim="form.crewRealName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="crewIdcard">
            <el-input v-model.trim="form.crewIdcard" @blur="getEmployee"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="crewPhone">
            <el-input v-model.trim="form.crewPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">纠纷详情</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="纠纷原因" prop="disputeReason">
            <el-select v-model="form.disputeReason" placeholder="">
              <el-option v-for="item in maps.disputeReason" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="纠纷描述" prop="disputeContent">
            <iep-froala-editor v-model="form.disputeContent" :disabled="status === 'detail'"></iep-froala-editor>
            <!-- <el-input v-model.trim="form.disputeContent" type="textarea"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纠纷状态" prop="status">
            <el-select v-model="form.status" placeholder="">
              <el-option v-for="item in maps.status" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="statusShow" v-if="type == 1">
          <el-form-item label="处理结果" prop="result">
            <el-input v-model.trim="form.result" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="statusShow" v-if="type == 1">
          <el-form-item label="船东分" prop="shipownerScore">
            <el-rate v-model="form.shipownerScore" :max="10" show-score style="margin-top: 10px;" text-color="#ff9900"></el-rate>
            <!-- <el-input-number v-model="form.shipownerScore" :min="1" :max="10" :step="1" step-strictly></el-input-number> -->
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="statusShow" v-if="type == 1">
          <el-form-item label="船员分" prop="crewScore">
            <el-rate v-model="form.crewScore" :max="10" show-score style="margin-top: 10px;" text-color="#ff9900"></el-rate>
            <!-- <el-input-number v-model="form.crewScore" :min="1" :max="10" :step="1" step-strictly></el-input-number> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <operation-wrapper v-if="status !== 'detail'">
      <iep-button type="primary" @click="handleSubmit" style="margin-left: 150px;">保存</iep-button>
    </operation-wrapper>
</basic-container>
</template>
<script>
import { createPage, editPage, getPageById } from '@/api/tmlms/laborDisputes/index'
import { getShipNames } from '@/api/ships/index'
import { detailCrew } from '@/api/tmlms/boatMan/index'
import debounce from 'lodash/debounce'
import maps from './maps'

function initForm () {
  return {
    id: undefined,
    shipName: '', // 渔船名
    shipowner: '', // 持证人姓名
    shipownerIdcard: '', // 身份证号
    shipownerMobile: '', // 联系号码
    crewRealName: '', // 船员姓名
    crewIdcard: '', // 身份证号
    crewPhone: '', // 联系电话
    disputeReason: '', // 纠纷原因
    disputeContent: '', // 纠纷描述
    status: '', // 纠纷状态
    result: '', // 处理结果
    shipownerScore: '', // 船东分
    crewScore: '', // 船员分
  }
}
export default {
  data () {
    this.getShipNameList = debounce(this.getShipNameList, 50)
    let validateIdCard = (rule, value, callback) => {
      let patt = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (value === '') {
         callback(new Error('请输入身份证号'))
      } else if (!patt.test(value)) {
        callback(new Error('身份证号不正确'))
      } else {
        callback()
      }
    }
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('手机号不正确'))
      } else {
        callback()
      }
    }
    return {
      form: initForm(),
      disabled: false,
      status: '',
      statusShow: false,
      loading: false,
      shipNames: [],
      type: '',
      maps,
      rules: {
        shipName: [
          { required: true, message: '请输入渔船名', trigger: 'change' },
        ],
        shipowner: [
          { required: true, message: '请输入持证人/公司名称', trigger: 'blur, change' },
        ],
        shipownerIdcard: [
          { required: true, message: '请输入身份证/企业代码', min: 18, max: 18, trigger: 'blur' },
          // { validator: validateIdCard, trigger: 'blur' },
        ],
        shipownerMobile: [
          { required: true, message: '请输入联系号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' },
        ],
        crewRealName: [
          { required: true, message: '请输入船员姓名', trigger: 'blur' },
        ],
        crewIdcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validateIdCard, trigger: 'blur' },
        ],
        crewPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' },
        ],
        disputeReason: [
          { required: true, message: '请选择纠纷原因', trigger: 'change' },
        ],
        disputeContent: [
          { required: true, message: '请输入纠纷描述', trigger: 'blur' },
        ],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
    }
  },
  watch: {
    'form.status': {
      handler (newVal) {
        this.statusShow = newVal === 1
        if (!this.statusShow) {
          this.form.shipownerScore = ''
          this.form.crewScore = ''
        }
      },
      deep: true,
    },
  },
  mounted () {
    let query = this.$route.query
    if (query.status) {
      this.status = query.status
    }
    if (query.type) {
      this.type = +query.type
    }
    if (query.id) {
      this.getList(query.id)
    }
  },
  computed: {
    title () {
      if (this.status === 'create') {
        return '新增劳资纠纷管理'
      } else if (this.status === 'update') {
        return '编辑劳资纠纷管理'
      }
      return '劳资纠纷管理'
    },
  },
  methods: {
    getEmployee () {
      let patt = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (this.form.crewIdcard === '') {
        return
      }
      if (patt.test(this.form.crewIdcard)) {
        detailCrew(this.form.crewIdcard).then(({ data }) => {
          if (data.code === 0) {
            this.form.crewRealName = data.data.realName
            this.form.crewPhone = data.data.phone
          }
        })
      } else {
        this.$message({
          message: '身份证号码不正确',
          type: 'warning',
        })
      }
    },
    getShipNameList (name) {
      this.loading = false
      if (name !== '') {
        getShipNames(name).then(({data}) => {
          if (data.code === 0) {
            this.shipNames = []
            this.shipNames = data.data
          }
        })
      } else {
        this.shipNames = []
      }
      this.loading = false
    },
    shipNameChange (ship) {
      if (typeof ship === 'object') {
        this.refreshShipName(ship)
      } else {
        this.refreshShipName({shipName: ship})
      }
      this.shipNames = []
    },
    refreshShipName (ship) {
      if (ship !== null) {
        let {shipName = '', shipowner ='', shipownerIdcard = '', mobile =''} = ship
        this.form.shipName = shipName
        this.form.shipowner = shipowner
        this.form.shipownerIdcard = shipownerIdcard
        this.form.shipownerMobile = mobile
      } else {
        this.form.shipName = ''
        this.form.shipowner = ''
        this.form.shipownerIdcard = ''
        this.form.shipownerMobile = ''
      }
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
    getList (id) {
      getPageById(id).then(({ data }) => {
        if (data.code === 0) {
          this.form = data.data
        }
      })
    },
    handleSubmit () {
       this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let api = this.status === 'create' ? createPage : (this.status === 'update' ? editPage : null)
            if (api) {
              if (this.status === 'update') {
                this.form.type = this.type
              }
              api(this.form).then(({ data }) => {
                if (data.code === 0) {
                   this.$notify({
                    message: this.status === 'create' ? '新增成功' : '编辑成功',
                    type: 'success',
                  })
                  this.onGoBack()
                }
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
       })
    },
  },
}
</script>
<style lang="scss" scoped>
  .title {
    font-size: 20rpx;
    padding: 20px;
    font-weight: 700;
  }
</style>