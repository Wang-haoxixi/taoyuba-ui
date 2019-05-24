<template>
  <gov-dialog
    ref="dialog"
    @closed="handleClosedDialog"
    @handleSubmit="handleSubmit"
    @handleDraft="handleDraft"
    :title="dialog[status].title ? dialog[status].title : ''"
    :btnGroup="btnGroup"
    :isBtnGroup="status !== dialog.detail.status"
    width="80%">
    <layout-form>
      <template v-if="status === dialog.detail.status">
        <div class="detail-wrapper">
          <gov-detail-form v-model="form" :option="informationMainFormDetailOption"></gov-detail-form>
        </div>
      </template>
      <template v-else>
        <avue-form ref="informationForm" :option="informationMainFormOption" v-model="form"></avue-form>
      </template>
      <gov-layout-button-group v-if="status !== dialog.detail.status">
        <gov-button type="primary" @click="infoItemNewly">新增信息项</gov-button>
      </gov-layout-button-group>
      <avue-crud ref="table" :data="tableData" :option="imformationTableOption">
        <template slot-scope="scope" slot="dataTypeList">
          <span>{{getCascader(scope.row.dataTypeList)}} </span>
        </template>
        <template slot-scope="scope" slot="menu">
          <div class="table-btn-group">
            <gov-button @click="handleDetail(scope.row)" type="text">详情</gov-button>
            <gov-button @click="handleUpdate(scope.row)" v-if="status !== dialog.detail.status" type="text">编辑</gov-button>
            <gov-button @click="handleDelete(scope.row)" v-if="status !== dialog.detail.status" type="text">删除</gov-button>
          </div>
        </template>
      </avue-crud>
    </layout-form>
    <info-dialog ref="infoDialog" :status="infoDialogStatus" @submit="infoFormSubmit"></info-dialog>
  </gov-dialog>
</template>

