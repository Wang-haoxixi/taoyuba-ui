
<template>
  <div>
    <basic-container>
      <page-header :title="`${methodName}产品`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" size="small" :rules="rules" label-width="150px" class="form-detail">
        <div class="title">基本信息：</div>
        <el-row class="base">
          <el-form-item label="产品logo：" prop="imageUrl">
            <iep-avatar v-model="form.imageUrl"></iep-avatar>
          </el-form-item>
          <el-form-item label="产品编号：" prop="number" class="form-half">
            <el-input :maxlength="110" v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="产品名称：" prop="name" class="form-half">
            <el-input :maxlength="110" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="产品网址：" prop="website" class="form-half">
            <el-input :maxlength="2010" v-model="form.website"></el-input>
          </el-form-item>
          <el-form-item label="上线时间：" prop="onlineTime" class="form-half">
            <iep-date-picker v-model="form.onlineTime" type="date" placeholder="请输入时间"></iep-date-picker>
          </el-form-item>
          <el-form-item label="标签：" prop="tagKeywords">
            <iep-tag v-model="form.tagKeywords"></iep-tag>
          </el-form-item>
          <el-form-item label="是否带库：" prop="tapeLibrary" class="form-half">
            <el-radio-group v-model="form.tapeLibrary">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品估值(元)：" prop="valuation" class="form-half">
            <iep-input-number v-model="form.valuation"></iep-input-number>
          </el-form-item>
          <el-form-item label="估值说明：" prop="instructions">
            <iep-input-area v-model="form.instructions"></iep-input-area>
          </el-form-item>
          <el-form-item label="产品简介：" prop="synopsis">
            <el-input :maxlength="110" v-model="form.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="产品介绍：" prop="description">
            <iep-input-area v-model="form.description"></iep-input-area>
          </el-form-item>
        </el-row>
        <div class="title">团队信息：</div>
        <el-row class="base">
          <el-form-item label="负责人：" prop="userRelationCharges" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationCharges"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="需求方：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationDemands"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="技术经理：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationTechnologys"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="产品经理：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationProducts"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="团队成员：">
            <iep-contact-multiple-user v-model="form.userRelationTeams"></iep-contact-multiple-user>
          </el-form-item>
        </el-row>
        <template v-if="isEdit">
          <div class="title">全新版本：</div>
          <el-row class="base">
            <iep-cpms-version-table :table-data="form.versions" :productId="form.id" @load-page="loadPage"></iep-cpms-version-table>
          </el-row>
        </template>
        <div class="title">包含模块：</div>
        <el-row class="base">
          <iep-cpms-module-table v-model="form.moduleRelations"></iep-cpms-module-table>
        </el-row>
        <div class="title">相关材料：</div>
        <el-row class="last base">
          <iep-cpms-material-table v-model="form.materialRelations"></iep-cpms-material-table>
        </el-row>
      </el-form>
      <FooterToolBar>
        <iep-button type="primary" @click="submitForm">提交</iep-button>
        <iep-button @click="$emit('onGoBack')">取消</iep-button>
      </FooterToolBar>
    </basic-container>
  </div>
</template>

<script>
import { getProductById } from '@/api/cpms/product'
import mixins from '@/mixins/mixins'
import IepCpmsVersionTable from '@/views/cpms/Components/VersionTable'
import IepCpmsModuleTable from '@/views/cpms/Components/ModuleTable'
import IepCpmsMaterialTable from '@/views/cpms/Components/MaterialTable'
import { initForm, toDtoForm, rules } from '../options'
export default {
  name: 'edit',
  mixins: [mixins],
  components: {
    IepCpmsVersionTable,
    IepCpmsModuleTable,
    IepCpmsMaterialTable,
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      methodName: '',
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      rules,
      form: initForm(),
    }
  },
  computed: {
    id () {
      return this.record.id
    },
    isEdit () {
      return this.id ? true : false
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.methodName = this.record.methodName
      this.formRequestFn = this.record.formRequestFn
      if (this.isEdit) {
        getProductById(this.id).then(({ data }) => {
          this.form = this.$mergeByFirst(initForm(), data.data)
        })
      }
    },
    handleEdit () {
      this.$message.success('功能开发中')
    },
    handleDelete () {
      this.$message.success('功能开发中')
    },
    async submitForm () {
      try {
        const valid = await this.$refs['form'].validate()
        if (valid) {
          const { data } = await this.formRequestFn(toDtoForm(this.form))
          if (data.data) {
            this.$emit('onGoBack')
          } else {
            this.$message(data.msg)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    clear () {
      this.$message.success('功能开发中')
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  padding: 0 20px 10px 20px;
  font-size: 16px;
  font-weight: 600;
}
.base {
  padding-left: 20px;
  padding-right: 20%;
  margin-bottom: 30px;
}
.el-form {
  margin: 0;
}
.last {
  padding-bottom: 20px;
}
</style>

