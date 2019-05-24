<template>

    <div class="iep-page-form">
        <page-header :title="`${methodName}配置`" :backOption="backOption"></page-header>

        <el-form label-width="130px" :model="formData" :rules="rules" ref="ruleForm">
            <el-form-item label="名称：" prop='name'>
          <span slot="label">
              名称
              <iep-tip :content="tipContent2.name"></iep-tip>：
          </span>
                <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="具体说明：" prop='detailedDescri'>
          <span slot="label">
              具体说明
              <iep-tip :content="tipContent2.detailedDescri"></iep-tip>：
          </span>
                <el-input type="textarea" v-model="formData.detailedDescri" placeholder="请输入说明"></el-input>
            </el-form-item>
            <el-form-item label="是否必填：" prop='isRequired'>
                <el-radio-group v-model="formData.isRequired">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="项目类型：" prop='projectType'>
          <span slot="label">
              项目类型
              <iep-tip :content="tipContent2.projectType"></iep-tip>：
          </span>
                <el-select v-model="formData.projectType" placeholder="请选择项目类型">
                    <el-option v-for="(item, index) in dictsMap.projectType" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型：" prop='businessType'>
          <span slot="label">
              业务类型
              <iep-tip :content="tipContent2.businessType"></iep-tip>：
          </span>
                <iep-dict-select v-model="formData.businessType" dict-name="prms_business_type"></iep-dict-select>
            </el-form-item>
            <el-form-item label="排序值：" prop='sortValue'>
          <span slot="label">
              排序值
              <iep-tip :content="tipContent2.sortValue"></iep-tip>：
          </span>
                <el-input type="number" v-model="formData.sortValue" placeholder="请输入排序值（数字）"></el-input>
            </el-form-item>
            <el-form-item label="URL链接：" prop='url'>
          <span slot="label">
              URL链接
              <iep-tip :content="tipContent2.url"></iep-tip>：
          </span>
                <el-input v-model="formData.url" placeholder="请输入URL链接"></el-input>
            </el-form-item>
        </el-form>

        <footer-tool-bar>
            <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
            <iep-button @click="resetForm('form')">取消</iep-button>
        </footer-tool-bar>
    </div>
</template>

<script>
    import { initFormData, rules, dictsMap, tipContent2 } from './options'
    import { createData, updateData } from '@/api/gpms/config'

    export default {
        data () {
            return {
                tipContent2,
                formData: initFormData(),
                methodName: '新增',
                requestFn: createData,
                rules,
                dictsMap,
                backOption: {
                    isBack: true,
                    backPath: null,
                    backFunction: () => {
                        this.close()
                    },
                },
                formObj: {
                    create: {
                        name: '新增',
                        request: createData,
                    },
                    update: {
                        name: '修改',
                        request: updateData,
                    },
                },
            }
        },
        methods: {
            open (row = initFormData(), type = 'create') {
                this.formData = row
                this.methodName = this.formObj[type].name
                this.requestFn = this.formObj[type].request
            },
            submitForm () {
                this.requestFn(this.formData).then(() => {
                    this.$message({
                        message: `${this.methodName}成功`,
                        type: 'success',
                    })
                    this.resetForm()
                })
            },
            resetForm () {
                this.close()
            },
            close () {
                this.$emit('close', true)
            },
        },
    }
</script>
