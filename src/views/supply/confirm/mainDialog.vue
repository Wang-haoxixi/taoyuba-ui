<template>
  <gov-dialog
    ref="dialog"
    :title="status[state]"
    @closed="handleClosed"
    :is-btn-group="false"
    width="70%">
    <gov-layout-form>
      <template>
        <div class="detail-wrapper show-header">
          <gov-detail-form :option="detailOption" v-model="formData"></gov-detail-form>
        </div>
      </template>
    </gov-layout-form>
  </gov-dialog>
</template>

<script>
// import { detailHeadOption, detailFirstOption, detailSecondOption, detailLastOption, materialConfirmationOption, itemConfirmationOption } from './const/index'
import formOption from './const/mainFormOption'

export default {
  mixins: [formOption],
  data () {
    return {
      status: {detail: '查看'},
      array:[],
      deptList: [],
      statusList: [{value: 1, label: '同意'}, {value: 2, label: '拒绝'}],
    }
  },
  computed: {
    detailOption () {
      let formOption = []
      // 确认态度（1-待确认步骤 2-统筹步骤  3-强制确认步骤）
      if (!this.formData.flowVOs) {
        // 初始状态
        return {option: [this.detailHeadOption]}
      } else if (this.formData.flowVOs.length == 0 // 初次待确认
          || (this.formData.flowVOs.length == 1 && this.formData.flowVOs[0].attitude == 1) // 初次已确认
        ) {
        formOption = [this.detailHeadOption, this.detailFirstOption]
      } else if ((this.formData.flowVOs.length == 1 && this.formData.flowVOs[0].attitude == 0 && this.formData.step == 1) // 初次拒绝，即二次待确认
          || (this.formData.flowVOs.length == 2 && this.formData.flowVOs[1].attitude == 1 && this.formData.flowVOs[1].type == 0) // 二次已确认
        ) {
        formOption = [this.detailHeadOption, this.detailFirstOption, this.detailSecondOption]
      } else { // 正在统筹、强制待确认、强制已确认
        // 需要判断是否存在二次确认
        if ((this.formData.flowVOs.length == 1 && this.formData.step == 2) // 初次部门直接指派给统筹，统筹待确认
          || (this.formData.flowVOs.length > 1 && this.formData.flowVOs[1].type == 1) // 第二步骤不是普通部门操作
        ) {
          formOption = [this.detailHeadOption, this.detailFirstOption, this.detailLastOption]
        } else {
          formOption = [this.detailHeadOption, this.detailFirstOption, this.detailSecondOption, this.detailLastOption]
        }
      }
      // 若确认成功，显示确认后的数据
      if (this.formData.status == 1 || this.formData.status == 3 || this.formData.status == 4) {
        formOption.push(this.ConfirmationOption)
      }
      return {option: formOption}
    },
  },
  props: {
    formData: {
      type: Object,
      default: ()=>{},
    },
    state: {
      type: String,
      default: 'detail',
    },
  },
  methods: {
    open () {
      this.$refs['dialog'].open()
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {

    },
  },
}
</script>
