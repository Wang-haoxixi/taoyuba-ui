<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="20">
        <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="150px" size="small">
          <el-form-item label="姓名：" class="form-half">
            <iep-div-detail :value="form.name"></iep-div-detail>
          </el-form-item>
          <el-form-item label="用户名：" class="form-half">
            <iep-div-detail :value="form.userName"></iep-div-detail>
          </el-form-item>
          <el-form-item label="头像：" prop="avatar">
            <iep-avatar v-model="form.avatar"></iep-avatar>
          </el-form-item>
          <el-form-item label="所属组织：">
            <iep-tag-detail :value="form.orgList" iep-type="org"></iep-tag-detail>
            <a-tag color="orange" @click="$openPage('/wel/org')">加入或创建新组织</a-tag>
          </el-form-item>
          <el-form-item label="所属部门：">
            <iep-tag-detail :value="form.deptList"></iep-tag-detail>
          </el-form-item>
          <el-form-item label="角色：">
            <iep-tag-detail :value="form.roleName" iep-type="role"></iep-tag-detail>
          </el-form-item>
          <el-form-item label="身份标识：">
            <iep-identity-mark v-for="item in form.identityMarks" :key="item.value" :icon="item.icon" :title="item.label"></iep-identity-mark>
          </el-form-item>
          <el-form-item label="资产所属：" class="form-half">
            <iep-div-detail :value="form.deptQm"></iep-div-detail>
          </el-form-item>
          <el-form-item label="工号：" class="form-half">
            <iep-div-detail :value="form.staffId"></iep-div-detail>
          </el-form-item>
          <el-form-item label="岗位：" class="form-half">
            <iep-div-detail :value="form.positionName"></iep-div-detail>
          </el-form-item>
          <el-form-item label="对外头衔：" class="form-half">
            <iep-div-detail :value="form.socialRela"></iep-div-detail>
          </el-form-item>
          <el-form-item label="职务：" class="form-half">
            <iep-div-detail :value="form.job"></iep-div-detail>
          </el-form-item>
          <el-form-item label="职称：" class="form-half">
            <iep-div-detail :value="form.title"></iep-div-detail>
          </el-form-item>
          <el-form-item label="入职时间：" class="form-half">
            <span>{{form.entryTime | parseTime('{y}-{m}-{d}')}}</span>
          </el-form-item>
          <el-form-item label="转正时间：" class="form-half">
            <span>{{form.positiveTime | parseTime('{y}-{m}-{d}')}}</span>
          </el-form-item>
          <el-form-item class="form-half">
            <span slot="label">
              出生年月
              <iep-tip content="请务必填写身份证上的年月">
              </iep-tip>
              ：
            </span>
            <iep-date-picker v-model="form.birthday" type="date" placeholder="请选择出生年月"></iep-date-picker>
          </el-form-item>
          <el-form-item label="性别：" prop="sex" class="form-half">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="nationality" class="form-half">
            <span slot="label">
              民族
              <iep-tip content="请务必准确填写，后缀含“族”，即汉族、满族、维吾尔族等">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.nationality"></el-input>
          </el-form-item>
          <el-form-item prop="politics" class="form-half">
            <span slot="label">
              政治面貌
              <iep-tip content="请务必根据实际情况选择">
              </iep-tip>
              ：
            </span>
            <iep-dict-select v-model="form.politics" dict-name="hrms_politics_face"></iep-dict-select>
          </el-form-item>
          <el-form-item prop="marriage" class="form-half">
            <span slot="label">
              婚姻状况
              <iep-tip content="请务必根据实际情况选择">
              </iep-tip>
              ：
            </span>
            <iep-dict-select v-model="form.marriage" dict-name="hrms_marriage_status"></iep-dict-select>
          </el-form-item>
          <el-form-item prop="bear" class="form-half">
            <span slot="label">
              生育状况
              <iep-tip content="请务必根据实际情况选择">
              </iep-tip>
              ：
            </span>
            <iep-dict-select v-model="form.bear" dict-name="hrms_birth_status"></iep-dict-select>
          </el-form-item>
          <el-form-item prop="language" class="form-half">
            <span slot="label">
              外语水平
              <iep-tip content="语种+等级">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.language"></el-input>
          </el-form-item>
          <el-form-item prop="education" class="form-half">
            <span slot="label">
              最高学历
              <iep-tip content="高中及以下、专科、本科、硕士、博士及以上">
              </iep-tip>
              ：
            </span>
            <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational"></iep-dict-select>
          </el-form-item>
          <el-form-item prop="university" class="form-half">
            <span slot="label">
              毕业学校
              <iep-tip content="请填写与本人最高学历对应学校全称，并确保与毕业证书中一致，而非通用简称">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.university"></el-input>
          </el-form-item>
          <el-form-item prop="profession" class="form-half">
            <span slot="label">
              专业
              <iep-tip content="请填写与本人最高学历对应的专业全称并确保与毕业证中专业一致，禁专业简称">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.profession"></el-input>
          </el-form-item>
          <el-form-item label="毕业时间：" prop="graduationTime" class="form-half">
            <span slot="label">
              毕业时间
              <iep-tip content="请选择与本人最高学历对应的毕业时间，精准至年月日">
              </iep-tip>
              ：
            </span>
            <iep-date-picker v-model="form.graduationTime" type="date" placeholder="选择日期"></iep-date-picker>
          </el-form-item>
          <el-form-item prop="referrer" class="form-half">
            <span slot="label">
              推荐人
              <iep-tip content="请填写推荐您进入公司的员工全名，没有则填“无”">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.referrer"></el-input>
          </el-form-item>
          <el-form-item label="外部头衔：" prop="externalTitle" class="form-half">
            <el-input v-model="form.externalTitle"></el-input>
          </el-form-item>
          <el-form-item label="户口类别：" prop="accountTypeId" class="form-half">
            <span slot="label">
              户口类别
              <iep-tip content="单选项：农业户口/非农业户口">
              </iep-tip>
              ：
            </span>
            <iep-dict-select v-model="form.accountTypeId" dict-name="hrms_resident_type"></iep-dict-select>
          </el-form-item>
          <el-form-item prop="residenceCities">
            <span slot="label">
              户籍地址
              <iep-tip content="请务必精确到区/县+乡镇/街道+村/社区+小区/街+幢/弄号">
              </iep-tip>
              ：
            </span>
            <div style="display:flex;">
              <iep-cascader style="flex:1;" v-model="form.residenceCities" prefix-url="admin/city"></iep-cascader>
              <el-input style="flex:3;" v-model="form.residenceAddress"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="currentCities">
            <span slot="label">
              现住地址
              <iep-tip content="请务必精确到区/县+乡镇/街道+村/社区+小区/街+幢/弄号">
              </iep-tip>
              ：
            </span>
            <div style="display:flex;">
              <iep-cascader style="flex:1;" v-model="form.currentCities" prefix-url="admin/city"></iep-cascader>
              <el-input style="flex:3;" v-model="form.currentAddress"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="IDCard" class="form-half">
            <span slot="label">
              身份证号码
              <iep-tip content="请务必与本人身份证信息一致">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.IDCard"></el-input>
          </el-form-item>
          <el-form-item prop="phone" class="form-half">
            <span slot="label">
              联系电话
              <iep-tip content="请务必填写可联系上的电话号码">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item prop="wechat" class="form-half">
            <span slot="label">
              微信
              <iep-tip content="请务必填写本人常用的微信号码">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.wechat"></el-input>
          </el-form-item>
          <el-form-item prop="qq" class="form-half">
            <span slot="label">
              QQ
              <iep-tip content="请务必填写本人常用的QQ号码">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
          <el-form-item prop="email" class="form-half">
            <span slot="label">
              邮箱
              <iep-tip content="请务必填写本人常用的邮箱账号">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="个人主页：" prop="home" class="form-half">
            <el-input v-model="form.home"></el-input>
          </el-form-item>
          <el-form-item prop="emergencyName" class="form-half">
            <span slot="label">
              应急联系人
              <iep-tip content="请务必填写能及时联系到您的应急联系人姓名及与您的关系，如张三/父亲">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.emergencyName"></el-input>
          </el-form-item>
          <el-form-item prop="emergencyPhone" class="form-half">
            <span slot="label">
              应急联系电话
              <iep-tip content="请务必填写可联系上的应急人手机号码">
              </iep-tip>
              ：
            </span>
            <el-input v-model="form.emergencyPhone"></el-input>
          </el-form-item>
          <!-- <el-form-item label="添加师父：">
                <iep-tag v-model="form.people"></iep-tag>
              </el-form-item> -->
          <el-form-item prop="abilityTag">
            <span slot="label">
              卓越标签
              <iep-tip content="请务必根据自身能力选择对应标签，如发现标签不匹配导致信用降低等">
              </iep-tip>
              ：
            </span>
            <iep-tag v-model="form.abilityTag"></iep-tag>
          </el-form-item>
          <el-form-item prop="projectTag">
            <span slot="label">
              专业标签
              <iep-tip content="请务必根据自身相关岗位进行选择，如发现标签不匹配导致信用降低等">
              </iep-tip>
              ：
            </span>
            <iep-tag v-model="form.projectTag"></iep-tag>
          </el-form-item>
          <el-form-item prop="learningTag">
            <span slot="label">
              进步标签
              <iep-tip content="请务必根据自身相关岗位进行选择，如发现标签不匹配导致信用降低等">
              </iep-tip>
              ：
            </span>
            <iep-tag v-model="form.learningTag"></iep-tag>
          </el-form-item>

          <el-form-item prop="careerPlanning">
            <span slot="label">
              职业规划
              <iep-tip content="请清晰罗列自己未来三年的职业规划，如能详细描述更好">
              </iep-tip>
              ：
            </span>
            <iep-input-area v-model="form.careerPlanning"></iep-input-area>
          </el-form-item>

          <el-form-item>
            <span slot="label">
              工作经历
              <iep-tip content="1.请务必准确填写公司全称，忌简称；2.请务必准确填写岗位全称，忌简称；3.请务必准确填写起始时间，并精确到年月，如：2017.7-2018.6；4.请务必简要说明离职原因">
              </iep-tip>
              ：
            </span>
            <inline-form-table :table-data="form.workExperience" :columns="workExpColumns" requestName="work_exp" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
          </el-form-item>

          <el-form-item>
            <span slot="label">
              学习情况
              <iep-tip content="1.请务必准确填写学校全称，忌简称；2.请务准确必填写起始时间，并精确到年月，如：2017.7-2018.6；3.请务必简要概括学习内容，如经济管理，财务管理">
              </iep-tip>
              ：
            </span>
            <inline-form-table :table-data="form.eduSituation" :columns="studyColumns" requestName="study" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
          </el-form-item>

          <el-form-item>
            <span slot="label">
              培训情况
              <iep-tip content="1.请务必准确填写实际培训名称；2.请务必完整填写培训单位的全称；3.请准确填写培训方式，一般线下培训，线上培训等4.请务准确必填写起始时间，并精确到年月日，如：2017.7.5-2017.7.10；">
              </iep-tip>
              ：
            </span>
            <inline-form-table :table-data="form.trainingSituation" :columns="trainingColumns" requestName="training" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
          </el-form-item>

          <el-form-item>
            <span slot="label">
              资质证书
              <iep-tip content="1.请务必按照证书准确填写全称；2.请务必按照证书准确填写编号；3.请务必按照证书准确填写颁发单位全称，忌单位简称；4.请务必上传电子版证书，否则证书不做任何加分项；">
              </iep-tip>
              ：
            </span>
            <inline-form-table :table-data="form.userCert" :columns="certificateColumns" requestName="certificate" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
          </el-form-item>

          <el-form-item>
            <a-button type="primary" @click="handleSubmit">提交</a-button>
          </el-form-item>
        </el-form>

      </a-col>
    </a-row>
  </div>
