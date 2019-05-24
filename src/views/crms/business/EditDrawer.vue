<template>
  <iep-drawer :drawer-show="drawerShow" type="drawer" :title="methodName+'商机'" width="40%" @close="loadPage">
    <el-form :model="formData" :rules="methodName=='修改' ? rules: rules" ref="formName" label-width="120px" size="small">
      <el-form-item prop="clientName">
        <span slot="label">
          客户名称
          <iep-tip :content="tipContent.clientName"></iep-tip>
          :
        </span>
        <el-input v-model="formData.clientName" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item prop="projectName">
        <span slot="label">
          项目名称
          <iep-tip :content="tipContent.projectName"></iep-tip>
          :
        </span>
        <el-input v-model="formData.projectName" placeholder="项目名称"></el-input>
      </el-form-item>
      <el-form-item prop="businessType">
        <span slot="label">
          业务类型
          <iep-tip :content="tipContent.businessType"></iep-tip>
          :
        </span>
        <!-- <el-checkbox-group v-model="formData.businessType">
          <el-checkbox v-for="item in dictGroup['crms_client_opportunity']" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group> -->
        <businessType v-model="formData.businessType"></businessType>
      </el-form-item>
      <el-form-item prop="intentionLevel">
        <span slot="label">
          意向程度
          <iep-tip :content="tipContent.intentionLevel"></iep-tip>
          :
        </span>
        <el-radio-group v-model="formData.intentionLevel">
          <el-radio v-for="item in dictGroup['crms_client_intention_level']" :key="item.value" :label="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商机标签：" prop="tags">
        <iep-tag v-model="formData.tags" @addTags="addTags"></iep-tag>
      </el-form-item>
      <el-form-item prop="opportunityDes">
        <span slot="label">
          商机描述
          <iep-tip :content="tipContent.opportunityDes"></iep-tip>
          :
        </span>
        <el-input type="textarea" v-model="formData.opportunityDes" placeholder="商机描述"></el-input>
      </el-form-item>
      <el-form-item label="发布者：">
        <el-input v-model="userInfo.realName" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button class="btn" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="submitForm('formName')">{{methodName}}</iep-button>
    </template>
  </iep-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkName } from '@/api/crms/customer'
import { checkBusinessName } from '@/api/crms/business'
import { initForm } from './options'
import businessType from './businessType'
const tipContent = {
  clientName: '客户名称精确到局办且为全称， 如：“北京市行政服务中心”',
  projectName: '请准确填写该商机对接的项目信息，发布日期+部委/省级名称+项目内容，如“20190406农业部信息中心互联网+政务规划设计需求”。',
  businessType: '咨询：规划/行动计划/工作方案/课题研究/标准规范/管理制度/整体解决方案/评测;<br>产品：DNA/DIPS/营商通/咨询服务产品化;<br>数据：数据采集/普查/编目/标准化/开放共享/应用服务/主题库、基础库建设/事项材料梳理/主题清单规范优化、再造;<br>外包：软件/平台/服务;<br>会议培训：研讨会/招商合作/培训会;<br>平台：平台新建/平台升级技术服务：网站/平台/软件;<br>其他：自定义填写',
  intentionLevel: '客户对推进此项目的意愿程度选择',
  opportunityDes: '请尽可能将获取的客户需求及相关信息有条理的描述清楚，如有建议更好',
}
export default {
  components: { businessType },
  data () {
    //自定义客户名称去重验证
    var validateFun = (rule, value, callback) => {
      let val = value.replace(/(^\s*)|(\s*$)/g, '')
      if (!val) {
        return callback(new Error('客户名称不能为空'))
      } else {
        if (this.flagName == this.formData.clientName) {
          callback()
          return false
        }
        if (value.length < 6 || value.length > 20) {
          callback(new Error('客户名称至少6个字'))
          return false
        } else {
          checkName({ clientName: val }).then(res => {
            if (!res.data.data) {
              callback(new Error('您输入的客户名称已存在，请重新输入！'))
            } else {
              if (this.flag == value) {
                callback()
              } else {
                checkBusinessName({ name: val }).then(res => {
                  if (res.data) {
                    callback()
                    return false
                  } else {
                    callback(new Error('您输入的客户名称已存在，请重新输入！'))
                  }
                })
              }
            }
          })
        }
      }
    }
    return {
      tipContent,
      formData: initForm(),
      methodName: '',
      flag: '',
      rules: {
        clientName: [
          { required: true, validator: validateFun, trigger: 'blur' },
        ],
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }],
        businessType: [
          { required: true, message: '请选择业务类型', trigger: 'blur' },
        ],
        intentionLevel: [
          { required: true, message: '请选择意向程度', trigger: 'blur' },
        ],
        tags: [{ required: true, message: '请添加商机标签', trigger: 'blur' }],
        opportunityDes: [
          { required: true, message: '请输入商机描述', trigger: 'blur' },
          { max: 100, message: '长度不超过100个字符', trigger: 'blur' },
        ],
      },
      drawerShow: false,
      formRequestFn: () => { },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
  },
  created () {
  },
  methods: {
    validateFun () {

    },
    handleGoBack () {
      this.formData = initForm()
      this.drawerShow = false
    },
    loadPage () {
      this.drawerShow = false
      this.formData = initForm()
      this.$emit('load-page')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.formData).then(() => {
            this.$message({
              message: `${this.methodName}成功`,
              type: 'success',
            })
            this.loadPage()
            this.drawerShow = false
            this.formData = initForm()
          })
        } else {
          return false
        }
      })
    },
    addTags () {
      this.$message('添加标签')
    },
  },
}
</script>