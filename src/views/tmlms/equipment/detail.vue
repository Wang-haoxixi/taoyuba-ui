<template>
  <div class="contract-box">
    <basic-container>
      <el-form ref="form" :model="form" label-width="150px" size="small" :rules="rules">
        <el-row>
          <el-col :span="12">
              <el-form-item label="设备编号：" prop="sn">
                <el-input v-model="form.sn"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="设备名称：" prop="databusName">
                <el-input v-model="form.databusName" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="用途：" prop="useType">
                <el-select v-model="form.useType" placeholder="请选择设备用途">
                  <el-option label="签到" :value="0"></el-option>
                  <el-option label="采集" :value="1"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="关联会议：">
                <el-button @click="handleSelect" style="margin-right: 20px">关联</el-button>
                {{ form.meetName }}
              </el-form-item>
          </el-col>
          <el-col :span="12">
              <el-form-item label="备注：" prop="remark">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="sumbit">保存</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
    <el-dialog
      title="会议信息"
      :visible.sync="dialogVisible"
      width="70%"
      :destroy-on-close="true"
      >
      <selects ref="selectIndex" @sumbit="sureSelect"></selects>
    </el-dialog>
  </div>
</template>
<script>
import { databusDetail,createdDatabusList,editDatabusList } from '@/api/tmlms/faceList'
import selects from './selects.vue'
export default {
  mixins: [],
  data () {
    return {
      form: {},
      dialogVisible: false,
      roleId: [],
        rules: {
          sn: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          databusName: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          useType: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          remark: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        },
    }
  },
  methods: {
    getDetail (id) {
      this.roleId = JSON.parse(localStorage.getItem('user')).roles
      if(id){
        databusDetail(id).then(res=>{
          this.form = res.data.data
        })
      }else{
        this.form = {}
      }
    },
    sumbit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if( !this.form.id ){
              createdDatabusList(this.form).then(res=>{
                console.log(res)
                this.$message.success('操作成功!')
                this.$emit('back')
              })
            }else{
              editDatabusList(this.form).then(res=>{
                console.log(res)
                this.$message.success('操作成功!')
                this.$emit('back')
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
    },
    back () {
      this.$emit('back')
    },
    sureSelect (row) {
      this.form.meetName = row.meetName
      this.form.meetId = row.id
      this.dialogVisible = false
    },
    handleSelect () {
      this.dialogVisible = true
    },
  },
  components: {
    selects,
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
