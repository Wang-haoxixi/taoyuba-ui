<template>
  <div>
    <el-form :model="form" label-width="80px" size="small">
      <el-form-item label="客户名称">
        <el-input v-model="form.clientName" placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="业务类型">
        <iep-dict-select v-model="form.businessTypeKey" dict-name="crms_business_type" multiple></iep-dict-select>
      </el-form-item> -->
      <el-form-item label="意向程度">
        <iep-dict-select v-model="form.intentionLevel" dict-name="crms_client_intention_level"></iep-dict-select>
      </el-form-item>
      <el-form-item label="认领状态" v-if="type!=3">
        <iep-dict-select v-model="form.status" dict-name="crms_client_opportunity_status" placeholder="请选择认领状态"></iep-dict-select>
      </el-form-item>
      <el-form-item label="是否创建">
        <el-select v-model="form.isCreate" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布者" v-if="type==='3' || type==='1'">
        <el-input v-model="form.publisherName" placeholder="发布者"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { allSearchForm, initSearchForm } from './options'
export default {
  props: ['type'],
  data () {
    return {
      form: {},
      options: [{ label: '已创建', value: 1 }, { label: '未创建', value: 0 }],
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  created () {
    if (this.type === '1' && this.type === '2') {
      //全部商机和我的商机
      this.form = allSearchForm()
    } else {
      //我认领的
      this.form = initSearchForm()
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', { type: this.type, ...this.form })
    },
    clearSearchParam () {
      if (this.type === '1' && this.type === '2') {
        this.form = allSearchForm()
      } else {
        this.form = initSearchForm()
      }
    },
  },
}
</script>
