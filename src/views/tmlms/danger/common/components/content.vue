<template>
  <div class="form-item-wrapper">
    <!-- :rules="rules" -->
    <el-form :model="value" ref="ruleForm" label-width="100px" :disabled="disabled">
      <div v-for="(item, index) in curOptions" :key="index" class="item">
        <div class="title">{{item.title}}</div>
        <!-- 一级标题 -->
        <template v-if="item.type === 'info'">
          <el-row :gutter="20">
            <template v-for="(item1, index) in item.column">
              <el-col :span="12" :key="index" v-if="item1.type !== 'text'">
                <el-form-item :label="item1.label" :prop="item1.value">
                  <el-input v-model="value[item1.value]" :disabled="item1.disabled"></el-input>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
          <div class="history-wrapper" v-if="historyData.shipName">
            <div class="title-history">历史记录</div>
            <div class="history-info-wrapper">
              <el-row :gutter="20">
                <el-col :span="item1.spanHistory ? item1.spanHistory : 4" v-for="(item1, index) in item.column" :key="index">
                  {{item1.label}}：{{historyData[item1.value]}}
                </el-col>
              </el-row>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-for="(item1, index1) in item.column" :key="index1">
            <div class="sub-title">{{item1.title}}</div>
            <!-- 二级标题 -->
            <div v-for="(item2) in item1.props" :key="item2.value">
              <div class="item-title"><span class="fw7">排查要点：</span>{{item2.title}}</div>
              <!-- 三级标题 -->
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="排查情况：" :prop="`${item2.value}Result`">
                    <el-radio-group v-model="value[`${item2.value}Result`]" @change="(val) => {onChange(val, `${item2.value}`)}">
                      <el-radio :label="radio.value" v-for="(radio, i) in isNot" :key="i">{{radio.label}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="16" v-if="showUpload[item2.value] || value[`${item2.value}Result`] === 0">
                  <el-form-item label="照片：" :prop="`${item2.value}Image`">
                    <el-upload
                      :headers="headers"
                      :limit="2"
                      action="/api/admin/file/upload/avatar"
                      list-type="picture-card"
                      :file-list="value[`${item2.value}Image`]"
                      :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, `${item2.value}Image`)}"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="(file, fileList) => {handleRemove(file, fileList, `${item2.value}Image`)}">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="value[`${item2.value}Result`] === 0">
                  <el-form-item label="不合格原因：" :prop="`${item2.value}Reason`">
                    <el-input v-model="value[`${item2.value}Reason`]" :maxlength="200"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="history-wrapper"
                v-if="historyData
                  && (historyData[`${item2.value}Result`] === 0 || historyData[`${item2.value}Result`] === 1)">
                <div class="title-history">历史记录</div>
                <div class="text-wrapper">
                  <div class="text">排查情况：
                    <span :class="historyData[`${item2.value}Result`] === 0 ? 'error' : (historyData[`${item2.value}Result`] === 1 ? 'success' : '' )">
                      {{historyData[`${item2.value}Result`] === 0 ? '不合格' : (historyData[`${item2.value}Result`] === 1 ? '合格' : '' )}}
                    </span>
                  </div>
                  <div class="img-history-wrapper" v-if="historyData[`${item2.value}Image`].length > 0">
                    照片：
                    <div class="img-wrapper">
                      <img class="img" width="150px" height="150px" :src="img.url" v-for="(img, index) in historyData[`${item2.value}Image`]" :key="index" @click="handlePictureCardPreview(img)"/>
                    </div>
                  </div>
                  <div v-if="historyData[`${item2.value}Reason`]">不合格原因:{{ historyData[`${item2.value}Reason`] }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <el-form-item style="margin-top: 30px;" v-if="!disabled">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store'
import cloneDeep from 'lodash/cloneDeep'
export default {
  props: {
    value: Object,
    historyData: Object,
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      curOptions: [],
      dialogVisible: false,
      dialogImageUrl: '',
      showUpload: {},
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      isNot: [
        { label: '合格', value: 1 },
        { label: '不合格', value: 0 },
      ],
      once: true,
    }
  },
  computed: {
    rules () {
      let result = {}
      let options = this.curOptions
      if (options && options.length > 0) {
        for (let i = 0, len = options.length; i < len; i++) {
          let column = options[i].column
          if (options[i].type === 'info') {
            if (column && column.length > 0) {
              for (let j = 0, len1 = column.length; j < len1; j++) {
                let val = column[j]
                if (val.required) {
                  result[val.value] = [
                    { required: true, message: '不能为空', trigger: 'blur' },
                  ]
                }
              }
            }
          } else {
            if (column && column.length > 0) {
              for (let j = 0, len1 = column.length; j < len1; j++) {
                let props = column[j].props
                if (props && props.length > 0) {
                  for (let k = 0, len2 = props.length; k < len2; k++) {
                    let val = props[k]
                    if (val.required) {
                      result[`${val.value}Result`] = [
                        { required: true, message: '排查情况不能为空', trigger: 'change' },
                      ]
                      result[`${val.value}Image`] = [
                        { type: 'array', required: true, message: '照片不能为空', trigger: 'change' },
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      }
      return result
    },
  },
  watch: {
    rules: {
      handler () {
        setTimeout(() => {
          this.clearValidate()
        }, 20)
      },
      deep: true,
    },
    options: {
      handler (newVal) {
        this.curOptions = cloneDeep(newVal)
      },
      deep: true,
      immediate: true,
    },
    value: {
      handler (newVal) {
        if (newVal) {
          if (this.once) {
            for (let key in newVal) {
              if (key.indexOf('Image') > -1 && newVal[key].length > 0) {
                let name = key.replace('Image', '')
                this.uploadShowStatus(name, true)
              }
            }
            this.once = false
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    onChange (val, name) {
      // console.log('change', val, name)
      // this.value[`${name}Image`] = []
      let historyData = this.historyData
      if (historyData && historyData[`${name}Result`] === 0) {
        this.uploadShowStatus(name, true)
        // console.log('this.curOptions', this.curOptions)
        return
      }
      this.$set(this.value, `${name}Image`, [])
      let show = val === 0
      this.uploadShowStatus(name, show)
    },
    uploadShowStatus (name, status) {
      this.$set(this.showUpload, name, status)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList, name) {
      let url = file.url
      let index = this.value[name].findIndex((item) => {
        return item.url === url
      })
      if (index > -1) {
        this.value[name].splice(index, 1)
      }
    },
    handleSuccess (response, file, fileList, name) {
      let obj = {
        url: response.data.url,
      }
      console.log('name', name, this.value[name], obj)
      this.value[name] = this.value[name] ? this.value[name] : []
      this.value[name].push(obj)
      // console.log('handleSuccess', response, file, fileList, name, this.value[name])
    },
    clearValidate () {
      this.$refs.ruleForm.clearValidate()
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log('value', this.value)
          this.$emit('input', this.value)
          this.$emit('submit', this.value)
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
  .form-item-wrapper {
    color: #333;
    font-size: 16px;
    .item {
      padding: 20px 0;
      // margin: 20px 0;
      border-bottom: 1px solid #d7d7d7;
      &:first-child {
        padding-top: 0px;
      }
    }
    .title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .sub-title {
      margin-bottom: 10px;
      font-weight: 700;
      color: #666;
    }
    .item-title {
      margin-bottom: 10px;
      color: #666;
      font-size: 14px;
    }
    .fw7 {
      color: #409EFF;
    }
    .history-wrapper {
      background-color: #f6f6f6;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      .title-history {
        font-weight: 700;
        margin-bottom: 20px;
      }
      .text-wrapper {
        font-size: 14px;
        .success {
          color: #19be6b;
        }
        .error {
          color: #FF0000;
        }
      }
      .img-history-wrapper {
        .img-wrapper {
          display: flex;
          margin-bottom: 10px;
          img {
            margin: 10px 10px 0 0;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>