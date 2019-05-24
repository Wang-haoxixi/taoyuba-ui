<template>
  <div>
    <el-form :model="materialForm" ref="form" class="form-inline" label-width="140px" size="small" :disabled="disabled" :rules="rules">
      <el-form-item label="申请表名称：" prop="materialName">
        <el-input v-model="materialForm.materialName" placeholder="新增申请表的名称"></el-input>
      </el-form-item>
      <el-form-item label="实施机构：" prop="deptId">
        <dept-select v-model="materialForm.deptId"></dept-select>
      </el-form-item>
      <el-form-item label="附件列表：" prop="fileList" :rules="{ type: 'array', required: true, message: '请上传申请表文件', trigger: 'blur' }">
        <mat-file-uploader-list v-model="materialForm.fileList" samp-type-name="申请表"></mat-file-uploader-list>
      </el-form-item>
      <!-- 查看时不需要,但编辑新增时需要 -->
      <el-form-item v-if="!disabled" label="信息项：">
        <el-button type="primary" @click="handleAddItem">选择已有信息项</el-button>
        <el-button @click="handleManualAddItem">手动输入信息项</el-button>
      </el-form-item>
      <!-- END -->
      <el-form-item label="" label-width="20px">
        <el-table :data="materialForm.itemList" size="mini" border>
          <el-table-column label="信息项名称">
            <template slot-scope="scope">
              <span>{{scope.row.itemName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据类型" width="160">
            <template slot-scope="scope">
              <matter-type :current-value="scope.row.dataTypes" dict-name="MAT_DATA_TYPE"></matter-type>
            </template>
          </el-table-column>
          <el-table-column label="数据长度" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.dataLen}}</span>
            </template>
          </el-table-column>
          <el-table-column label="共享类型">
            <template slot-scope="scope">
              <matter-type :current-value="scope.row.shareProp" dict-name="MAT_SHARE_PROPERTY"></matter-type>
            </template>
          </el-table-column>
          <el-table-column label="开放属性">
            <template slot-scope="scope">
              <matter-type :current-value="scope.row.openProp" dict-name="MAT_OPEN_PROPERTY"></matter-type>
            </template>
          </el-table-column>
          <el-table-column label="说明">
            <template slot-scope="scope">
              <span>{{scope.row.explain}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="!disabled" prop="operation" label="操作" width="160">
            <template slot-scope="scope">
              <el-button @click="handleDeleteOne(scope.row, scope.$index);" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button v-if="!disabled" type="primary" class="right-operation-btn" @click="handleSave('form')">保存</el-button>
    </el-form>
    <!-- 手动输入信息项 -->
    <form-dialog v-if="!disabled" :dialog-show="itemFormDialogShow" title="手动输入" @close="itemFormDialogShow=false" width="60%" :is-need-confirm="false">
      <el-form :model="itemForm" ref="itemForm" class="form-inline" label-width="140px" size="small" :disabled="disabled" :rules="itemRules">
        <el-form-item label="信息项名称：" prop="itemName">
          <el-input v-model="itemForm.itemName" :maxlength="50" placeholder="申请表信息项名称"></el-input>
        </el-form-item>
        <el-form-item label="数据类型：" prop="dataTypes">
          <el-cascader :options="dicList['MAT_DATA_TYPE']" v-model="itemForm.dataTypes" placeholder="选择数据类型">
          </el-cascader>
        </el-form-item>
        <el-form-item label="数据长度：">
          <el-input-number v-model="itemForm.dataLen" :min="1" :max="1024"></el-input-number>
        </el-form-item>
        <el-form-item label="共享属性：" prop="shareProp">
          <el-select v-model="itemForm.shareProp" placeholder="数据的共享属性">
            <el-option v-for="item in dicList['MAT_SHARE_PROPERTY']" :key="item.value" :label="item.label" :value="+item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放属性：" prop="openProp">
          <el-select v-model="itemForm.openProp" placeholder="数据的开放属性">
            <el-option v-for="item in dicList['MAT_OPEN_PROPERTY']" :key="item.value" :label="item.label" :value="+item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据值：">
          <el-input v-model="itemForm.dateValue" placeholder="请输入数据值选项，用英文','隔开"></el-input>
        </el-form-item>
        <el-form-item label="说明：">
          <el-input v-model="itemForm.explain" placeholder="对该信息项的补充说明"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="handleAddItemManual('itemForm')">创建信息项</el-button>
        <el-button @click="resetItemForm('itemForm')">重置</el-button>
        <el-button @click="itemFormDialogShow = false">取 消</el-button>
      </template>
    </form-dialog>
    <!-- END -->
    <!-- 选择已有信息项 -->
    <form-dialog :dialog-show="templateDialogShow" title="选择" @close="templateDialogShow=false" width="60%" :is-need-confirm="false">
      <collapse-form @clear="formInline=initFormInline()" @search="search()" :show-collapse="false">
        <template slot="search-header">
          <el-form-item label="信息项名称">
            <el-input placeholder="请输入信息项名称" v-model="formInline.itemName" clearable></el-input>
          </el-form-item>
        </template>
      </collapse-form>
      <div v-if="showSelectItem" class="item-list">
        <span class="label">已选择的信息项：</span>
        <el-tag v-for="item in selectedItem" :key="item.itemName" closable @close="handleRemoveItem(item)">
          {{item.itemName}}
        </el-tag>
      </div>
      <crud-table :is-load-table="isLoadTable" :paged-table="pagedTable" :column-map="[]">
        <el-table-column label="信息项名称">
          <template slot-scope="scope">
            <span>{{scope.row.itemName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据类型" width="160">
          <template slot-scope="scope">
            <matter-type :current-value="scope.row.dataTypes" dict-name="MAT_DATA_TYPE"></matter-type>
          </template>
        </el-table-column>
        <el-table-column label="数据长度" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.dataLen}}</span>
          </template>
        </el-table-column>
        <el-table-column label="共享类型">
          <template slot-scope="scope">
            <matter-type :current-value="scope.row.shareProp" dict-name="MAT_SHARE_PROPERTY"></matter-type>
          </template>
        </el-table-column>
        <el-table-column label="开放属性">
          <template slot-scope="scope">
            <matter-type :current-value="scope.row.openProp" dict-name="MAT_OPEN_PROPERTY"></matter-type>
          </template>
        </el-table-column>
        <el-table-column label="说明">
          <template slot-scope="scope">
            <span>{{scope.row.explain}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="handleSelect(scope.row);" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </crud-table>
      <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>
      <el-button type="primary" class="right-operation-btn" @click="handleAddItemArray">添加信息项</el-button>
    </form-dialog>
    <!-- END -->
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import matterType from '../../MatterType'
import deptSelect from '../../DeptSelect'
import { getItemPage, postMaterial, putMaterial, validMaterialName } from '@/api/cbs/application_form'
import crudTable from '@/components/crud-table'
import collapseForm from '@/components/collapse-form'
import paginationMixins from '@/mixins/pagination_mixins'
import dialogMixins from '@/mixins/dialog_mixins'
import matFileUploaderList from '@/components/mat-file-uploader-list'

// import { initApplicationMaterial } from './init'
import { initApplicationMaterialItem } from './init-item'

function initFormInline () {
  return {
    name: null,
  }
}

export default {
  mixins: [paginationMixins, dialogMixins],
  components: { crudTable, collapseForm, matFileUploaderList, deptSelect, matterType },
  props: {
    form: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    const materialName = this.form.materialName
    var checkMaterialName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('材料名称不能为空'))
      }
      validMaterialName(value).then(res => {
        if (materialName !== value && res.data) {
          callback(new Error('该材料在材料库中已存在，无需新增。'))
        } else {
          callback()
        }
      })
    }
    return {
      itemFormDialogShow: false,
      templateDialogShow: false,
      itemForm: initApplicationMaterialItem(),
      materialForm: this.form,
      initFormInline,
      formInline: initFormInline(),
      selectedItem: [],
      rules: {
        materialName: [{ required: true, validator: checkMaterialName, trigger: 'blur' }],
        deptId: [{ required: true, message: '请输入实施机构', trigger: 'blur' }],
      },
      itemRules: {
        itemName: [{ required: true, message: '请输入信息项名称', trigger: 'blur' }],
        dataTypes: [{ type: 'array', required: true, message: '请输入数据类型', trigger: 'blur' }],
        shareProp: [{ required: true, message: '请输入共享属性', trigger: 'blur' }],
        openProp: [{ required: true, message: '请输入开放属性', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    params () {
      return this.formInline
    },
    showSelectItem () {
      return this.selectedItem.length > 0 ? true : false
    },
    isEdit () {
      return this.form.id ? true : false
    },
  },
  methods: {
    _makeFids () {
      const fids = []
      const ids = this.materialForm.fileList.map(m => m.id)
      fids.push(...ids)
      this.$set(this.materialForm, 'fids', fids)
    },
    handleSave (formName) {
      this._makeFids()
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            putMaterial(this.materialForm).then(() => {
              this.$emit('close')
            })
          } else {
            postMaterial(this.materialForm).then(() => {
              this.$emit('close')
            })
          }
        }
      })
    },
    handleAddItemManual (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.itemFormDialogShow = false
          let { itemList } = this.materialForm
          itemList.push({ ...this.itemForm })
          this.itemForm = initApplicationMaterialItem()
          itemList = _.uniqBy(itemList, m => m.itemName)
          this.$set(this.materialForm, 'itemList', itemList)
        }
      })
    },
    resetItemForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleManualAddItem () {
      this.itemFormDialogShow = true
    },
    handleDeleteOne (sItem, i) {
      const { itemList } = this.materialForm
      itemList.splice(i, 1)
      // this.$set(this.materialForm, 'itemList', _.filter(itemList, item => item.id !== sItem.id))
    },
    handleAddItemArray () {
      this.materialForm.itemList.push(...this.selectedItem)
      this.selectedItem = []
      this.templateDialogShow = false
      this.materialForm.itemList = _.uniqBy(this.materialForm.itemList, m => m.itemName)
    },
    handleSelect (sItem) {
      this.selectedItem.push(sItem)
      this.selectedItem = _.uniqBy(this.selectedItem, m => m.id)
    },
    handleRemoveItem (sItem) {
      const { selectedItem } = this
      this.$set(this, 'selectedItem', _.filter(selectedItem, item => item.id !== sItem.id))
    },
    handleAddItem () {
      this.templateDialogShow = true
      this.load()
    },
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = true
      getItemPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.item-list {
  /deep/ .el-tag {
    margin-right: 5px;
    margin-bottom: 10px;
  }
}
</style>
