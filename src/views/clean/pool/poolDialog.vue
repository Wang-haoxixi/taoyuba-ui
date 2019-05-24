<template>
  <div>
    <gov-dialog
      ref="dialog"
      @open="handleOpenDialog"
      @closed="handleClosedDialog"
      width="70%"
      @handleSubmit="handleSubmit"
      :isBtnGroup="status !=='detail'"
      :title="dialog.textMap[status]">
      <gov-form-dialog>
        <template v-if="status === 'detail'">
          <div class="detail-wrapper">
            <gov-detail-form v-model="form" :option="detailOption"></gov-detail-form>
          </div>
        </template>
        <template v-else>
          <div class="form-wrapper">
            <avue-form ref="poolForm" :option="formOption" v-model="form">
            </avue-form>
          </div>
        </template>
        <template v-if="status === 'update'">
          <div class="dialog-body">
            <div class="form-btn-group-container">
              <el-button type="primary" class="btn-default" @click="handleImport">导入</el-button>
            </div>
            <element-table
              :total="2"
              :data="elementData"/>
          </div>
        </template>
      </gov-form-dialog>
    </gov-dialog>
    <gov-dialog-import
      ref="importDialog"
      @handleSubmit="handleImportSubmit"/>
  </div>
</template>

<script>
import mixin from '@/mixins/mixin'
import elementTable from '@/views/element/element/elementTable'
export default {
  name: 'cleanedDialog',
  mixins: [mixin],
  components: {elementTable},
  data () {
    return {
      form: {
        id: '',
        name: '',
        deptId: '',
        source: '',
      },
      dicList: {
        rule: [
          {value: '1', label: '清洗规则一'},
          {value: '2', label: '清洗规则二'},
          {value: '3', label: '清洗规则三'},
          {value: '4', label: '清洗规则四'},
          {value: '5', label: '清洗规则五'},
        ],
      },
      elementData: [
        {id: 1, chName: '信息项', enName: 'english', dataLength: 10, isOpen: '1', sharingTypeList: '3', dataTypeList: ['22', '1']},
        {id: 2, chName: '数据中心', enName: 'dataCenter', dataLength: 10, isOpen: '1', sharingTypeList: '3', dataTypeList: ['22', '1']},
      ],
    }
  },
  computed: {
    formOption () {
      return {
        labelWidth: '150',
        menuBtn: false,
        column: [
          {
            label: '数据名称',
            prop: 'name',
            span: 24,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          },
          {
            label: '来源部门',
            prop: 'deptId',
            span: 24,
            type: 'select',
            dicData: this.options.deptId,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          },
          {
            label: '来源方式',
            prop: 'source',
            span: 24,
            type: 'select',
            dicData: this.options.source,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          },
          {
            label: '规则选择',
            prop: 'type',
            span: 24,
            type: 'select',
            dicData: this.dicList.rule,
            rules: [{ required: true, message: '不能为空', trigger: 'change' }],
          },
        ],
      }
    },
    detailOption () {
      return {
        option: [
          {
            column: [
              {
                label: '数据名称',
                prop: 'name',
                span: 24,
              },
              {
                label: '来源部门',
                prop: 'deptId',
                span: 24,
                type: 'dic',
                dicData: this.options.deptId,
              },
              {
                label: '来源方式',
                prop: 'source',
                span: 24,
                type: 'dic',
                dicData: this.options.source,
              },
              {
                label: '规则选择',
                prop: 'rule',
                span: 24,
                type: 'dic',
                dicData: this.dicList.rule,
              },
            ],
          },
        ],
      }
    },
  },
  props: {
    status: {
      type: String,
      defaule: 'create',
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  watch: {
    temp: {
      handler (newVal) {
        for (let key in this.form) {
          this.form[key] = newVal[key]
        }
      },
      deep: true,
    },
  },
  methods: {
    openDialog () {
      this.$refs['dialog'].open()
    },
    closeDialog () {
      this.$refs[this.refDialog].close()
    },
    handleSubmit () {
      this.$refs.poolForm.validate().then(() => {
        if (this.status === 'create') {
          this.closeDialog()
        } else if (this.status === 'update') {
          this.closeDialog()
        }
      })
    },
    handleOpenDialog () {
      if (this.status !== 'detail') {
        this.clearValidate('poolForm')
      }
    },
    // 弹窗关闭时操作
    handleClosedDialog () {
      if (this.status !== 'detail') {
        this.clearValidate('poolForm')
        this.resetForm('poolForm')
      }
    },
    // 导入
    handleImport () {
      this.$refs.importDialog.open()
    },
    handleImportSubmit () {
      this.$refs.importDialog.close()
    },
  },
}
</script>
<style lang="scss" scoped>
  .detail-wrapper, .form-wrapper{
    margin: 20px 0 50px;
  }
  .dialog-body {
    margin-top: -40px;
  }
</style>