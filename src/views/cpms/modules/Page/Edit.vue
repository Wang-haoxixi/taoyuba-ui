
<template>
  <div>
    <basic-container>
      <page-header :title="`${methodName}模块`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" size="small" :rules="rules" label-width="150px" class="form-detail">
        <div class="title">基本信息：</div>
        <el-row class="base">
          <el-form-item label="模块logo：" prop="imageUrl">
            <iep-avatar v-model="form.imageUrl"></iep-avatar>
          </el-form-item>
          <el-form-item label="模块编号：" prop="number" class="form-half">
            <el-input :maxlength="110" v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="模块名称：" prop="name" class="form-half">
            <el-input :maxlength="110" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="模块分类：" prop="type" class="form-half">
            <iep-dict-select v-model="form.type" dict-name="cpms_module_type"></iep-dict-select>
          </el-form-item>
          <el-form-item label="测试地址：" prop="website" class="form-half">
            <el-input :maxlength="110" v-model="form.website"></el-input>
          </el-form-item>
          <el-form-item label="模块指导价(元)：" prop="guidePrice" class="form-half">
            <iep-input-number v-model="form.guidePrice"></iep-input-number>
          </el-form-item>
          <el-form-item label="模块优惠价(元)：" prop="preferentialPrice" class="form-half">
            <iep-input-number v-model="form.preferentialPrice"></iep-input-number>
          </el-form-item>
          <el-form-item label="标签：" prop="tagKeywords">
            <iep-tag v-model="form.tagKeywords"></iep-tag>
          </el-form-item>
          <el-form-item label="模块简介：" prop="synopsis">
            <el-input :maxlength="110" v-model="form.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="模块介绍：" prop="description">
            <iep-input-area v-model="form.description"></iep-input-area>
          </el-form-item>
        </el-row>
        <div class="title">团队信息：</div>
        <el-row class="base">
          <el-row>
            <el-col :span="12">
              <el-form-item label="负责人：" prop="userRelationCharges">
                <iep-contact-multiple-user v-model="form.userRelationCharges"></iep-contact-multiple-user>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="需求方：">
                <iep-contact-multiple-user v-model="form.userRelationDemands"></iep-contact-multiple-user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="技术经理：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationTechnologys"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="产品经理：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationProducts"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="团队成员：" class="form-half">
            <iep-contact-multiple-user v-model="form.userRelationTeams"></iep-contact-multiple-user>
          </el-form-item>
        </el-row>
        <div class="title">研发进度：</div>
        <el-row class="base">
          <div class="schedule-wrapper">
            <el-slider class="slider-wrapper" v-model="form.schedule" :step="1" :min="1" :max="5" :format-tooltip="formatTooltip"></el-slider>
            <div class="schedule-text-wrapper">
              <div v-for="(v, k) in dictsMap.schedule" :key="k">{{v}}</div>
            </div>
          </div>
        </el-row>
        <template v-if="isEdit">
          <div class="title">全新版本：</div>
          <el-row class="base">
            <iep-cpms-version-table :table-data="form.versions" :moduleId="form.id" @load-page="loadPage"></iep-cpms-version-table>
          </el-row>
        </template>
        <div class="title">应用产品：</div>
        <el-row class="base">
          <iep-cpms-product-table v-model="form.productRelations"></iep-cpms-product-table>
        </el-row>
        <div class="title">应用技术：</div>
        <el-row class="base">
          <iep-cpms-technology-table v-model="form.technologyRelations"></iep-cpms-technology-table>
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
import { getModuleById } from '@/api/cpms/module'
import mixins from '@/mixins/mixins'
import IepCpmsVersionTable from '@/views/cpms/Components/VersionTable'
import IepCpmsProductTable from '@/views/cpms/Components/ProductTable'
import IepCpmsTechnologyTable from '@/views/cpms/Components/TechnologyTable'
import IepCpmsMaterialTable from '@/views/cpms/Components/MaterialTable'
import { dictsMap, initForm, toDtoForm, rules } from '../options'
export default {
  name: 'edit',
  mixins: [mixins],
  components: {
    IepCpmsVersionTable,
    IepCpmsProductTable,
    IepCpmsTechnologyTable,
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
      dictsMap,
      rules,
      methodName: '',
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
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
    formatTooltip (val) {
      return this.dictsMap.schedule[val]
    },
    loadPage () {
      this.methodName = this.record.methodName
      this.formRequestFn = this.record.formRequestFn
      if (this.isEdit) {
        getModuleById(this.id).then(({ data }) => {
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
    handleAdd () {
      this.$message.success('功能开发中')
    },
    resetForm () {
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
  .module {
    width: 150px;
    height: 150px;
    margin-right: 40px;
    display: inline-block;
    padding: 10px 25px;
    border: 1px solid #ccc;
    position: relative;
    .clear {
      position: absolute;
      right: 10px;
      .icon-shanchu1 {
        font-size: 12px !important;
        padding: 4px;
        border: 1px solid #ccc;
        border-radius: 50%;
      }
    }
    .img {
      padding: 5px;
      img {
        width: 100%;
        padding: 0;
        margin: 0;
        display: block;
        box-sizing: border-box;
      }
    }
    .module-title {
      width: 100%;
      padding-top: 10px;
      text-align: center;
    }
  }
}
.el-form {
  margin: 0;
}
.last {
  padding-bottom: 20px;
}
.schedule-wrapper {
  margin-left: 100px;
  margin-bottom: 18px;
}
.slider-wrapper {
  margin: 0 20px;
}
.schedule-text-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>

