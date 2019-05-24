<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="never">
      <div slot="header" class="title">
        <span>{{methodName}}简历</span>
      </div>
      <el-form ref="form" class="form-detail" :model="form" :rules="rules" label-width="120px" size="small">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-info"></i> 基础信息
            </template>
            <iep-form-item class="form-half" prop="name" label-name="姓名" tip="请务必根据本人身份证上的姓名全称填写">
              <el-input v-model="form.name"></el-input>
            </iep-form-item>

            <iep-form-item class="form-half" prop="sex" label-name="性别" tip="">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </iep-form-item>

            <iep-form-item prop="avatar" label-name="头像" tip="请务必根据以下说明上传头像：<br/>1. 照片必须为本人真实、正面、静态、采用蓝、白、灰底1年内的证件照；<br/>2. 上传尺寸为宽300像素*高300像素">
              <iep-avatar v-model="form.avatar"></iep-avatar>
            </iep-form-item>

            <iep-form-item class="form-half" prop="birthday" label-name="出生年月" tip="请务必填写身份证上的年月">
              <iep-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>

            <iep-form-item class="form-half" prop="age" label-name="年龄" tip="此处请填写您的实际周岁年龄">
              <iep-input-number v-model="form.age" :max="200"></iep-input-number>
            </iep-form-item>

            <iep-form-item class="form-half" prop="title" label-name="外部头衔" tip="此处填写您在外部获得的头衔，如电子商务协会副会长">
              <el-input v-model="form.title"></el-input>
            </iep-form-item>

            <iep-form-item class="form-half" prop="phone" label-name="联系手机" tip="请务必填写可联系上的手机号码">
              <el-input v-model="form.phone"></el-input>
            </iep-form-item>

            <iep-form-item class="form-half" prop="email" label-name="邮箱" tip="请务必填写本人常用的邮箱账号">
              <el-input v-model="form.email"></el-input>
            </iep-form-item>

            <iep-form-item class="form-half" prop="height" label-name="身高" tip="请务必填写准确的身高，以cm结尾">
              <el-input v-model="form.height">
                <template slot="append">cm</template>
              </el-input>
            </iep-form-item>

            <iep-form-item class="form-half" prop="weight" label-name="体重" tip="请务必填写当前体重，以kg结尾">
              <el-input v-model="form.weight">
                <template slot="append">kg</template>
              </el-input>
            </iep-form-item>

            <iep-form-item class="form-half" prop="nation" label-name="民族" tip="请务必准确填写，后缀含“族”，即汉族、满族、维吾尔族等">
              <el-input v-model="form.nation"></el-input>
            </iep-form-item>

            <iep-form-item prop="cities" label-name="现住地址" tip="请务必精确到区/县+乡镇/街道+村/社区+小区/街+幢/弄号">
              <div style="display:flex;">
                <iep-cascader style="flex:1;" v-model="form.cities" prefix-url="admin/city"></iep-cascader>
                <el-input style="flex:3;" v-model="form.address"></el-input>
              </div>
            </iep-form-item>

            <iep-form-item class="form-half" prop="politics" label-name="政治面貌">
              <iep-dict-select v-model="form.politics" dict-name="hrms_politics_face"></iep-dict-select>
            </iep-form-item>
            
            <iep-form-item class="form-half" prop="health" label-name="健康状况" tip="根据自身情况准确选择">
              <el-input v-model="form.health"></el-input>
            </iep-form-item>

            <iep-form-item class="form-half" prop="marriage" label-name="婚姻状况" tip="请务必根据实际情况选择">
              <iep-dict-select v-model="form.marriage" dict-name="hrms_marriage_status"></iep-dict-select>
            </iep-form-item>

            <el-form-item class="form-half">
              <span slot="label">
                生育状况
                <iep-tip content="请务必根据实际情况选择"></iep-tip>
                ：
              </span>
              <iep-dict-select v-model="form.bear" dict-name="hrms_birth_status"></iep-dict-select>
            </el-form-item>
            <el-form-item class="form-half">
              <span slot="label">
                毕业学校
                ：
              </span>
              <el-input v-model="form.university"></el-input>
            </el-form-item>
            <el-form-item prop="education" class="form-half">
              <span slot="label">
                最高学历
                ：
              </span>
              <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational"></iep-dict-select>
            </el-form-item>
            <el-form-item class="form-half">
              <span slot="label">
                员工关系
                <iep-tip content="请准确填写与本集团员工有无亲朋关系（姓名+关系，张三+朋友），如无则无需填写"></iep-tip>
                ：
              </span>
              <el-input v-model="form.relation"></el-input>
            </el-form-item>
            <el-form-item class="form-half">
              <span slot="label">
                推荐人
                <iep-tip content="请务必准确填写推荐人真实姓名"></iep-tip>
                ：
              </span>
              <el-input v-model="form.referrer"></el-input>
            </el-form-item>
            <el-form-item label="应聘渠道：" class="form-half">
              <iep-dict-select v-model="form.appWay" dict-name="hrms_app_way"></iep-dict-select>
            </el-form-item>
            <el-form-item label="来源类型：" class="form-half">
              <iep-dict-select v-model="form.source" dict-name="hrms_resume_source"></iep-dict-select>
            </el-form-item>
            <el-form-item class="form-half">
              <span slot="label">
                兴趣爱好
                <iep-tip content="请务必准确填写，如唱歌，钢琴"></iep-tip>
                ：
              </span>
              <el-input v-model="form.hobbies"></el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label">
                特长及优势
                <iep-tip content="请务必以序列形式清晰描述个人真实特长和优势内容，如1、2、3"></iep-tip>
                ：
              </span>
              <el-input v-model="form.advantage"></el-input>
            </el-form-item>
            <el-form-item>
              <span slot="label">
                荣誉奖励
                <iep-tip content="请务必以序列形式描述获得的荣誉奖励，包括荣获年月，发奖单位，荣誉名称，如2019年4月 国脉集团 内网最佳贡献奖 "></iep-tip>
                ：
              </span>
              <el-input v-model="form.honor"></el-input>
            </el-form-item>
            <el-form-item label="其他成果：">
              <el-input v-model="form.result"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="求职意向" name="2">
            <el-form-item label="应聘岗位：" prop="position" class="form-half">
              <iep-cascader v-model="form.position" prefix-url="hrms/post_type"></iep-cascader>
            </el-form-item>
            <el-form-item label="到岗时间：" class="form-half">
              <iep-dict-select v-model="form.arrive" dict-name="hrms_arrive_time"></iep-dict-select>
            </el-form-item>
            <el-form-item class="form-half">
              <span slot="label">
                期望薪资
                <iep-tip content="请务必以年薪方式填写，如5-6万/年"></iep-tip>
                ：
              </span>
              <iep-dict-select v-model="form.salary" dict-name="hrms_wages_salaries"></iep-dict-select>
            </el-form-item>
            <el-form-item label="期望工作地：" prop="workPlace" class="form-half">
              <iep-dict-select v-model="form.workPlace" dict-name="hrms_work_place"></iep-dict-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="methodName !=='新增'" title="学习工作经历" name="3">
            <el-form-item label="学习情况：">
              <inline-form-table :table-data="form.eduSituation" :columns="studyColumns" requestName="study" type="talent_pool" :rid="form.id" @load-page="handleSave"></inline-form-table>
            </el-form-item>
            <el-form-item label="工作经历：">
              <inline-form-table :table-data="form.workExperience" :columns="workExpColumns" requestName="work_exp" type="talent_pool" :rid="form.id" @load-page="handleSave"></inline-form-table>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="methodName !=='新增'" title="培训证书情况" name="4">
            <el-form-item label="培训情况：">
              <inline-form-table :table-data="form.trainingSituation" :columns="trainingColumns" requestName="training" type="talent_pool" :rid="form.id" @load-page="handleSave"></inline-form-table>
            </el-form-item>
            <el-form-item label="资质证书：">
              <inline-form-table :table-data="form.userCert" :columns="certificateColumns" requestName="certificate" type="talent_pool" :rid="form.id" @load-page="handleSave"></inline-form-table>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item v-if="methodName !=='新增'" title="附件上传" name="5">
            <el-form-item label="附件上传：">
              <iep-upload v-model="form.attach"></iep-upload>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-card>
    <footer-tool-bar>
      <iep-button @click="handleGoBack">返回</iep-button>
      <iep-button type="primary" @click="handleSubmit">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { getTalentPoolById } from '@/api/hrms/talent_pool'
