<template>
  <div>
    <el-form ref="ruleForm" :model="form" label-width="120px" :disabled="disabled">
      <el-row>
        <template v-for="(item, index) in options">
          <div :key="index">
            <div class="title">{{item.title}}</div>
            <div v-for="(item1, index1) in item.column" :key="index1">
              <div v-if="item1.column">
                <div class="title">{{item1.title}}</div>
                <template v-for="(item2, index2) in item1.column">
                  <el-col :span="item2.span || 24" :key="index2">
                    <el-form-item :label="`${item2.label}:`">
                      <template v-if="item2.type === 'input'">
                        <el-input v-model="value[item2.prop]"></el-input>
                      </template>
                      <template v-if="item2.type === 'number'">
                        <el-input v-model="value[item2.prop]" type="number"></el-input>
                      </template>
                      <template v-if="item2.type === 'select'">
                        <el-select v-model="value[item2.prop]" placeholder="">
                          <el-option :label="map.label" :value="map.value" :key="map.value" v-for="map in item2.dictMap"></el-option>
                        </el-select>
                      </template>
                      <template v-if="item2.type === 'upload'">
                        <el-upload
                          :headers="headers"
                          :limit="2"
                          action="/api/admin/file/upload/avatar"
                          list-type="picture-card"
                          :file-list="value[item2.prop]"
                          :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, item2.prop)}"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="(file, fileList) => {handleRemove(file, fileList, item2.prop)}">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </template>
                    </el-form-item>
                  </el-col>
                </template>
              </div>
              <el-col :span="item1.span || 24" v-else>
                <el-form-item :label="`${item1.label}:`">
                  <el-upload
                    :headers="headers"
                    :limit="2"
                    action="/api/admin/file/upload/avatar"
                    list-type="picture-card"
                    :file-list="value[item1.prop]"
                    :on-success="(response, file, fileList) => {handleSuccess(response, file, fileList, item1.prop)}"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="(file, fileList) => {handleRemove(file, fileList, item2.prop)}">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </div>
          </div>
        </template>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl">
    </el-dialog>
  </div>
</template>
<script>
import store from '@/store'
export default {
  props: {
    options: Array,
    value: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      dialogVisible: false,
      dialogImageUrl: '',
      form: {},
    }
  },
  methods: {
    onSubmit () {
      this.$emit('input', this.form)
      this.$emit('submit')
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
      this.value[name] = this.value[name] ? this.value[name] : []
      this.value[name].push(obj)
    },
    clearValidate () {
      this.$refs.ruleForm.clearValidate()
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>