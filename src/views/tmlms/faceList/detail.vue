<template>
  <div class="contract-box">
    <basic-container>
      <el-form ref="form" :model="form" label-width="150px" size="small">
        <el-row>
          <el-col :span="12">
              <el-form-item label="姓名：">
                <el-input v-model="form.realName" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="性别：">
                  <el-select v-model="form.gender" :disabled="true">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="身份证：">
                <el-input v-model="form.idcard" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="联系地址：">
                <el-input v-model="form.address" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="手机号：" >
                <el-input v-model="form.phone" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="名族：" >
                <el-input v-model="form.nation" :disabled="true"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24">
              <el-form-item label="头像：" >
                <el-image
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="form.image" 
                  :preview-src-list="[form.image]">
                </el-image>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { detailFace } from '@/api/tmlms/faceList'
export default {
  mixins: [],
  data () {
    return {
      form: {},
    }
  },
  methods: {
    getDetail (id) {
      detailFace(id).then(res=>{
        console.log(res)
        this.form = res.data.data
      })
    },
    back () {
      this.$emit('back')
    },
  },
  computed: {
  },
  created () {
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
</style>
