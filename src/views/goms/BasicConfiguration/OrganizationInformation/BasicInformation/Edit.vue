<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header title="修改组织基本信息" :backOption="backOption">
        <template>
          <iep-button type="primary" @click="handleSubmit">保存</iep-button>
        </template>
      </page-header>
      <el-form :model="form" class="form-detail" size="small" ref="form" label-width="120px">
        <el-form-item label="组织Logo：">
          <iep-avatar v-model="form.logo"></iep-avatar>
        </el-form-item>
        <el-form-item label="组织名称：" prop="name" class="form-half">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="组织简称：" prop="orgAbrName" class="form-half">
          <el-input v-model="form.abrName" placeholder="请输入组织简称"></el-input>
        </el-form-item>
        <el-form-item label="成立时间：" prop="establishTime" class="form-half">
          <iep-date-picker type="date" v-model="form.establishTime"></iep-date-picker>
        </el-form-item>
        <el-form-item label="创建人：" prop="creator" class="form-half">
          <el-input v-model="form.creatorName" type="text" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="contactMethod" class="form-half">
          <el-input v-model="form.contactMethod" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="卓越标签：">
          <iep-tag v-model="form.abilityTag"></iep-tag>
        </el-form-item>
        <el-form-item label="专业标签：">
          <iep-tag v-model="form.learningTag"></iep-tag>
        </el-form-item>
        <el-form-item label="组织简介：" prop="intro">
          <iep-input-area v-model="form.intro" placeholder="验证码登录使用"></iep-input-area>
        </el-form-item>
        <el-form-item label="组织架构：" prop="structure">
          <iep-froala-editor v-model="form.structure"></iep-froala-editor>
        </el-form-item>
        <el-form-item label="核心优势：" prop="coreAdvantage">
          <iep-input-area v-model="form.coreAdvantage" placeholder="请输入核心优势"></iep-input-area>
        </el-form-item>
        <!-- <el-form-item label="组织客服人员：" prop="phone">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="系统联系人员：" prop="phone">
          <el-input></el-input>
        </el-form-item> -->
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm } from './options'
import { getOrgBySelf, putOrg } from '@/api/goms/org'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: initForm(),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
    handleSubmit () {
      putOrg(this.form).then(() => {
        this.$message({
          message: '组织修改信息成功',
          type: 'success',
        })
        this.$emit('onGoBack')
      })
    },
    loadPage () {
      getOrgBySelf(this.orgId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
