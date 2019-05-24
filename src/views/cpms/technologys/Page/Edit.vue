
<template>
  <div>
    <basic-container>
      <page-header :title="`${methodName}技术`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" size="small" :rules="rules" label-width="150px" class="form-detail">
        <div class="title">基本信息：</div>
        <el-row class="base">
          <el-form-item label="技术logo：" prop="imageUrl">
            <iep-avatar v-model="form.imageUrl"></iep-avatar>
          </el-form-item>
          <el-form-item label="技术编号：" prop="number" class="form-half">
            <el-input :maxlength="110" v-model="form.number"></el-input>
          </el-form-item>
          <el-form-item label="技术名称：" prop="name" class="form-half">
            <el-input :maxlength="110" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="英文名称：" prop="englishName" class="form-half">
            <el-input :maxlength="110" v-model="form.englishName"></el-input>
          </el-form-item>
          <el-form-item label="技术分类：" prop="type" class="form-half">
            <iep-dict-select v-model="form.type" dict-name="cpms_technology_type"></iep-dict-select>
          </el-form-item>
          <el-form-item label="技术状态：" prop="status" class="form-half">
            <el-select v-model="form.status" placeholder="请选择技术状态" clearable>
              <el-option v-for="(v,k) in dictsMap.status" :key="k" :label="v" :value="+k">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签：" prop="tagKeywords">
            <iep-tag v-model="form.tagKeywords"></iep-tag>
          </el-form-item>
          <el-form-item label="负责人：" prop="userRelationCharges">
            <iep-contact-multiple-user v-model="form.userRelationCharges"></iep-contact-multiple-user>
          </el-form-item>
          <el-form-item label="技术简介：" prop="synopsis">
            <el-input :maxlength="2010" v-model="form.synopsis"></el-input>
          </el-form-item>
          <el-form-item label="技术介绍：" prop="description">
            <iep-input-area v-model="form.description"></iep-input-area>
          </el-form-item>
        </el-row>
        <div class="title">应用模块：</div>
        <el-row class="base">
          <iep-cpms-module-table v-model="form.moduleRelations"></iep-cpms-module-table>
        </el-row>
        <div class="title">相关技术：</div>
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
import { getTechnologyById } from '@/api/cpms/technology'
import mixins from '@/mixins/mixins'
import { dictsMap, initForm, toDtoForm, rules } from '../options'
import IepCpmsModuleTable from '@/views/cpms/Components/ModuleTable'
import IepCpmsMaterialTable from '@/views/cpms/Components/MaterialTable'
import IepCpmsTechnologyTable from '@/views/cpms/Components/TechnologyTable'
export default {
  components: {
    IepCpmsModuleTable,
    IepCpmsMaterialTable,
    IepCpmsTechnologyTable,
  },
  mixins: [mixins],
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
    loadPage () {
      this.methodName = this.record.methodName
      this.formRequestFn = this.record.formRequestFn
      if (this.isEdit) {
        getTechnologyById(this.id).then(({ data }) => {
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
</style>

