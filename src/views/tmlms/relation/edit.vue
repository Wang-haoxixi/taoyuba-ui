<template>
  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="150px" :disabled="status === 'detail'">
    <el-row>
      <el-col :span="24">
        <el-form-item label="渔船名" prop="shipName">
          <el-select
            v-model="form.shipName"
            style="width: 100%;"
            placeholder=""
            filterable
            remote
            :disabled="shipNameDisabled"
            maxlength="20"
            @change="onChange"
            :remote-method="getShipNameList">
            <el-option v-for="item in shipNames" :key="item.shipId" :label="item.shipName" :value="item.shipName"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="span">
        <el-form-item label="联系人" prop="shipownerName">
          <el-input v-model.trim="form.shipownerName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="span">
        <el-form-item label="手机号" prop="shipownerPhone">
          <el-input v-model.trim="form.shipownerPhone" type="number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="span">
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
      </el-col>
      <el-col :span="span">
        <el-form-item label="联系号码" prop="relationshipNumber" v-if="form.relationshipType !== 3">
          <el-input v-model.trim="form.relationshipNumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="span">
        <el-form-item label="联系事由" prop="relationshipReason">
          <el-input v-model.trim="form.relationshipReason" maxlength="50"></el-input>
          <!-- <el-select v-model="form.relationshipReason" placeholder="">
            <el-option
              v-for="item in dictGroup.tyb_contact_information"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-form-item>
      </el-col>
      <el-col :span="span">
        <el-form-item label="联系时间" prop="relationshipTime">
          <el-date-picker
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            v-model="form.relationshipTime"
            type="datetime"
            placeholder=""
            align="right">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="附件">
          <el-upload
            class="upload-demo"
            action="/api/admin/file/upload/avatar"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :before-upload="handleBeforeUpload"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            multiple
            :headers="headers"
            list-type="picture-card">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">{{`只能上传图片文件，且不超过4M`}}</div>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
      <el-dialog :visible.sync="dialogVisible" append-to-body width="820px">
        <div style="text-align: center;">
          <img style="max-width: 780px;" :src="dialogImageUrl" alt="">
        </div>
      </el-dialog>
    </el-form>
