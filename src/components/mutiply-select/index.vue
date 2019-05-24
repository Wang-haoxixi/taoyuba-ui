<template>
  <div style="display: flex;">
    <el-select class="select-box" v-model="submitSelectedIds" multiple collapse-tags filterable remote default-first-option :loading="loading" :placeholder="`选择多个${options.name}`" :multiple-limit="multipleLimit" :remote-method="remoteMethod">
      <el-option v-for="item in selectedList" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <div class="btn-wrapper">
      <el-button icon="el-icon-close" @click="handleCleanAll" circle></el-button>
    </div>
    <div class="btn-wrapper">
      <el-button icon="el-icon-search" @click="handleOpenTable" circle></el-button>
    </div>
    <form-dialog :title="`选择${options.name}`" :dialogShow="dialogShow" @close="closeDialog">
      <multiply-table :selectIds="submitSelectedIds" :selectedList="selectedList" :columnMap="columnMap" :getRequestName="options.getRequestName" :pageLimit="options.pageLimit" @giveSelectedObjs="handleChangeSelectedIds" :isSimple="options.simple"></multiply-table>
    </form-dialog>
  </div>
</template>

<script>
import * as _ from 'lodash'
import moment from 'moment'
import { validatenull } from '@/util/validate'
import formDialog from '@/components/form-dialog'
import multiplyTable from './table.vue'
export default {
  props: {
    selectObjs: {
      default: () => [],
    },
    value: {
      default: () => [],
    },
    /**
     * name: '' 什么选择器
     * labelProp: '' 选择器的中的 value 字段
     * labelName: '' 选择器的中的 value 显示字段
     * valueProp: '' 选择器中的 label 字段
     * valueName: '' 选择器中的 label 显示字段
     * getRequestName: '' 请求分页的链接,
     * pageLimit: 6 表格分页数量
     * simple: false 是否单个
     */
    options: {
      default: () => {
        return {}
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
      default: () => [],
    },
  },
  components: {
    formDialog,
    multiplyTable,
  },
  data () {
    return {
      multipleLimit: this.options.simple ? 1 : 0,
      selectedList: [],
      submitSelectedIds: this.value,
      loading: false,
      dialogShow: false,
    }
  },
  computed: {
    columnMap () {
      const { otherProps } = this
      const firstColumn = [
        {
          label: this.options.valueName,
          prop: this.options.valueProp,
        },
        {
          label: this.options.labelName,
          prop: this.options.labelProp,
          search: true, // 后端必须支持相同的字段, 才能支持搜索
        },
      ]
      return [
        ...firstColumn,
        ...otherProps.map(m => {
          m.formatter = function (row, value) {
            if (validatenull(value)) {
              return '暂无'
            } else {
              if (m.formatterType === 'time') {
                return moment(value).format('ll')
              }
              return value
            }
          }
          return m
        }),
      ]
    },
  },
  mounted () {
    this.initData()
  },
  destroyed () {
    this.submitSelectedIds = []
  },
  methods: {
    initData () {
      this.selectedList = this.selectObjs.map(item => {
        return {
          value: item[this.options.valueProp],
          label: item[this.options.labelProp],
        }
      })
    },
    handleCleanAll () {
      this.$confirm('此操作将移除所有关联, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.submitSelectedIds = []
        this.selectedList = []
      })
    },
    handleChangeSelectedIds (val) {
      this.dialogShow = false
      const idVal = _.map(val, 'value')
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
    remoteMethod (query) {
      const { getRequestName, labelProp } = this.options
      let pageOpt = {
        page: 1,
        limit: 10,
        orderByField: undefined,
        isAsc: true,
      }
      pageOpt[labelProp] = query
      this.loading = true
      getRequestName({ ...pageOpt }).then(res => {
        // console.log(res.data)
        this.selectedList = res.data.records.map(m => {
          return {
            label: m.organizationName,
            value: m.organizationId,
          }
        })
        this.loading = false
      })
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

<style>
.select-box {
  width: 300px;
}
.el-select__tags span > span > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  display: inline-flex;
}
</style>
