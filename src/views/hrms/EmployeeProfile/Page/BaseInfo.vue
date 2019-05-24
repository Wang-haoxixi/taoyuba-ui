<template>
  <div>
    <iep-form-item class="form-half" prop="marriage" label-name="用户名">
      <iep-div-detail v-model="form.userName" dict-name="hrms_marriage_status"></iep-div-detail>
    </iep-form-item>

    <el-form-item label="所属组织：" class="form-half">
      <iep-tag-detail :value="form.orgList" iep-type="org"></iep-tag-detail>
    </el-form-item>
    <el-form-item label="资产所属公司：" class="form-half">
      <iep-div-detail :value="form.deptQm"></iep-div-detail>
    </el-form-item>

    <iep-form-item prop="avatar" label-name="头像" tip="请务必根据以下说明上传头像：1.照片必须为本人真实、正面、静态、采用蓝、白、灰底1年内的证件照；2.上传尺寸为宽300像素*高300像素">
      <iep-avatar v-model="form.avatar"></iep-avatar>
    </iep-form-item>
    <el-form-item label="角色：">
      <iep-tag-detail :value="form.roleName" iep-type="role"></iep-tag-detail>
    </el-form-item>

    <iep-form-item class="form-half" prop="name" label-name="姓名" tip="请务必根据本人身份证上的姓名全称填写">
      <el-input v-model="form.name" dict-name="hrms_marriage_status"></el-input>
    </iep-form-item>

    <iep-form-item class="form-half" prop="staffId" label-name="工号">
      <el-input v-model="form.staffId" dict-name="hrms_marriage_status"></el-input>
    </iep-form-item>

    <iep-form-item class="form-half" prop="identityMark" label-name="身份标志">
      <iep-select multiple prefix-url="hrms/employee_profile/identity_mark" v-model="form.identityMark"></iep-select>
    </iep-form-item>

    <el-form-item label="岗位：" prop="position" class="form-half">
      <iep-cascader v-model="form.position" prefix-url="hrms/post_type" :disabled="form.isStaff"></iep-cascader>
    </el-form-item>
    <el-form-item label="职务：" prop="jobId" class="form-half">
      <iep-select prefix-url="hrms/job_system" v-model="form.jobId" :disabled="form.isStaff"></iep-select>
    </el-form-item>
    <el-form-item label="职称：" prop="titleId" class="form-half">
      <iep-select prefix-url="hrms/title_system" v-model="form.titleId" :disabled="form.isStaff"></iep-select>
    </el-form-item>
    <el-form-item v-if="form.status" label="入职时间：" prop="entryTime" class="form-half">
      <IepDatePicker v-model="form.entryTime" type="date" placeholder="选择日期"></IepDatePicker>
    </el-form-item>
    <el-form-item v-if="form.status===1" label="转正时间：" prop="positiveTime" class="form-half">
      <IepDatePicker v-model="form.positiveTime" type="date" placeholder="选择日期"></IepDatePicker>
    </el-form-item>
    <el-form-item label="员工状态：" prop="status" class="form-half">
      <el-select v-model="form.status" placeholder="请选择" clearable>
        <el-option v-for="(v,k) in dictsMap.status" :key="k" :label="v" :value="+k">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="对外头衔：" prop="socialRela" class="form-half">
      <el-input v-model="form.socialRela"></el-input>
    </el-form-item>
    <el-form-item label="所属部门：" prop="dept" class="form-half">
      <iep-dept-multiple v-model="form.dept"></iep-dept-multiple>
    </el-form-item>
    <el-form-item label="出生年月：" prop="birthday" class="form-half">
      <IepDatePicker v-model="form.birthday" type="date" placeholder="选择日期"></IepDatePicker>
    </el-form-item>
    <el-form-item label="性别：" prop="sex" class="form-half">
      <el-radio-group v-model="form.sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </el-form-item>

    <iep-form-item class="form-half" prop="nationality" label-name="民族" tip="请务必准确填写，后缀含“族”，即汉族、满族、维吾尔族等">
      <el-input v-model="form.nationality"></el-input>
    </iep-form-item>

    <iep-form-item class="form-half" prop="politics" label-name="政治面貌" tip="请务必根据实际情况选择">
      <iep-dict-select v-model="form.politics" dict-name="hrms_politics_face"></iep-dict-select>
    </iep-form-item>

    <iep-form-item class="form-half" prop="marriage" label-name="婚姻状况" tip="请务必根据实际情况选择">
      <iep-dict-select v-model="form.marriage" dict-name="hrms_marriage_status"></iep-dict-select>
    </iep-form-item>

    <iep-form-item class="form-half" prop="bear" label-name="生育状况" tip="请务必根据实际情况选择">
      <iep-dict-select v-model="form.bear" dict-name="hrms_birth_status"></iep-dict-select>
    </iep-form-item>

    <iep-form-item class="form-half" prop="language" label-name="外语水平" tip="单选项：英语、韩语、日语、法语、德语等">
      <iep-dict-select v-model="form.language" dict-name="hrms_birth_status"></iep-dict-select>
    </iep-form-item>

    <iep-form-item class="form-half" prop="education" label-name="最高学历" tip="高中及以下、专科、本科、硕士、博士及以上">
      <iep-dict-select v-model="form.education" dict-name="hrms_highest_educational"></iep-dict-select>
    </iep-form-item>

    <iep-form-item class="form-half" prop="university" label-name="毕业学校" tip="请填写与本人最高学历对应学校全称，并确保与毕业证书中一致，而非通用简称">
      <el-input v-model="form.university"></el-input>
    </iep-form-item>

    <iep-form-item class="form-half" prop="profession" label-name="专业" tip="请填写与本人最高学历对应的专业全称并确保与毕业证中专业一致，禁专业简称">
      <el-input v-model="form.profession"></el-input>
    </iep-form-item>

    <iep-form-item class="form-half" prop="graduationTime" label-name="毕业时间" tip="请选择与本人最高学历对应的毕业时间，精准至年月日">
      <IepDatePicker v-model="form.graduationTime" type="date" placeholder="选择日期"></IepDatePicker>
    </iep-form-item>

    <el-form-item label="外部头衔：" prop="externalTitle" class="form-half">
      <el-input v-model="form.externalTitle"></el-input>
    </el-form-item>

    <iep-form-item class="form-half" prop="referrer" label-name="推荐人" tip="请填写推荐您进入公司的员工全名，没有则填“无”">
      <el-input v-model="form.referrer"></el-input>
    </iep-form-item>

    <!-- <el-form-item label="添加师父：">
      <iep-tag v-model="form.people"></iep-tag>
    </el-form-item> -->

    <iep-form-item prop="abilityTag" label-name="卓越标签" tip="请务必根据自身能力选择对应标签，如发现标签不匹配导致信用降低等">
      <iep-tag v-model="form.abilityTag"></iep-tag>
    </iep-form-item>

    <iep-form-item prop="projectTag" label-name="专业标签" tip="请务必根据自身相关岗位进行选择，如发现标签不匹配导致信用降低等">
      <iep-tag v-model="form.projectTag"></iep-tag>
    </iep-form-item>

    <iep-form-item prop="learningTag" label-name="进步标签" tip="请务必根据自身相关岗位进行选择，如发现标签不匹配导致信用降低等">
      <iep-tag v-model="form.learningTag"></iep-tag>
    </iep-form-item>

    <!-- <el-form-item label="" class="form-half">
      <el-input placeholder="">
        <template slot="append">添加</template>
      </el-input>
    </el-form-item> -->

    <iep-form-item prop="careerPlanning" label-name="职业规划" tip="请清晰罗列自己未来三年的职业规划，如能详细描述更好">
      <iep-input-area v-model="form.careerPlanning"></iep-input-area>
    </iep-form-item>

    <iep-form-item prop="workExperience" label-name="工作经历" tip="1.请务必准确填写公司全称，忌简称；2.请务必准确填写岗位全称，忌简称；3.请务必准确填写起始时间，并精确到年月，如：2017.7-2018.6；4.请务必简要说明离职原因">
      <inline-form-table :table-data="form.workExperience" :columns="workExpColumns" requestName="work_exp" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
    </iep-form-item>

    <iep-form-item prop="workExperience" label-name="学习情况" tip="1.请务必准确填写学校全称，忌简称；2.请务准确必填写起始时间，并精确到年月，如：2017.7-2018.6；3.请务必简要概括学习内容，如经济管理，财务管理">
      <inline-form-table :table-data="form.eduSituation" :columns="studyColumns" requestName="study" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
    </iep-form-item>

    <iep-form-item prop="workExperience" label-name="培训情况" tip="1.请务必准确填写实际培训名称；2.请务必完整填写培训单位的全称；3.请准确填写培训方式，一般线下培训，线上培训等；4.请务准确必填写起始时间，并精确到年月日，如：2017.7.5-2017.7.10；">
      <inline-form-table :table-data="form.trainingSituation" :columns="trainingColumns" requestName="training" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
    </iep-form-item>

    <iep-form-item prop="workExperience" label-name="资质证书" tip="1.请务必按照证书准确填写全称；2.请务必按照证书准确填写编号；3.请务必按照证书准确填写颁发单位全称，忌单位简称；4.请务必上传电子版证书，否则证书不做任何加分项；">
      <inline-form-table :table-data="form.userCert" :columns="certificateColumns" requestName="certificate" type="employee_profile" :rid="form.id" @load-page="handleSave"></inline-form-table>
    </iep-form-item>

  </div>
</template>
<script>
import { dictsMap } from '@/views/hrms/EmployeeProfile/options'
import InlineFormTable from '@/views/hrms/Components/InlineFormTable/'
import { workExpColumns, studyColumns, trainingColumns, certificateColumns } from '@/views/hrms/Components/options'
export default {
  components: { InlineFormTable },
  props: ['value'],
  data () {
    return {
      dictsMap,
      workExpColumns,
      studyColumns,
      trainingColumns,
      certificateColumns,
    }
  },
  computed: {
    form: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    handleSave () {
      this.$emit('on-save')
    },
  },
}
</script>