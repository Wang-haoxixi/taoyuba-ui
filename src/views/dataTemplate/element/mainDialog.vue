<template>
  <div class="main-form">
    <gov-dialog
      width="80%"
      ref="dialog"
      :btnGroup="btnGroup"
      @open="handleOpen"
      @closed="handleClosedDialog"
      :title="dialog.textMap[status] ? dialog.textMap[status] : ''"
      :isBtnGroup="status !== dialog.textName.detail"
      @handleSubmit="dialogSubmit">
      <gov-layout-form>
        <div class="detail-wrapper">
          <!-- 查看 -->
          <gov-detail-form v-if="status === dialog.textName.detail" v-model="temp" :option="detailOption"></gov-detail-form>
          <!-- 新增编辑 -->
          <avue-form ref="form" v-else v-model="form" :option="editOption"></avue-form>
        </div>
      </gov-layout-form>
    </gov-dialog>
  </div>
</template>

<script>
import { editOption, detailOption, form, column } from './const/index'
import {updateData, createData} from '@/api/dataTemplate/element'
import {getStandardByDomainClassification, getDataByStandard} from '@/api/dataTemplate/standardFile'
import {getFieldClassify} from '@/api/dataTemplate/domainClassification'
import mixin from '@/mixins/mixin'
export default {
  mixins: [mixin],
  data () {
    return {
      detailOption,
      editOption,
      form,
      column,
      saveBtnLoading: false,
    }
  },
  created () {
    this.init()
  },
  computed: {
    btnGroup () {
      return [
        {
          label: '保存',
          type: 'primary',
          loading: this.saveBtnLoading,
          disabled: false,
          fn: 'handleSubmit',
        },
        {
          label: '取消', // 按钮文本
          loading: false, // 按钮加载中状态
          disabled: false, // 是否禁用按钮
          fn: 'handleCancel', // 按钮回调方法名称
        },
      ]
    },
  },
  methods: {
    init () {
      let that = this
      let dmnClsIdChange = function ({value}) {
        that.getStandardByDomainClassificationDataCreateAndUpdate({id: value})
      }
      let stdDocIdChange = function ({value}) {
        // console.log('row1', row)
        that.getDataByStandardDataCreateAndUpdate({id: value})
      }
      this.changeColumn({column: this.column, name: 'dmnClsId', type: 'change', data: dmnClsIdChange})
      this.changeColumn({column: this.column, name: 'stdDocId', type: 'change', data: stdDocIdChange})
    },
    // 弹窗打开时操作
    handleOpen () {
      this.clearValidate()
      if (this.status === this.dialog.textName.create) {
        this.form = this.initForm()
        this.changeColumn({column: this.editOption.column, name: 'stdDocId', type: 'dicData', data: []})
        this.changeColumn({column: this.editOption.column, name: 'cdCollId', type: 'dicData', data: []})
        this.changeColumn({column: this.editOption.column, name: 'dtCollId', type: 'dicData', data: []})
      } else {
        if (this.temp.dmnClsId) {
          this.getStandardByDomainClassificationData({id: this.temp.dmnClsId}).then(() => {
            if (this.temp.stdDocId) {
              this.getDataByStandardData({id: this.temp.stdDocId})
            }
          })
        }
      }
    },
    initForm () {
      return {
        id: '',
        dtEleChnNm: '',
        dtEleEgNm: '',
        defDesc: '',
        dmnClsId: '',
        dtType: '',
        dtLgth: '',
        deciPl: '',
        stdDocId: '',
        cdCollId: '',
        dtCollId: '',
        remrk: '',
      }
    },
    // 根据领域分类ID获取标准文件列表
    getStandardByDomainClassificationData ({id}) {
      return new Promise((resolve) => {
        getStandardByDomainClassification({id}).then(({data}) => {
          if (data.code === 0) {
            this.changeColumn({column: this.editOption.column, name: 'stdDocId', type: 'dicData', data: data.data})
            resolve()
          }
        })
      })
    },
    getStandardByDomainClassificationDataCreateAndUpdate ({id}) {
      // console.log('id', id)
      this.getStandardByDomainClassificationData({id}).then(() => {
        this.form.stdDocId = ''
        this.form.cdCollId = ''
        this.form.dtCollId = ''
        this.changeColumn({column: this.editOption.column, name: 'cdCollId', type: 'dicData', data: []})
        this.changeColumn({column: this.editOption.column, name: 'dtCollId', type: 'dicData', data: []})
      })
    },
    // 根据标准文件ID获取数据集和代码集列表
    getDataByStandardData ({id}) {
      return new Promise((resolve) => {
        getDataByStandard({id}).then(({data}) => {
          if (data.code === 0) {
            this.changeColumn({column: this.editOption.column, name: 'cdCollId', type: 'dicData', data: data.data.cdColl})
            this.changeColumn({column: this.editOption.column, name: 'dtCollId', type: 'dicData', data: data.data.dtColl})

            resolve()
          }
        })
      })
    },
    getDataByStandardDataCreateAndUpdate ({id}) {
      this.getDataByStandardData({id}).then(() => {
        this.form.cdCollId = ''
        this.form.dtCollId = ''
      })
    },
    open () {
      getFieldClassify().then(({data})=>{
        if(data.code === 0){
          this.$set(this.editOption.column[6],"dicData",data.data)
          this.$nextTick(()=>{
            this.$refs['form'] ? this.$refs['form'].clearValidate() : ''
          })
        }
      })
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    // 保存
    dialogSubmit () {
      delete this.form.updTm
      this.$refs.form.validate().then(() => {
        this.form.infoItemList = this.tableList
        this.saveBtnLoading = true
        if (this.status === this.dialog.textName.create) {
          createData(this.form).then(({data}) => {
            if(data.code === 0){
              this.$emit('successForm','新增成功')
              this.close()
            }
            this.saveBtnLoading = false
          }).catch(()=>{
            this.saveBtnLoading = false
          })
        } else if (this.status === this.dialog.textName.update) {
          updateData(this.form).then(({data}) => {
            if(data.code === 0){
              this.$emit('successForm','修改成功')
              this.close()
            }
            this.saveBtnLoading = false
          }).catch(()=>{
            this.saveBtnLoading = false
          })
        }
      })
    },
    // 弹窗关闭后
    handleClosedDialog () {
      this.resetFormData(this.form, true)
      if (this.status !== this.dialog.textName.detail) {
        this.$refs['form'].clearValidate()
      }
    },
  },
}
</script>
