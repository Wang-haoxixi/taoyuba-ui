<template>
  <div>
    <collapse-form @clear="formInline=initFormInline()" @search="search()" :show-collapse="false">
      <template slot="search-header">
        <el-form-item label="">
          <el-button type="primary" size="small" @click="handleAddItemArray">添加材料</el-button>
        </el-form-item>
        <el-form-item label="材料名称">
          <el-input placeholder="请输入材料名称" v-model="formInline.materialName" clearable></el-input>
        </el-form-item>
      </template>
    </collapse-form>
    <div v-if="showSelectItem" class="item-list">
      <span class="label">已选择的材料：</span>
      <el-tag v-for="item in selectedItem" :key="item.materialName" closable @close="handleRemoveItem(item)">
        {{item.materialName}}
      </el-tag>
    </div>
    <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="[]">
      <el-table-column label="材料名称">
        <template slot-scope="scope">
          <span>{{scope.row.materialName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleSelect(scope.row);" type="text" size="small">选择</el-button>
        </template>
      </el-table-column>
    </crud-table>
    <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import crudTable from '@/components/crud-table'
import collapseForm from '@/components/collapse-form'
import dialogMixins from '@/mixins/dialog_mixins'
import { getMaterialNrPage } from '@/api/mdl/material'
import paginationMixins from '@/mixins/pagination_mixins'
function initFormInline () {
  return {
    materialName: '',
  }
}
function initmaterialNrTableForm () {
  return {
    materialType: '',
    materialName: '',
    materialIder: '',
    materialSpec: '',
    origNum: '',
    copyNum: '',
    sourceChannel: '',
    isMaterialSamp: '',
    isDemoSamp: '',
    notes: '',
  }
}
export default {
  props: {
    selectMaterialId: {
      type: Array,
      required: true,
    },
  },
  mixins: [paginationMixins, dialogMixins],
  components: {
    collapseForm,
    crudTable,
  },
  data () {
    return {
      materiNrDialogShow: false,
      formData: this.formData,
      selectedItem: [],
      initFormInline,
      formInline: initFormInline(),
      materialNrTableForm: initmaterialNrTableForm(),
    }

  },
  created () {
    this.load()
  },
  computed: {
    ...mapGetters(['dicList']),
    params () {
      return this.formInline
    },
    showSelectItem () {
      return this.selectedItem.length > 0 ? true : false
    },
  },
  methods: {
    handleAddItemArray () {
      this.$emit('select-row', this.selectedItem)
      this.selectedItem = []
    },
    handleSelect (sItem) {
      this.selectedItem.push(sItem)
      this.selectedItem = _.uniqBy(this.selectedItem, m => m.id)
    },
    handleRemoveItem (sItem) {
      const { selectedItem } = this
      this.$set(this, 'selectedItem', _.filter(selectedItem, item => item.id !== sItem.id))
    },
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      getMaterialNrPage({ ...params, ...pageOption, auditState: 5 }).then(res => {
        const { data } = res
        let { records } = data
        records = records.filter(m => {
          const isInclude = !this.selectMaterialId.includes(m.id)
          return isInclude
        })
        data.records = records
        this.loadTable(data)
      })
    },
  },

}
</script>

<style lang="scss" scoped>
.item-list {
  margin-bottom: 5px;
}
</style>
