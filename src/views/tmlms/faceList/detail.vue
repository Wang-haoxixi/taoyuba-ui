<template>
  <div class="contract-box">
    <basic-container>
      <el-form ref="form" :model="form" label-width="150px" size="small" :rules="rules">
        <el-row>
          <el-col :span="12">
              <el-form-item label="姓名：" prop="realName">
                <el-input v-model="form.realName"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="性别：" prop="gender">
                  <el-select v-model="form.gender">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
                  </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="身份证：" prop="idcard">
                <el-input v-model="form.idcard" :disabled="roleId.indexOf(1) === -1 && roleId.indexOf(111) === -1 ? true : false "></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="联系地址：" prop="address">
                <el-input v-model="form.address" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="手机号：" prop="phone">
                <el-input v-model="form.phone" :disabled="roleId.indexOf(1) === -1 && roleId.indexOf(111) === -1 ? true : false "></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="民族：" prop="nation">
                <el-input v-model="form.nation"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="头像：" >
                <el-image
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="form.image" 
                  :preview-src-list="[form.image]">
                </el-image>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="身份证头像照片：" >
                <el-image
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="form.facePhoto" 
                  :preview-src-list="[form.facePhoto]">
                </el-image>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="身份证照片：" >
                <el-image
                  style="width: 100px; height: 100px;margin-left: 30px"
                  :src="form.idcardPhoto" 
                  :preview-src-list="[form.idcardPhoto]">
                </el-image>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="sumbit">修改</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { detailFace,editFace } from '@/api/tmlms/faceList'
export default {
  mixins: [],
  data () {
    return {
      form: {},
      roleId: [],
        rules: {
          realName: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          gender: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          idcard: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          nation: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        },
    }
  },
  methods: {
    getDetail (id) {
      this.roleId = JSON.parse(localStorage.getItem('user')).roles
      detailFace(id).then(res=>{
        console.log(res)
        this.form = res.data.data
      })
    },
    sumbit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            editFace(this.form).then(res=>{
              console.log(res)
              this.$message.success('操作成功!')
              this.$emit('back')
            })
          } else {
            console.log('error submit!!')
            return false
          }
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
