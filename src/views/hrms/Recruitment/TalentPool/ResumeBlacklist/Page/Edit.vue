<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="never">
      <div slot="header" class="title">
        <span>{{methodName}}黑名单简历</span>
      </div>
      <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="120px" size="small">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-info"></i> 基础信息
            </template>
            <el-form-item label="姓名：" prop="name" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：" class="form-half">
              <el-radio-group v-model="form.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头像：" class="">
              <iep-avatar v-model="form.avatar"></iep-avatar>
            </el-form-item>
            <el-form-item label="出生年月：" class="form-half">
              <IepDatePicker v-model="form.birthday" type="date" placeholder="选择日期"></IepDatePicker>
            </el-form-item>
            <el-form-item label="年龄：" class="form-half">
              <iep-input-number v-model="form.age" :max="200"></iep-input-number>
            </el-form-item>
            <el-form-item label="外部头衔：" class="form-half">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="联系手机：" prop="phone" class="form-half">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" class="form-half">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="身高：" class="form-half">
              <el-input v-model="form.height">
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="体重：" class="form-half">
              <el-input v-model="form.weight">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="民族：" class="form-half">
              <el-input v-model="form.nation"></el-input>
            </el-form-item>
            <el-form-item label="现住地址：">
              <div style="display:flex;">
                <iep-cascader style="flex:1;" v-model="form.cities" prefix-url="admin/city"></iep-cascader>
                <el-input style="flex:3;" v-model="form.address"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="政治面貌：" class="form-half">
              <iep-dict-select v-model="form.politics" dict-name="hrms_politics_face"></iep-dict-select>
            </el-form-item>
            <el-form-item label="健康状况：" class="form-half">
              <el-input v-model="form.health"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况：" class="form-half">
              <iep-dict-select v-model="form.marriage" dict-name="hrms_marriage_status"></iep-dict-select>
            </el-form-item>
            <el-form-item label="生育状况：" class="form-half">
              <iep-dict-select v-model="form.bear" dict-name="hrms_birth_status"></iep-dict-select>
            </el-form-item>
            <el-form-item label="毕业学校：" class="form-half">
              <el-input v-model="form.university"></el-input>
            </el-form-item>
            <el-form-item label="最高学历：" prop="education" class="form-half">
              <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational"></iep-dict-select>
            </el-form-item>
            <el-form-item label="员工关系：" class="form-half">
              <el-input v-model="form.relation"></el-input>
            </el-form-item>
            <el-form-item label="推荐人：" class="form-half">
              <el-input v-model="form.referrer"></el-input>
            </el-form-item>
            <el-form-item label="应聘渠道：" class="form-half">
              <iep-dict-select v-model="form.appWay" dict-name="hrms_app_way"></iep-dict-select>
            </el-form-item>
            <el-form-item label="拉黑地区：" class="form-half">
              <el-input v-model="form.blacklistArea"></el-input>
            </el-form-item>
            <el-form-item label="拉黑原因：">
              <el-input v-model="form.blacklistReasons"></el-input>
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
import { initForm, formToDto, workExpColumns, studyColumns, trainingColumns, certificateColumns, rules } from '../options'

export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      certificateColumns,
      trainingColumns,
      studyColumns,
      workExpColumns,
      id: null,
      rules,
      activeNames: ['1'],
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
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    handleSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formRequestFn(formToDto(this.form)).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `黑名单${this.methodName}成功`,
                type: 'success',
              })
              this.$emit('onGoBack')
            }
          })
        }
      })
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