</template>
<script>
import { getPageById, updatePage, createPage, getPageLast } from '@/api/tmlms/relation'
import { getShipNames } from '@/api/ships/index'
import { mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import map from './map'
export default {
  props: {
    status: String,
    value: {
      type: Object,
      default: () => {
        return {
          shipName: '',
        }
      },
    },
    span: {
      type: Number,
      dafault: 24,
    },
    shipNameDisabled: {
      type: Boolean,
      dafault: false,
    },
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      map,
      form: {
        shipownerName: '',
        shipownerPhone: '',
        relationshipType: '',
        files:[],
      },
      fileList: [],
      shipNames: [],
      // pickerOptions: {
      //   shortcuts: [{
      //     text: '今天',
      //     onClick (picker) {
      //       picker.$emit('pick', new Date())
      //     },
      //   }],
      // },
      rules:{
        shipName: [{ required: true, message: '请输入渔船名', trigger: ['change', 'blur'] }],
        shipownerName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        shipownerPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { validator: checkPhone, trigger: ['change'] },
        ],
        relationshipType: [{ required: true, message: '请选择联系设备', trigger: 'change' }],
        relationshipNumber: [{ required: true, message: '请输入联系号码', trigger: 'blur' }],
        relationshipReason: [{ required: true, message: '请选择联系事由', trigger: 'blur' }],
        relationshipTime: [{ required: true, message: '请选择联系时间', trigger: 'change' }],
      },
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
      'access_token',
    ]),
    headers () {
      return {
        'Authorization': 'Bearer ' + this.access_token,
      }
    },
    pickerOptions () {
      return {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          },
        }],
        selectableRange: (() => {
          let data = new Date()
          let hour = data.getHours()
          let minute = data.getMinutes()
          let second = data.getSeconds()
          if (this.form.relationshipTime && data.getFullYear() == new Date(this.form.relationshipTime).getFullYear() && data.getMonth() == new Date(this.form.relationshipTime).getMonth() && data.getDate() == new Date(this.form.relationshipTime).getDate()) {
            return [`00:00:00 - ${hour}:${minute}:${second}`]
          } else {
            return ['00:00:00 - 23:59:59']
          }
        })(),
        disabledDate (time) {
          return (
            time.getTime() > Date.now()
          )
        },
      }
    },
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
    value: {
      handler (newVal) {
        this.form.shipName = newVal.shipName || ''
        this.form.shipownerName = newVal.shipownerName || ''
        this.form.shipownerPhone = newVal.shipownerPhone || ''
        this.getShipNameLastInfo()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handlePictureCardPreview (file) {
      // console.log('file', file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess (response, file, fileList) {
      // console.log('handleSuccess', response, file, fileList)
      let arr = cloneDeep(this.form.files)
      if (!Array.isArray(this.form.files)) {
        this.form.files = []
      }
      fileList.forEach((item) => {
        let obj = {
          name: '',
          url: item.response ? item.response.data.url : '',
        }
        if (obj.url !== '' && arr.findIndex(item => item.url === obj.url) === -1) {
          arr.push(obj)
        }
      })
      this.form.files = arr
      // console.log('this.form.files', this.form.files)
    },
    handleRemove (file) {
      // console.log('handleRemove', file)
      let url = file.url
      let index = this.form.files.findIndex((item) => {
        return item.url === url
      })
      if (index > -1) {
        this.form.files.splice(index, 1)
      }
      // console.log('handleRemove', this.form.fileList)
    },
    handleBeforeUpload (file) {
      //图片格式
      // const isJPG = file.type === 'image/jpg' || file.type === 'image/png'
        //图片大小
      const isLt2M = file.size / 1024 / 1024 < 4
      // if (!isJPG) {
      //   this.$message.error('上传图片只能为jpg或png格式')
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过4MB')
      }
      return isLt2M
    },
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
    async getShipNameList (name) {
      if (name.length === 5) {
        try {
          let res = await getShipNames(name)
          let data = res.data
          if (data.code === 0) {
            this.shipNames = data.data
          }
          // getShipNames(name).then(({data}) => {
          //   console.log('data')
          //   if (data.code === 0) {
          //     this.shipNames = data.data
          //   } else {
          //     this.$notify({
          //       title: '警告',
          //       message: data.msg || '数据更新失败',
          //       type: 'warning',
          //     })
          //   }
          // })
        } catch (err) {
          this.$message({
            message: err || '数据查询失败',
            type: 'warning',
          })
        }
      }
    },
    onChange (shipName) {
      let data = this.shipNames.filter((item) => {
        return item.shipName === shipName
      })
      console.log('data', data, shipName)
      if (data && data.length > 0) {
        this.$set(this.form, 'shipownerName', data[0].shipowner)
        this.$set(this.form, 'shipownerPhone', data[0].mobile)
        console.log('this.form', this.form)
      } else {
        this.form.shipownerName = ''
        this.form.shipownerPhone = ''
      }
    },
    getList (id) {
      getPageById(id).then(({ data }) => {
        if (data.code === 0) {
          let result = data.data
          let arr = []
          if (result.relationshipImages == null) {
            result.relationshipImages = []
          }
          result.relationshipImages.forEach(url => {
            let obj = {
              name: '',
              url: url,
            }
            arr.push(obj)
          })
          this.fileList = arr
          result.files = arr
          this.form = result
          console.log('result', result)
        }
      })
    },
    handleSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let api = this.status === 'add' ? createPage : (this.status === 'update' ? updatePage : null)
          if (api) {
            this.form.relationshipImages = this.form.files.map(item => item.url) || []
            api(this.form).then(({ data }) => {
              if (data.code === 0) {
                this.$notify({
                  message: this.status === 'add' ? '新增成功' : '编辑成功',
                  type: 'success',
                })
                this.$emit('end')
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