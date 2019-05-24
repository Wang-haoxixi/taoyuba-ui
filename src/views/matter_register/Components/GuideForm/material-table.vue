<template>
  <div>
    <el-button v-if="!disabled" type="primary" size="small" @click="handleAddItem()">选择已有材料</el-button>
    <el-tooltip v-if="!disabled" class="item" effect="dark" content="新增材料请去材料库中添加，并提交审核" placement="right">
      <el-button type="info" plain circle size="mini">&nbsp;?&nbsp;</el-button>
    </el-tooltip>
    <el-table :data="materialList" style="width: 100%;">
      <el-table-column prop="materialName" label="材料名称">
      </el-table-column>
      <el-table-column label="材料类型" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.materialType && (materialTypeMap[scope.row.materialType]||{}).label}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="notes" label="填报须知">
      </el-table-column> -->
      <el-table-column label="操作" width="160" v-if="!disabled">
        <template slot-scope="scope">
          <el-button @click="handleViewMaterial(scope.row);" type="text" size="small">详情</el-button>
          <!-- <el-button @click="handleEditMaterial(scope.row);" type="text" size="small">编辑</el-button> -->
          <el-button @click="handleDeleteMaterial(scope.row);" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" v-if="disabled">
        <template slot-scope="scope">
          <div class="fack-btn" @click="handleViewMaterial(scope.row);">详情</div>
        </template>
      </el-table-column>
    </el-table>
    <form-dialog :dialog-show="materialDialogShow" :title="dialogTitle" @close="materialDialogShow=false" width="80%" :is-need-confirm="false">
      <edit-form :form="formData" :disabled="materialDisabled" @close="load()"></edit-form>
    </form-dialog>
    <main-dialog
      @successForm="successForm"
      ref="mainDialog"
      :temp="formData"
      :status="dialogStatus"
    ></main-dialog>
    <form-dialog :dialog-show="materialNrTableDialogShow" title="选择已有材料" @close="materialNrTableDialogShow=false" width="60%" :is-need-confirm="false">
      <material-nr-table :select-material-id="selectMaterialId" @select-row="handleSelectRow"></material-nr-table>
    </form-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import editForm from '../MaterialForm'
import materialNrTable from './material-nr-table'
import dialogMixins from '@/mixins/dialog_mixins'
import paginationMixins from '@/mixins/pagination_mixins'
import { getApplicationFormById } from '@/api/cbs/application_form'
import { getMaterialFormById } from '@/api/mdl/material'
import { initOtherMaterial } from '../MaterialForm/other/init'
import mainDialog from '../../other_materials/mainDialog'
import { initApplicationMaterial } from '../MaterialForm/application/init'
export default {
  components: {
    materialNrTable,
    editForm,
    mainDialog,
  },
  props: {
    isTemplate: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    materials: {
      type: Array,
      required: true,
    },
  },
  mixins: [dialogMixins, paginationMixins],
  data () {
    return {
      viewFunctionName: this.isTemplate ? getMaterialFormById : getApplicationFormById,
      materialList: [...this.materials],
      materialDialogShow: false,
      materialNrTableDialogShow: false,
      formData: initApplicationMaterial(),
      materialNrTableForm: {},
      isEdit: false,
      materialDisabled: false,
      mtype: 0,
      rules: {
        materialType: [{ required: true, message: '请输入材料类型', trigger: 'blur' }],
        materialName: [{ required: true, message: '请输入材料名称', trigger: 'blur' }],
        materialIder: [{ required: true, message: '请输入材料标识符', trigger: 'blur' }],
        materialSpec: [{ required: true, message: '请输入材料规格', trigger: 'blur' }],
        sourceChannel: [{ required: true, message: '请输入来源渠道', trigger: 'blur' }],
        notes: [{ required: true, message: '请输入填报须知', trigger: 'blur' }],
      },
      materialForm: {},
      dialogTitle: '',
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    fileTypeNameMap () {
      return _.keyBy(this.dicList['MAT_UPLOAD_FILE_TYPE'], 'label')
    },
    materialTypeMap () {
      const typeMap = this.dicList['MAT_MATERIAL_FAMILY']
      const typeM = _.keyBy(typeMap, 'value')
      console.log("材料类型",typeM)
      return typeM
    },
    selectMaterialId () {
      return this.materialList.map(m => m.id)
    },
  },
  created () {
  },
  methods: {
    handleSelectRow (row) {
      this.materialList.push(...row)
      this.materialList = _.uniqBy(this.materialList, (m) => m.id)
      this.$emit('save', this.materialList)
      this.materialNrTableDialogShow = false
    },
    handleDeleteMaterial (row) {
      const deleteMaterialById = (id) => {
        const { materialList } = this
        this.$set(this, 'materialList', _.filter(materialList, item => item.id !== id))
      }
      this._handleComfirm(row.id, deleteMaterialById, '删除')
    },
    handleViewMaterial (row) {
      this.viewFunctionName(row.id).then(res => {
        this.dialogStatus = "detail"
        this.formData = res.data
        this.$refs['mainDialog'].open()
        this.isEdit = false
        // this.materialDisabled = true
        // this.materialDialogShow = true
      })
    },
    handleEditMaterial (row) {
      this.viewFunctionName(row.id).then(res => {
        const formData = res.data
        const initForm = formData.materialType === 1 ? initApplicationMaterial : initOtherMaterial
        this.formData = _.merge({}, initForm(), res.data)
        this.dialogTitle = '编辑'
        this.isEdit = true
        this.materialDisabled = false
        this.materialDialogShow = true
      })
    },
    handleAddMaterial () {
      this.isEdit = false
      this.formData = initApplicationMaterial()
      this.materialDialogShow = true
    },
    _makeFids () {
      const fileTypeNameMap = { ...this.fileTypeNameMap }
      const fids = []
      for (const key in fileTypeNameMap) {
        if (fileTypeNameMap.hasOwnProperty(key)) {
          if (this.formData[key]) {
            const ids = this.formData[key].map(m => m.id)
            fids.push(...ids)
          }
        }
      }
      this.$set(this.formData, 'fids', fids)
    },
    handleSubmit (formName) {
      this._makeFids()
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.materialList = this.materialList.filter(m => m.materialIder !== this.formData.materialIder)
          }
          this.materialList.push(this.formData)
          this.materialDialogShow = false
          this.$emit('save', this.materialList)
        }
      })
    },
    handleAddItem () {
      this.materialNrTableDialogShow = true
    },
    load () {
      this.materialDialogShow = false
      this.$emit('load')
    },
  },
  watch: {
    'materials': function (n) {
      this.$set(this, 'materialList', n)
    },
  },
}
</script>
<style lang="scss" scoped>
.fack-btn {
  cursor: pointer;
  color: #66b1ff;
  &:hover {
    text-decoration: underline;
  }
}
</style>
