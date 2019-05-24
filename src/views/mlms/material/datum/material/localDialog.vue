<template>
  <div class="iep-page-form">
    <page-header title="本地上传" :backOption="backOption"></page-header>
    <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="100px" style="margin-bottom: 50px;">
      <el-form-item label="名称：" prop="materialName">
        <el-input v-model="formData.materialName" maxlength="50" :placeholder="tipContent.materialName"></el-input>
      </el-form-item>
      <el-form-item label="作者：" prop="uploader">
        <el-input v-model="formData.uploader" maxlength="40" :placeholder="tipContent.uploader"></el-input>
      </el-form-item>
      <el-form-item label="介绍：" prop="intro">
        <!-- <el-input type="textarea" v-model="formData.intro" rows="5" maxlength="200" :placeholder="tipContent.intro"></el-input> -->
<el-input type="textarea" v-model="formData.intro" rows="5" maxlength="200" placeholder="1、材料内容主旨说明，如选取文中重要的段落；
2、字数控制在200字以内。"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="分类：" prop="firstClass">
            <span slot="label">
              分类
              <iep-tip :content="tipContent.firstClass"></iep-tip>
              ：
            </span>
            <el-select v-model="formData.firstClass" placeholder="请选择" @change="firstClassChange">
              <el-option v-for="item in firstClass" :key="item.id" :label="item.levelName" :value="''+item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span=12>
          <el-form-item label="" prop="secondClass" label-width="50px">
            <el-select v-model="formData.secondClass" placeholder="请选择">
              <el-option v-for="item in secondClass" :key="item.id" :label="item.levelName" :value="''+item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="类型：" prop="materialType">
        <span slot="label">
          类型
          <iep-tip :content="tipContent.materialType"></iep-tip>
          ：
        </span>
        <iep-dict-select v-model="formData.materialType" dict-name="mlms_material_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="下载贝额：" prop="downloadCost">
        <span slot="label">
          下载贝额
          <iep-tip :content="tipContent.downloadCost"></iep-tip>
        </span>
        <iep-dict-select v-model="formData.downloadCost" dict-name="mlms_download_cost"></iep-dict-select>
      </el-form-item>
      <el-form-item label="标签：" prop="tagKeyWords">
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
        <div style="font-size: 12px;color: #aaa;">{{tipContent.tagKeyWords}}</div>
      </el-form-item>
      <el-form-item label="是否开放：" prop="isOpen">
        <!-- <el-switch v-model="formData.isOpen" :active-value="dictsMap.isOpen[0].value" :inactive-value="dictsMap.isOpen[1].value"></el-switch> -->
        <el-radio-group v-model="formData.isOpen">
          <el-radio :label="3" v-if="inUnion == 1">对联盟开放</el-radio>
          <el-radio :label="2">对组织开放</el-radio>
          <el-radio :label="0">开放</el-radio>
          <el-radio :label="1">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="是否保密：" prop="secrecyLevel">
        <el-switch v-model="formData.secrecyLevel" :active-value="dictsMap.secrecyLevel[1].value" :inactive-value="dictsMap.secrecyLevel[0].value"></el-switch>
      </el-form-item> -->
      <el-form-item label="附件：" prop="attachFileList">
        <iep-upload v-model="formData.attachFileList" :limit="limit"></iep-upload>
        <div style="font-size: 12px;color: #aaa;">{{tipContent.attachFileList}}</div>
      </el-form-item>
      <el-form-item label="历史版本：">
        <div class="file" v-for="(item, index) in formData.fileList" :key="index">
          <div class="download" @click="downLoad(item)">{{item.name}}<span class="tip"></span></div>
        </div>
      </el-form-item>
    </el-form>
    <footer-tool-bar>
      <iep-button type="primary" @click="submitForm('form')" :loading="loadState">保存</iep-button>
      <iep-button @click="resetForm('form')">重置</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { initLocalForm, rules, dictsMap, tipContent } from './option'
import { createData, updateData, getUnion } from '@/api/mlms/material/datum/material'
import { downloadFile } from '@/api/common'

export default {
  props: {
    firstClass: {
      type: Array,
      default: () => { },
    },
  },
  data () {
    return {
      loadState: false,
      tipContent,
      dialogShow: false,
      methodName: 'create',
      methodList: {
        create: {
          name: '新增',
          requestFn: createData,
        },
        update: {
          name: '编辑',
          requestFn: updateData,
        },
      },
      formData: initLocalForm(),
      rules: rules,
      secondClass: [],
      dictsMap,
      limit: 1,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('load-page', true)
        },
      },
      inUnion: 0,
    }
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initLocalForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          if (this.formData.attachFileList.length > 0) {
            this.formData.attachFile = this.formData.attachFileList[0].url
          }
          this.formData.type = 0
          this.methodList[this.methodName].requestFn(this.formData).then((data) => {
            this.loadState = false
            if (data.data && data.data.data === false) {
              this.$message.error(data.data.msg)
              return
            }
            let tips = this.methodName == 'create' ? '恭喜您成功上传了一篇材料，继续努力！' : '编辑成功'
            this.$message.success(tips)
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
    // 分类配置
    firstClassChange (val) {
      for (let item of this.firstClass) {
        if (item.id == val) {
          this.secondClass = item.childrens
          this.formData.secondClass = ''
          return
        }
      }
    },
    // 附件下载
    downLoad (obj) {
      downloadFile(obj)
    },
  },
  created () {
    getUnion().then(({data}) => {
      this.inUnion = data
      // 有联盟，新建时默认选中联盟开放，无联盟，默认选中对组织开放
      if (this.methodName == 'create' && data == 1) {
        this.formData.isOpen = 3
      }
    })
  },
}
</script>

<style lang="scss" scoped>
.download {
  cursor: pointer;
}
</style>