<script>
import { imformationTableOption } from './const/information'
import scopeMixins from './const/mixin'
import infoDialog from './infoDialog'
import { getPageList, repeatInformationName } from '@/api/element/informationDialog'
import { mapGetters } from 'vuex'
import { getDic } from '@/util/dic'
export default {
  name: 'informationDialog',
  mixins: [scopeMixins],
  components: { infoDialog },
  data () {
    return {
      dialog: {
        detail: {
          title: '详情',
          status: 'detail',
        },
        update: {
          title: '编辑',
          status: 'update',
        },
        create: {
          title: '新增',
          status: 'create',
        },
      },
      btnLoading: false,
      form: {},
      isOpenDisabled: false,
      openCondShow: false,
      tableData: [],
      infoDialogStatus: 'detail',
      openId: 0,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    imformationTableOption () {
      return imformationTableOption
    },
    informationMainFormDetailOption () {
      return {
        option: [
          {
            column: this.informationMainFormOption.column,
          },
        ],
      }
    },
    btnGroup () {
      return [
        {label: '保存', type: 'primary', fn: 'handleSubmit', loading: this.btnLoading},
        {label: '存为草稿', type: 'warning', fn: 'handleDraft', loading: this.btnLoading},
        {label: '取消', type: 'default', fn: 'handleCancel'},
      ]
    },
  },
  props: {
    currentData: {
      type: Object,
      default () {
        return {}
      },
    },
    options: {
      type: Object,
      default () {
        return {}
      },
    },
    isElement: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: 'detail',
    },
  },
  watch: {
    // 深度监听 改变显示效果
    'form.sharingType': {
      deep: true,
      handler (val) {
        if (val === '3' || val === '1') {
          this.isOpenDisabled = true
          this.form.isOpen = "2"
        } else {
          this.isOpenDisabled ? this.form.isOpen = "" : ""
          this.isOpenDisabled = false
        }
        this.$nextTick(()=>{
          this.$refs['informationForm'] ? this.$refs['informationForm'].clearValidate() : ''
        })
      },
    },
    'form.isOpen': {
      deep: true,
      handler (val) {
        if (val === '1') {
          this.openCondShow = true
        } else {
          this.openCondShow = false
          this.form.openCond = ""
        }
      },
    },
  },
  created () {

  },
  methods: {
    open (formData) {
      this.sysList = this.options.surveyIdList || []
      this.form = formData
      this.$nextTick(()=>{
        this.$refs['dialog'].open()
        this.$nextTick(()=>{
          this.$refs['informationForm'] ? this.$refs['informationForm'].clearValidate() : ''
        })
      })
      if (this.status !== 'create') {
        getPageList({ resId: this.form.id, limit: 9999 }).then(res=>{
          this.tableData = res.data.data.records || []
        })
      }
    },
    close () {
      this.$refs['dialog'].close()
    },
    getCascader (list) {
      let dic = getDic('DATA_TYPE')
      let key = list[0]
      let key2 = list[1]
      let itemLabel = ''
      let item2Label = ''
      for(let item of dic){
        if(item.value === key){
          itemLabel = item.label
          for(let item2 of item.children){
            if(item2.value === key2){
              item2Label = item2.label
            }
          }
        }
      }
      return itemLabel + "/" + item2Label
    },
    handleUpdate (row) {
      this.infoDialogStatus = 'update'
      this.$nextTick(()=>{
        this.$refs['infoDialog'].open({...row})
      })
    },
    // 信息项详情
    handleDetail (row) {
      this.infoDialogStatus = 'detail'
      this.$nextTick(()=>{
        this.$refs['infoDialog'].open({...row})
      })
    },
    // 删除信息项
    handleDelete (row) {
      this.$confirm('此操作删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let index = row.$index
        this.tableData.splice(index, 1)
        this.$message({ type: 'success', message: '删除成功!' })
      }).catch(() => {})
    },
    // 信息项新增
    infoItemNewly () {
      this.infoDialogStatus = 'create'
      this.$nextTick(()=>{
        this.$refs['infoDialog'].open(this.setDefaultData())
      })
    },
    // 默认值设置
    setDefaultData () {
      let formData = {}
      formData.sharingType = this.form.sharingType
      formData.sharingCond = this.form.sharingCond
      formData.sharingModeList = this.form.sharingModeList
      formData.isOpen = this.form.isOpen
      formData.openCond = this.form.openCond
      formData.collectStatus = '2'
      return formData
    },
    // 信息项表单提交
    infoFormSubmit (formData) {
      let infoNameValidate = true
      if (this.tableData.length <= 0) {
        infoNameValidate = true
      } else {
        if (this.infoDialogStatus === 'create') {
          this.tableData.forEach((item) => {
            if(item.chName === formData.chName) {
              infoNameValidate = false
            }
          })
        } else {
          this.tableData.forEach((item, index) => {
            if(item.chName === formData.chName && formData.$index !== index) {
              infoNameValidate = false
            }
          })
        }
      }
      this.tableData.forEach((item, index) => {
        if(item.chName === formData.chName && (item.$index !== index || this.infoDialogStatus === 'create')) {
          infoNameValidate = false
        }
      })
      if (infoNameValidate === false) {
        this.$message.error('该信息项名称与其他信息项重名，请修改！')
      } else {
        if (formData.$index || formData.$index === 0) {
          this.$set(this.tableData, formData.$index, formData)
          this.$message.success('信息项编辑成功')
          this.$refs['infoDialog'].close()
        } else {
          this.tableData.unshift(formData)
          this.$message.success('信息项新增成功')
          this.$refs['infoDialog'].close()
        }
      }
    },
    // 保存
    handleSubmit () {
      this.$refs['informationForm'].validate().then(()=>{
        let data = {...this.form}
        data.elements = this.tableData
        this.$emit('submit', data, 'save')
      })
    },
    // 存为草稿
    handleDraft () {
      let data = this.form
      data.elements = this.tableData
      this.$emit('submit', data, 'draft')
    },
    handleClosedDialog () {
      this.form = {}
      this.tableData = []
      this.$nextTick(()=>{
        this.status !== 'detail' ? this.$refs['informationForm'].resetForm() : ''
      })
    },
    validateinformationName (rule, value, callback) {
      repeatInformationName({
        id: this.form.id,
        name: value,
        deptId: this.userInfo.deptId,
      }).then((res)=>{
        if (res.data.code === 0 && res.data.data === true) {
          this.btnLoading = false
          callback()
        } else {
          this.btnLoading = false
          callback(new Error('该信息资源名称已存在！'))
        }
      }).catch(()=>{
        this.btnLoading = false
      })
    },
  },
}

</script>
<style lang="scss">
.form-btn-group-container {
  margin: 10px 0;
}
</style>
