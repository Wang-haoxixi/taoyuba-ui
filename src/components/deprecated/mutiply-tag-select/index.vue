<template>
  <div>
    <el-tag :type="tagType" :key="tag" size="medium" v-for="tag in submitSelectedIds" closable :disable-transitions="false" @close="handleClose(tag);">
      {{ tag }}
    </el-tag>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="mini" @click="showInput">快速添加</el-button>
    <el-button icon="el-icon-plus" size="mini" @click="handleOpenTable"></el-button>
    <form-dialog :title="`选择${options.name}`" :dialog-show="dialogShow" @close="closeDialog">
      <multiply-table :select-ids="submitSelectedIds" :selected-list="selectedList" :column-map="columnMap" :get-request-name="options.getRequestName" @giveSelectedObjs="handleChangeSelectedIds"></multiply-table>
    </form-dialog>
  </div>
</template>

<script>
import * as _ from 'lodash'
import { getTagPage } from '@/api/tms/tag'
import moment from 'moment'
import formDialog from '@/components/deprecated/form-dialog'
import multiplyTable from './table.vue'
export default {
  props: {
    // success/info/warning/danger
    tagType: {
      type: String,
      require: false,
      default: 'info',
    },
    selectObjs: {
      type: Array,
      require: true,
      default: () => [],
    },
    value: {
      type: Array,
      require: true,
      default: () => [],
    },
    /**
     * name: '' 什么选择器
     * labelProp: '' 选择器的中的 value 字段
     * labelName: '' 选择器的中的 value 显示字段
     * valueProp: '' 选择器中的 label 字段
     * valueName: '' 选择器中的 label 显示字段
     * getRequestName: '' 请求分页的链接,
     * pageLimit: 10 表格分页数量
     */
    options: {
      type: Object,
      require: true,
      default: () => {
        return {
          name: '标签',
          labelName: '标签名字',
          labelProp: 'name',
          valueName: '标签ID',
          valueProp: 'tagId',
          getRequestName: getTagPage,
          pageLimit: 6,
        }
      },
    },
    /**
     * otherProps: [] => { type: 'datetime',
     *   valueFormat: 'timestamp',
     *   format: 'yyyy-MM-dd hh:mm:ss',
     *   label: '创建时间',
     *   prop: 'createTime',
     *   align: 'center'
     * }
     */
    otherProps: {
      type: Array,
      require: true,
      default: () => [
        {
          prop: 'refers',
          label: '引用次数',
        },
        {
          prop: 'views',
          label: '点击',
        },
        {
          prop: 'priority',
          label: '优先级',
        },
        {
          prop: 'creationDate',
          label: '创建时间',
          formatterType: 'time',
        },
        {
          prop: 'typeName',
          label: '标签分类',
        },
        {
          prop: 'levelName',
          label: '标签级别',
        },
      ],
    },
  },
  components: {
    formDialog,
    multiplyTable,
  },
  data () {
    return {
      selectedList: [],
      inputVisible: false,
      inputValue: '',
      submitSelectedIds: this.value,
      loading: false,
      dialogShow: false,
    }
  },
  computed: {
    columnMap () {
      let { otherProps } = this
      const firstColumn = [
        {
          label: this.options.valueName,
          prop: this.options.valueProp,
        },
        {
          label: this.options.labelName,
          prop: this.options.labelProp,
          search: true,
        },
      ]
      otherProps = otherProps.map(m => {
        m.formatter = function (row, value) {
          if (value === null || value === '') {
            return '暂无'
          } else {
            if (m.formatterType === 'time') {
              return moment(value).format('ll')
            }
            return value
          }
        }
        return m
      })
      return [...firstColumn, ...otherProps]
    },
  },
  mounted () {
    this.initData()
  },
  destroyed () {
    this.submitSelectedIds = []
  },
  methods: {
    handleClose (tag) {
      this.submitSelectedIds.splice(this.submitSelectedIds.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.submitSelectedIds.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    initData () {
      this.selectedList = this.selectObjs.map(item => {
        return {
          value: item[this.options.valueProp],
          label: item[this.options.labelProp],
        }
      })
    },
    handleChangeSelectedIds (val) {
      this.dialogShow = false
      const idVal = _.map(val, 'label')
      this.selectedList = _([...val])
        .uniqBy('value')
        .value()
      this.submitSelectedIds = _([...idVal])
        .uniq()
        .value()
    },
    handleOpenTable () {
      this.dialogShow = true
    },
    closeDialog () {
      this.dialogShow = false
    },
  },
  watch: {
    value (n) {
      this.submitSelectedIds = n
    },
    selectObjs () {
      this.initData()
    },
    submitSelectedIds (n) {
      this.$emit('input', n)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin-right: 10px;
}
.input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}
</style>