</template>

<script>
import formMixins from '@/mixins/formMixins'
import { mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import { getEmployeeProfileSelf, putEmployeeProfile } from '@/api/hrms/employee_profile'
import { initForm, dictsMap, selfRules, formToDto } from '@/views/hrms/EmployeeProfile/options'
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
import { workExpColumns, studyColumns, trainingColumns, certificateColumns } from '@/views/hrms/Components/options'
const saveTypeMap = {
  1: '保存',
  2: '自动保存',
}
export default {
  mixins: [formMixins],
  components: { InlineFormTable },
  data () {
    this.autoSave = debounce(this.autoSave, 60000)
    return {
      workExpColumns,
      studyColumns,
      trainingColumns,
      certificateColumns,
      dictsMap,
      rules: selfRules,
      preview: {},
      form: initForm(),
    }
  },
  created () {
    this.loadPage()
  },
  destroyed () {
    this.unAutoSave()
  },
  methods: {
    ...mapActions([
      'GetUserInfo',
    ]),
    autoSave () {
      this.handleSave(2)
    },
    async handleSave (saveType = 1) {
      const useMethodName = saveTypeMap[saveType]
      try {
        await this.mixinsValidate()
        try {
          const { data } = await putEmployeeProfile(formToDto(this.form))
          if (data.data) {
            this.$message({
              message: `${useMethodName}成功`,
              type: 'success',
            })
            this.GetUserInfo()
            return true
          } else {
            this.$message({
              message: data.msg,
              type: 'error',
            })
            return false
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: 'error',
          })
          return false
        }
      } catch (object) {
        if (saveType === 2) return
        let message = ''
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key]
            message = element[0].message
          }
        }
        this.$message(message)
        return false
      }
    },
    async handleSubmit () {
      const res = await this.handleSave()
      if (res) {
        this.loadPage()
      }
    },
    loadPage () {
      getEmployeeProfileSelf().then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.initAutoSave()
      })
    },
    initAutoSave () {
      setTimeout(() => {
        const that = this
        this.unWatch = this.$watch('form', function (curVal) {
          that.autoSave(curVal)
        }, {
            deep: true, immediate: false,
          })
      }, 100)
    },
    unAutoSave () {
      this.unWatch()
    },
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
.el-form-item__content span {
  display: inline-block;
}
.margin {
  margin: 0 10px;
}
</style>