import { initForm, formToDto, formToVo, rules } from '../options'
import { workExpColumns, studyColumns, trainingColumns, certificateColumns } from '@/views/hrms/Components/options'
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { InlineFormTable },
  data () {
    return {
      rules,
      certificateColumns,
      trainingColumns,
      studyColumns,
      workExpColumns,
      activeNames: ['1', '2', '3', '4', '5'],
      methodName: '新增',
      form: initForm(),
      formRequestFn: () => { },
    }
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      this.loadPage()
    }
  },
  methods: {
    loadPage () {
      getTalentPoolById(this.id).then(({ data }) => {
        this.form = formToVo(this.$mergeByFirst(initForm(), data.data))
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    async handleSave (methodName = '更新') {
      try {
        const valid = await this.$refs['form'].validate()
        if (valid) {
          const { data } = await this.formRequestFn(formToDto(this.form))
          if (data.data) {
            this.$message({
              message: `${methodName}成功`,
              type: 'success',
            })
            return true
          } else {
            this.$message({
              message: data.msg,
              type: 'warning',
            })
            return false
          }
        }
      } catch (error) {
        return false
      }
    },
    async handleSubmit () {
      const res = await this.handleSave(this.methodName)
      if (res) {
        this.$emit('onGoBack')
      }
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-collapse-item__wrap {
  padding: 30px 70px 0 70px;
  border: none;
}
.edit-wrapper >>> .el-collapse {
  border: none;
}
.edit-wrapper >>> .el-collapse-item__header {
  background-color: #f8f8f8;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  margin: 5px;
  border-radius: 5px;
  border: none;
}
</style>

<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .edit-card {
    .title {
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>
