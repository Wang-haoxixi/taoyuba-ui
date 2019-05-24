<template>
  <iep-drawer :drawer-show="drawerShow" title="员工信息" width="50%" @close="closePage">
    <!-- <p :style="[pStyle, pStyle2]"></p> -->
    <p :style="pStyle">基本信息</p>
    <a-row>
      <a-col :span="12">
        <iep-description-item title="姓名：">
          <span slot="content">{{form.name}}
            <iep-img-avatar size="small" :src="form.avatar"></iep-img-avatar>
          </span>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="身份标识：">
          <iep-identity-mark v-for="item in form.identityMarks" :key="item.value" slot="content" :icon="item.icon" :title="item.label"></iep-identity-mark>
        </iep-description-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <iep-description-item title="权限：">
          <iep-tag-detail slot="content" :value="form.roleName" iep-type="role"></iep-tag-detail>
        </iep-description-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="用户名：" :content="form.userName" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="性别：" :content="form.sexName" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="工号：" :content="form.staffId" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="员工状态：" :content="status[form.status]" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="岗位：" :content="form.positionName" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="岗位职责：" :content="form.duties" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="职务：" :content="form.job" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="职称：" :content="form.title" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <iep-description-item title="所属部门：">
          <iep-tag-detail slot="content" :value="form.deptList" iep-type="dept"></iep-tag-detail>
        </iep-description-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <iep-description-item title="所属组织：">
          <iep-tag-detail slot="content" :value="form.orgList" iep-type="org"></iep-tag-detail>
        </iep-description-item>
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">联系方式</p>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="QQ：" :content="form.qq" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="微信：" :content="form.wechat" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="电子邮箱：" :content="form.email" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="联系电话：" :content="form.phone" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="紧急联系人：" :content="form.emergencyName" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="紧急联系人电话：" :content="form.emergencyPhone" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="主页：" :content="form.home" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="户口类型：">
          <iep-dict-detail slot="content" :value="form.accountTypeId" dict-name="hrms_resident_type"></iep-dict-detail>
        </iep-description-item>
      </a-col>
    </a-row>
    <!-- TODO -->
    <!-- <a-row>
      <a-col :span="12">
        <iep-description-item title="户籍地址：" :content="form.residenceCities" />
      </a-col>
      <a-col :span="12">
        <iep-description-item :content="form.residenceAddress" />
      </a-col>
    </a-row> -->

    <a-row>
      <a-col :span="12">
        <iep-description-item title="现住地址：" :content="`${form.provinceName}/${form.cityName}`" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="现住地址详情：" :content="form.currentAddress" />
      </a-col>
    </a-row>
    <!-- TODO -->
    <a-divider />
    <p :style="pStyle">详细信息</p>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="入职时间：" :content="form.entryTime" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="转正时间：" :content="form.positiveTime" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="出生年月：" :content="form.birthday" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="民族：" :content="form.nationality" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="最高学历：">
          <iep-dict-detail slot="content" :value="form.education" dict-name="hrms_highest_educational"></iep-dict-detail>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="专业：" :content="form.profession" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="毕业学校：" :content="form.university" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="毕业时间：" :content="form.graduationTime" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="政治面貌：">
          <iep-dict-detail slot="content" :value="form.politics" dict-name="hrms_politics_face"></iep-dict-detail>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="外语水平：" :content="form.language" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="婚姻状况：">
          <iep-dict-detail slot="content" :value="form.marriage" dict-name="hrms_marriage_status"></iep-dict-detail>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="生育状况：">
          <iep-dict-detail slot="content" :value="form.bear" dict-name="hrms_birth_status"></iep-dict-detail>
        </iep-description-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="推荐人：" :content="form.referrer" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="外部头衔：" :content="form.title" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <iep-description-item title="职业规划：" :content="form.careerPlanning" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <iep-description-item title="特长及优势：" :content="form.advantage" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <iep-description-item title="荣誉奖励：" :content="form.honor" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <iep-description-item title="其他成果：" :content="form.result" />
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">相关信息</p>
    <div>学习情况：</div>
    <inline-form-table-detail :data="form.eduSituation" :columns="studyColumns"></inline-form-table-detail>
    <div>工作经历：</div>
    <inline-form-table-detail :data="form.workExperience" :columns="workExpColumns"></inline-form-table-detail>
    <div>培训情况：</div>
    <inline-form-table-detail :data="form.trainingSituation" :columns="trainingColumns"></inline-form-table-detail>
    <div>资质证书：</div>
    <inline-form-table-detail :data="form.userCert" :columns="certificateColumns"></inline-form-table-detail>

  </iep-drawer>
</template>
<script>
import { initForm, dictsMap } from '../options'
import { getEmployeeProfileById } from '@/api/hrms/employee_profile'
import InlineFormTableDetail from '@/views/hrms/Components/InlineFormTable/detail'
import { workExpColumns, studyColumns, trainingColumns, certificateColumns } from '@/views/hrms/Components/options'
export default {
  components: { InlineFormTableDetail },
  data () {
    return {
      workExpColumns, studyColumns, trainingColumns, certificateColumns,
      status: dictsMap.status,
      drawerShow: false,
      id: null,
      methodName: '',
      form: initForm(),
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px',
      },
      pStyle2: {
        marginBottom: '24px',
      },
    }
  },
  methods: {
    loadPage () {
      getEmployeeProfileById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
    closePage () {
      this.form = initForm()
      this.drawerShow = false
      this.$emit('load-page')
    },
  },
}
</script>
