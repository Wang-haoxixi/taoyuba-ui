<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="查看船员信息" :backOption="backOption"></page-header>
      <el-form disabled ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="个人姓名：" prop="realName">
              <el-input v-model="form.realName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-input v-model="form.gender"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="身份证号码：" prop="idcard">
              <el-input v-model="form.idcard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期" prop="birthday">
              <el-input v-model="form.birthday"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="家庭地址：" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="家庭联系人：" prop="contactName">
              <el-input v-model="form.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家庭联系电话" prop="ontactPhone">
              <el-input v-model="form.ontactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="船民证号码" prop="crewCert">
              <el-input v-model="form.crewCert"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船民证有效期限" prop="certExpDate">
              <el-input v-model="form.certExpDate"></el-input>
            </el-form-item>
          </el-col>          
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="createTime" label-name="开始时间">
              <iep-date-picker v-model="form.createTime" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
          <el-col :span="12">
            <iep-form-item class="form-half" prop="updateTime" label-name="更新时间" tip="此处为招聘截止日期，请务必明确到具体日期，如2019年5月10日">
              <iep-date-picker v-model="form.updateTime" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
        </el-row>
        <iep-form-item class="form-half" prop="remark" label-name="备注信息" tip="请输入备注信息">
          <iep-input-area v-model="form.remark"></iep-input-area>
        </iep-form-item>

      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getCrewByUserId} from '@/api/post/crew'
import { initForm , rules, dictsMap } from '../options'
export default {
  data () {
    return {
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      rules,
      form: initForm(),
    }
  },
  computed: {
    userId () {
      return +this.$route.params.userId
    },
  },
  created () {
    if (this.userId) {
      getCrewByUserId(this.userId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.form.settlement = this.form.settlement.toString()
        this.form.workCls = this.form.workCls.toString()
      })
    }
  },
  mounted () {
    if (this.$route.query.position) {
      const position = this.$route.query.position.map(m => +m) || []
      this.form.position = position || []
      setTimeout(() => {
        this.$refs['IepCascader'].handleChange(position)
      }, 2000)
    }
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>