<template>
  <el-form ref="materialForm" :model="formData" label-width="140px" size="small" :rules="rules" :disabled="disabled">
    <el-form-item label="材料类型" prop="materialType">
      <el-select v-model="formData.materialType" placeholder="请选择材料所属类型">
        <el-option v-for="item in materialTypeMap" :key="item.value" :label="item.label" :value="+item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="材料名称" prop="materialName">
      <el-input v-model="formData.materialName" placeholder="申请该事项所需材料名称"></el-input>
    </el-form-item>
    <el-form-item label="材料标识号" prop="materialIder">
      <el-input v-model="formData.materialIder" :disabled="isEdit" placeholder="该材料所对应的标识号"></el-input>
    </el-form-item>
    <el-form-item label="材料规格" prop="materialSpec">
      <el-select v-model="formData.materialSpec" placeholder="符合条件的材料规格">
        <el-option v-for="item in dicList['MAT_MATERIAL_SPECIFICATION']" :key="item.value" :label="item.label" :value="+item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="原件份数" class="formWidth">
      <el-input-number v-model="formData.origNum" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item label="复印件份数" class="formWidth">
      <el-input-number v-model="formData.copyNum" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item label="来源渠道" prop="sourceChannel">
      <el-input v-model="formData.sourceChannel" placeholder="所选材料的来源渠道"></el-input>
    </el-form-item>
    <el-form-item label="材料样本">
      <el-switch v-model="formData.isMaterialSamp" :active-value="2" :inactive-value="1">
      </el-switch>
    </el-form-item>
    <el-form-item v-if="formData.isMaterialSamp === 2" label="" prop="材料样本" :rules="{ type: 'array', required: true, message: '请上传材料样本', trigger: 'blur' }">
      <mat-file-uploader-list v-model="formData.材料样本" samp-type-name="材料样本" :disabled="disabled"></mat-file-uploader-list>
    </el-form-item>
    <el-form-item v-if="formData.materialType!=='1'" label="示范文本">
      <el-switch v-model="formData.isDemoSamp" :active-value="2" :inactive-value="1">
      </el-switch>
    </el-form-item>
    <el-form-item v-if="formData.isDemoSamp === 2" label="" prop="示范文本" :rules="{ type: 'array', required: true, message: '请上传示范文本', trigger: 'blur' }">
      <mat-file-uploader-list v-model="formData.示范文本" samp-type-name="示范文本"></mat-file-uploader-list>
    </el-form-item>
    <el-form-item label="填报须知" prop="notes">
      <el-input type="textarea" v-model="formData.notes" placeholder="进行填报需要了解的条款"></el-input>
    </el-form-item>
    <el-button v-if="!disabled" type="primary" class="right-operation-btn" @click="handleMaterialSubmit('materialForm')">保存</el-button>
  </el-form>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import matFileUploaderList from '@/components/mat-file-uploader-list'
import { putMaterial, postMaterial } from '@/api/cbs/application_form'
export default {
  components: {
    matFileUploaderList,
  },
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
    return {
      formData: {
        ...this.form,
      },
      rules: {
        materialType: [{ required: true, message: '请输入材料类型', trigger: 'blur' }],
        materialName: [{ required: true, message: '请输入材料名称', trigger: 'blur' }],
        materialIder: [{ required: true, message: '请输入材料标识符', trigger: 'blur' }],
        materialSpec: [{ required: true, message: '请输入材料规格', trigger: 'blur' }],
        sourceChannel: [{ required: true, message: '请输入来源渠道', trigger: 'blur' }],
        notes: [{ required: true, message: '请输入填报须知', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapGetters(['dicList']),
    materialTypeMap () {
      const allMaterialType = this.dicList['MAT_MATERIAL_FAMILY']
      if (!allMaterialType.length) {
        return []
      } else {
        return allMaterialType.filter(m => m.label !== '表格')
      }
    },
    fileTypeNameMap () {
      return _.keyBy(this.dicList['MAT_UPLOAD_FILE_TYPE'], 'label')
    },

    isEdit () {
      return this.formData.id ? true : false
    },
  },
  mounted () {
    this.loadFiles()
  },
  methods: {
    loadFiles () {
      const fileTypeNameMap = { ...this.fileTypeNameMap }
      const sampFileGroupMap = _.groupBy(this.formData.fileList, 'sampType')
      const 材料样本 = sampFileGroupMap[fileTypeNameMap['材料样本'].value] || []
      const 示范文本 = sampFileGroupMap[fileTypeNameMap['示范文本'].value] || []
      this.$set(this.formData, '材料样本', 材料样本)
      this.$set(this.formData, '示范文本', 示范文本)
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
    handleMaterialSubmit (formName) {
      this._makeFids()
      this.$refs[formName].validate(valid => {
        if (valid) {
          const submitFunction = this.isEdit ? putMaterial : postMaterial
          // console.log("newForm",this.formData,submitFunction)
          submitFunction(this.formData).then(({ data }) => {
            if (data.data) {
              this.$emit('close')
            } else {
              console.log('add failed')
            }
          })
        }
      })

    },
  },
}
</script>
