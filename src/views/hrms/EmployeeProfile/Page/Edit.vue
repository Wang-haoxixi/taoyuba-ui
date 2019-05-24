<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="员工信息管理"></page-header>
      <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="150px" size="small">
        <iep-tab-scroll :tab-list="tabList" :height="270">
          <div>
            <div class="base" :id="item.value" v-for="item in tabList" :key="item.value">
              <div class="title">{{item.label}}</div>
              <div class="context">
                <component v-model="form" :is="item.value" @on-save="handleAutoSubmit"></component>
              </div>
            </div>
          </div>
        </iep-tab-scroll>
      </el-form>
      <!-- fixed footer toolbar -->
      <footer-tool-bar>
        <iep-button @click="handleGoBack">返回</iep-button>
        <iep-button type="primary" @click="handleSubmit">提交</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import BaseInfo from './BaseInfo'
import ContactInfo from './ContactInfo'
import LaborContract from './LaborContract'
import Welfare from './Welfare'
import Transfer from './Transfer'
import Dimission from './Dimission'
import { getEmployeeProfileById } from '@/api/hrms/employee_profile'
import { initForm, formToDto, rules } from '@/views/hrms/EmployeeProfile/options'
export default {
  mixins: [formMixins],
  components: {
    BaseInfo,
    ContactInfo,
    LaborContract,
    Welfare,
    Transfer,
    Dimission,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      tabList: [{
        label: '基础信息',
        value: 'BaseInfo',
      }, {
        label: '联系信息',
        value: 'ContactInfo',
      }, {
        label: '劳动合同',
        value: 'LaborContract',
      }, {
        label: '社保福利',
        value: 'Welfare',
      }, {
        label: '调动情况',
        value: 'Transfer',
      }, {
        label: '离职信息',
        value: 'Dimission',
      }],
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      rules,
      form: initForm(),
      formRequestFn: this.record.formRequestFn,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async handleSave () {
      try {
        await this.mixinsValidate()
        try {
          const { data } = await this.formRequestFn(formToDto(this.form))
          if (data.data) {
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
    async handleAutoSubmit () {
      const res = await this.handleSave()
      if (res) {
        this.loadPage()
      }
    },
    async handleSubmit () {
      const res = await this.handleSave()
      if (res) {
        this.$message({
          message: '修改成功',
          type: 'success',
        })
        this.handleGoBack()
      }
    },
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      getEmployeeProfileById(this.record.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.form.isStaff = !!this.form.staffId
        this.form.identityMark = this.form.identityMarks.map(m => m.value)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-wrapper {
  margin-bottom: 60px;
}
.base {
  border-bottom: 1px solid #eee;
  .title {
    padding: 20px 20px 0 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .context {
    padding: 20px 40px;
  }
}
</style>
