<template>
  <gov-dialog
    ref="dialog"
    @open="handlerOpen"
    @closed="handleClosedDialog"
    :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
    :isBtnGroup="status !== dialog.textName.detail"
    @handleSubmit="dialogSubmit">
    <gov-layout-form>
      <div class="form-block">
        <gov-search-bar
          :listQuery="listQuery"
          :formProps="searchOption"
          @handleFilter="search">
        </gov-search-bar>
        <div v-if="showSelectItem" class="item-list">
          <span class="label">已选择的信息项：</span>
          <el-tag v-for="item in selectedItem" :key="item.itemName" closable @close="handleRemoveItem(item)">
            {{item.itemName}}
          </el-tag>
        </div>
        <avue-crud
          :data="tableList"
          :page="pagination"
          :table-loading="tableLoading"
          @size-change="sizeChange"
          @current-change="currentChange"
          :option="infoTableOption">
          <template slot-scope="scope" slot="menu">
            <gov-button @click="handleSelect(scope.row)" type="text" v-if="status !== dialog.textName.detail">选择</gov-button>
          </template>
        </avue-crud>
      </div>
    </gov-layout-form>
  </gov-dialog>
</template>
<script>
import mixin from '@/mixins/mixin'
import _ from 'lodash'
import matterMixin from './const/mixin'
import { getItemPage } from '@/api/cbs/application_form'
export default {
  mixins: [mixin, matterMixin],
  data () {
    return {
      tableList: [],
      showSelectItem: false,
      selectedItem: [],
    }
  },
  computed: {
    searchOption () {
      return [
        { label: '信息项名称', prop: 'itemName', type: 'input', placeholder: '请输入信息项名称' },
      ]
    },
  },
  watch: {
    'selectedItem': {
      deep: true,
      handler (val) {
        if(val.length>0){
          this.showSelectItem = true
        }else{
          this.showSelectItem = false
        }
      },
    },
  },
  methods: {
    open () {
      this.$refs['dialog'].open()
      this.getList()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 保存
    dialogSubmit () {
      this.$emit('successForm', this.selectedItem)
      this.initForm()
      this.close()
    },
    search () {
      this.getList()
    },
    handleRemoveItem (sItem) {
      const { selectedItem } = this
      this.$set(this, 'selectedItem', _.filter(selectedItem, item => item.id !== sItem.id))
    },
    handleSelect (sItem) {
      this.selectedItem.push(sItem)
      this.selectedItem = _.uniqBy(this.selectedItem, m => m.id)
    },
    getList () {
      this.tableLoading = true
      getItemPage(this.listQuery).then(({data})=>{
        this.tableList = data.records
        this.pagination.total = data.total
        this.tableLoading = false
      }).catch(()=>{
        this.tableLoading = false
      })
    },
    initForm () {
      this.tableList = []
      this.selectedItem = []
      this.showSelectItem = false
    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.$refs['form'] && this.$refs['form'].resetForm()
      // this.resetFormData(this.form, true)
      this.initForm()
    },
  },

}
</script>
