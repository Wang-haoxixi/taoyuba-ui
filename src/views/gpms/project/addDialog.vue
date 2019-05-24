<template>
    <div class="abs iep-page-form">
        <page-header :title="`${methodName}项目`" :backOption="backOption"></page-header>

        <el-form :model="formData" :rules="rules" ref="form" label-width="200px" class="form">

            <el-form-item label="项目名称：" prop="projectName">
          <span slot="label">
              项目名称
              <iep-tip :content="tipContent.projectName"></iep-tip>：
          </span>
                <el-input v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目类型：" prop="projectType">
          <span slot="label">
              项目类型
              <iep-tip :content="tipContent.projectType"></iep-tip>：
          </span>
                <iep-dict-select v-model="formData.projectType" dict-name="prms_project_type"></iep-dict-select>
            </el-form-item>
            <el-form-item label="业务类型：" prop="businessType">
          <span slot="label">
              业务类型
              <iep-tip :content="tipContent.businessType"></iep-tip>：
          </span>
                <iep-dict-select v-model="formData.businessType" dict-name="prms_business_type"></iep-dict-select>
            </el-form-item>
            <el-form-item prop="businessTypeSec" v-if="formData.businessType === '7'">
                <el-input v-model="formData.businessTypeSec" placeholder="请填写具体业务类型"></el-input>
            </el-form-item>
            <el-form-item label="相关客户：" prop="relatedClient">
          <span slot="label">
              相关客户
              <iep-tip :content="tipContent.relatedClient"></iep-tip>：
          </span>
                <iep-select prefix-url="crm/customer" v-model="formData.relatedClient"></iep-select>
            </el-form-item>
            <el-form-item label="项目预算：" prop="projectBudget">
          <span slot="label">
              项目预算
              <iep-tip :content="tipContent.projectBudget"></iep-tip>：
          </span>
                <el-input v-model="formData.projectBudget"></el-input>
            </el-form-item>
            <el-form-item label="市场经理：" prop="mktManagerList">
          <span slot="label">
              市场经理
              <iep-tip :content="tipContent.mktManagerList"></iep-tip>：
          </span>
                <iep-contact-select v-model="formData.mktManagerList"></iep-contact-select>
            </el-form-item>
            <el-form-item label="项目指导人：" prop="projectMentorList">
          <span slot="label">
              项目指导人
              <iep-tip :content="tipContent.projectMentorList"></iep-tip>：
          </span>
                <iep-contact-select v-model="formData.projectMentorList"></iep-contact-select>
            </el-form-item>
            <el-form-item label="项目标签：" prop="projectTagList">
          <span slot="label">
              项目标签
              <iep-tip :content="tipContent.projectTagList"></iep-tip>：
          </span>
                <iep-tag v-model="formData.projectTagList"></iep-tag>
            </el-form-item>
            <el-form-item label="是否关联产品：" prop="isRelevanceProduct">
           <span slot="label">
              是否关联产品
              <iep-tip :content="tipContent.isRelevanceProduct"></iep-tip>：
          </span>
                <el-radio-group v-model="formData.isRelevanceProduct">
                    <el-radio v-for="item in dictMap.is_yes" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="未关联产品理由：" prop="notRelevanceProductReason" v-if="formData.isRelevanceProduct === 2">
                <el-input type="textarea" rows=5 v-model="formData.notRelevanceProductReason"></el-input>
            </el-form-item>
            <el-form-item label="承接部门：" prop="inChargeDeptList">
          <span slot="label">
              承接部门
              <iep-tip :content="tipContent.inChargeDeptList"></iep-tip>：
          </span>
                <iep-dept-select v-model="formData.inChargeDeptList"></iep-dept-select>
            </el-form-item>
            <el-form-item label="合作部门：" prop="coopDeptList">
          <span slot="label">
              合作部门
              <iep-tip :content="tipContent.coopDeptList"></iep-tip>：
          </span>
                <iep-dept-select v-model="formData.coopDeptList"></iep-dept-select>
            </el-form-item>
            <el-form-item label="集团外部合作伙伴：" prop="groupExternalCooperatePartner">
          <span slot="label">
              集团外部合作伙伴
              <iep-tip :content="tipContent.groupExternalCooperatePartner"></iep-tip>：
          </span>
                <iep-select prefix-url="crm/customer" v-model="formData.groupExternalCooperatePartner"></iep-select>
            </el-form-item>
        </el-form>

        <footer-tool-bar>
            <iep-button type="primary" @click="save">保存</iep-button>
            <iep-button @click="close">取消</iep-button>
        </footer-tool-bar>
    </div>
</template>

<script>
    import { dictMap, rules, initFormData } from './Total/const.js'
    import { createData, updateData } from '@/api/gpms/index'
    import { getCustomerPage } from '@/api/crms/customer'
    import { mapState } from 'vuex'
    import { tipContent } from './option'
    export default {
        name: 'add-dialog',
        components: {},
        computed: {
            ...mapState({
                dictGroup: state => state.user.dictGroup,
            }),
        },
        data () {
            return {
                tipContent,
                methodName: '新增',
                backOption: {
                    isBack: true,
                    backPath: null,
                    backFunction: () => {
                        this.close()
                    },
                },
                formData: initFormData(),
                rules,
                dictMap,
                type: 'create',
                typeObj: {
                    create: {
                        requestFn: createData,
                        name: '新增',
                    },
                    update: {
                        requestFn: updateData,
                        name: '编辑',
                    },
                },
                clientList: [],
                typeOptions: dictMap.typeOptions, // 项目类型菜单
                isRelevOptions: dictMap.isRelevOptions,// 是否关联菜单
                workTypeOne: dictMap.workTypeOne,   // 业务类型一级菜单
            }
        },
        methods: {
            open (type, data) {
                this.type = type
                if (!data) {
                    this.formData = initFormData()
                } else {
                    data.relatedClient = parseInt(data.relatedClient)
                    data.groupExternalCooperatePartner = parseInt(data.groupExternalCooperatePartner)
                    this.formData = data
                    this.methodName = '修改'
                }
            },
            close (state) {
                this.formData = initFormData()
                this.$emit('close', state)
            },
            save () {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        // 进行数据的转换先
                        let personList = [{
                            name: 'mktManager',
                            list: 'mktManagerList',
                        }, {
                            name: 'projectMentor',
                            list: 'projectMentorList',
                        }]
                        for (let item of personList) {
                            this.formData[item.name] = this.formData[item.list].id
                        }
                        this.formData.inChargeDept = this.formData.inChargeDeptList.id
                        this.formData.coopDept = this.formData.coopDeptList.id
                        this.typeObj[this.type].requestFn(this.formData).then(() => {
                            this.$message({
                                message: `${this.methodName}成功`,
                                type: 'success',
                            })
                            this.close(true)
                        })
                    } else {
                        return false
                    }
                })
            },
            // 业务类型
            businessTypeChange (val) {
                console.log('val: ', val)
            },
        },
        created () {
            getCustomerPage({ type: 1 }).then(({ data }) => {
                this.clientList = data.data.records
            })
        },
    }
</script>

<style scoped lang="scss">
    .abs {
        padding-bottom: 30px;
    }
</style>