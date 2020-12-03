<template>
  <basic-container>
    <page-header :title="title" :backOption="backOption"></page-header>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" :disabled="status === 'detail'">
      <el-form-item label="渔船名" prop="shipName">
        <el-select
            v-model="form.shipName"
            style="width: 100%;"
            placeholder=""
            filterable
            remote
            maxlength="20"
            @change="onChange"
            :remote-method="getShipNameList">
            <el-option v-for="item in shipNames" :key="item.shipId" :label="item.shipName" :value="item.shipName"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="持证人" prop="shipownerName">
        <el-input v-model.trim="form.shipownerName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="shipownerPhone">
        <el-input v-model.trim="form.shipownerPhone" type="number"></el-input>
      </el-form-item>
      <el-form-item label="联系设备" prop="relationshipType">
        <el-select v-model="form.relationshipType" placeholder="">
          <el-option
            v-for="item in map.relationshipType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系号码" prop="relationshipNumber" v-if="form.relationshipType !== 3">
        <el-input v-model.trim="form.relationshipNumber"></el-input>
      </el-form-item>
      <el-form-item label="联系事由" prop="relationshipReason">
        <el-select v-model="form.relationshipReason" placeholder="">
          <el-option
            v-for="item in dictGroup.tyb_contact_information"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系时间" prop="relationshipTime">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          v-model="form.relationshipTime"
          type="datetime"
          placeholder=""
          align="right">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <operation-wrapper v-if="status !== 'detail'">
      <iep-button type="primary" @click="handleSubmit" style="margin-left: 150px;">保存</iep-button>
    </operation-wrapper>
  </basic-container>
</template>
<script>
import { getPageById, updatePage, createPage, getPageLast } from '@/api/tmlms/relation'
import { getShipNames } from '@/api/ships/index'
import { mapGetters } from 'vuex'
import map from './map'
import { initNow } from '@/util/date'
// const checkPhone = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('联系号码不能为空'))
//   } else if (!(/^1[3456789]d{9}$/.test(value))) {
//     return callback(new Error('联系号码不正确'))
//   }
//   return callback()
// }
export default {
  data () {
    return {
      map,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      status: '',
      form: {
        relationshipType: '',
      },
      shipNames: [],
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          },
        }],
      },
      rules:{
        shipName: [{ required: true, message: '请输入渔船名', trigger: 'change' }],
        shipownerName: [{ required: true, message: '请输入持证人', trigger: 'blur' }],
        shipownerPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { validator: checkPhone, trigger: ['change'] },
        ],
        relationshipType: [{ required: true, message: '请选择联系设备', trigger: 'change' }],
        relationshipNumber: [{ required: true, message: '请输入联系号码', trigger: 'blur' }],
        relationshipReason: [{ required: true, message: '请选择联系事由', trigger: 'change' }],
        relationshipTime: [{ required: true, message: '请选择联系时间', trigger: 'change' }],
      },
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    // rules () {
    //   if (this.form.relationshipType !== 3) {
    //     return {
    //       shipName: [{ required: true, message: '请输入渔船名', trigger: 'change' }],
    //       shipownerName: [{ required: true, message: '请输入持证人', trigger: 'blur' }],
    //       shipownerPhone: [
    //         { required: true, message: '请输入手机号', trigger: 'blur' },
    //         // { validator: checkPhone, trigger: ['change'] },
    //       ],
    //       relationshipType: [{ required: true, message: '请选择联系设备', trigger: 'change' }],
    //       relationshipNumber: [{ required: true, message: '请输入联系号码', trigger: 'blur' }],
    //       relationshipReason: [{ required: true, message: '请选择联系事由', trigger: 'change' }],
    //       relationshipTime: [{ required: true, message: '请选择联系时间', trigger: 'change' }],
    //     }
    //   }
    //   return {
    //     shipName: [{ required: true, message: '请输入渔船名', trigger: 'change' }],
    //     shipownerName: [{ required: true, message: '请输入持证人', trigger: 'blur' }],
    //     shipownerPhone: [
    //       { required: true, message: '请输入手机号', trigger: 'blur' },
    //       // { validator: checkPhone, trigger: ['change'] },
    //     ],
    //     relationshipType: [{ required: true, message: '请选择联系设备', trigger: 'change' }],
    //     // this.form.relationshipType !== 3
    //     relationshipNumber: [{ required: false, message: '请输入联系号码', trigger: 'blur' }],
    //     relationshipReason: [{ required: true, message: '请选择联系事由', trigger: 'change' }],
    //     relationshipTime: [{ required: true, message: '请选择联系时间', trigger: 'change' }],
    //   }
    // },
    title () {
      if (this.status === 'add') {
        return '新增联系记录'
      } else if (this.status === 'detail') {
        return '联系记录详情'
      } else if (this.status === 'update') {
        return '编辑联系记录'
      }
      return '联系记录'
    },
  },
  created () {
    let id = this.$route.query.id
    this.status = this.$route.query.status
    if (id) {
      this.getList(id)
    }
    if (this.status === 'add') {
      this.$set(this.form, 'relationshipTime', initNow())
      console.log('add', this.form)
    }
  },
  watch: {
    'form.relationshipType': {
      handler (newVal) {
        this.getShipNameLastInfo()
        if (newVal === 3) {
          this.form.relationshipNumber = ''
        }
      },
    },
    'form.shipName': {
      handler () {
        this.getShipNameLastInfo()
      },
    },
  },
  methods: {
    getShipNameLastInfo () {
      if (this.form.shipName && this.form.relationshipType && this.status !== 'detail') {
        getPageLast({shipName: this.form.shipName, relationshipType: this.form.relationshipType}).then(({ data }) => {
          if (data.code === 0) {
            if (data.data && this.form.relationshipType === data.data.relationshipType) {
              this.$set(this.form, 'relationshipNumber', data.data.relationshipNumber)
            }
          }
        })
      }
    },
    getShipNameList (name) {
      if (name.length === 5) {
        getShipNames(name).then(({data}) => {
          if (data.code === 0) {
            this.shipNames = data.data
          }
        })
      }
    },
    onChange (shipName) {
      let data = this.shipNames.filter((item) => {
        return item.shipName === shipName
      })
      if (data && data.length > 0) {
        this.$set(this.form, 'shipownerName', data[0].shipowner)
        this.$set(this.form, 'shipownerPhone', data[0].mobile)
      } else {
        this.form.shipownerName = ''
        this.form.shipownerPhone = ''
      }
    },
    getList (id) {
      getPageById(id).then(({ data }) => {
        if (data.code === 0) {
          this.form = data.data
        }
      })
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
    handleSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let api = this.status === 'add' ? createPage : (this.status === 'update' ? updatePage : null)
          if (api) {
            api(this.form).then(({ data }) => {
              if (data.code === 0) {
                this.$notify({
                  message: this.status === 'add' ? '新增成功' : '编辑成功',
                  type: 'success',
                })
                this.onGoBack()
              }
            })
          } 
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>

</style>