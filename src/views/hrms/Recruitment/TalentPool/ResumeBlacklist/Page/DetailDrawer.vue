<template>
  <iep-drawer :drawer-show="drawerShow" title="简历信息" width="50%" @close="closePage">
    <p :style="pStyle">个人信息</p>
    <a-row>
      <a-col :span="12">
        <iep-description-item title="姓名：">
          <span slot="content">{{form.name}}
            <iep-img-avatar size="small" :src="form.avatar"></iep-img-avatar>
          </span>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="性别：" :content="form.sexName" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="身高：" :content="form.height+'cm'" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="体重：" :content="form.weight+'kg'" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="出生年月：">
          <span slot="content">{{form.birthday | parseTime('{y}-{m}-{d}')}}</span>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="民族：" :content="form.nation" />
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">求职意向</p>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="应聘职位：" :content="form.positionName" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="到岗时间：">
          <iep-dict-detail slot="content" dict-name="hrms_arrive_time" :value="form.arrive"></iep-dict-detail>
        </iep-description-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="期望薪资：">
          <iep-dict-detail slot="content" :value="form.salary" dict-name="hrms_wages_salaries"></iep-dict-detail>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="期望工作地：">
          <iep-dict-detail slot="content" :value="form.workPlace" dict-name="hrms_work_place"></iep-dict-detail>
        </iep-description-item>
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">联系方式</p>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="电子邮箱：" :content="form.email" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="联系电话：" :content="form.phone" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <iep-description-item title="现住地址：" :content="form.address" />
      </a-col>
    </a-row>

    <a-divider />
    <p :style="pStyle">详细信息</p>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="健康状况：" :content="form.health" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="员工关系：" :content="form.relation" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="政治面貌：">
          <iep-dict-detail slot="content" :value="form.politics" dict-name="hrms_politics_face"></iep-dict-detail>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="婚姻状况：">
          <iep-dict-detail slot="content" :value="form.marriage" dict-name="hrms_marriage_status"></iep-dict-detail>
        </iep-description-item>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="12">
        <iep-description-item title="最高学历：">
          <iep-dict-detail slot="content" :value="form.education" dict-name="hrms_highest_educational"></iep-dict-detail>
        </iep-description-item>
      </a-col>
      <a-col :span="12">
        <iep-description-item title="毕业学校：" :content="form.university" />
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
      <a-col :span="12">
        <iep-description-item title="员工关系：" :content="form.relation" />
      </a-col>
      <a-col :span="12">
        <iep-description-item title="兴趣爱好：" :content="form.hobbies" />
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

    <a-row>
      <a-col :span="24">
        <iep-description-item title="拉黑地区：" :content="form.blacklistArea" />
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <iep-description-item title="拉黑原因：" :content="form.blacklistReasons" />
      </a-col>
    </a-row>

  </iep-drawer>
</template>
<script>

import { initForm } from '../options'
import { getTalentPoolById } from '@/api/hrms/talent_pool'
export default {
  data () {
    return {
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
    }
  },
  methods: {
    loadPage () {
      getTalentPoolById(this.id).then(({ data }) => {
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
