<template>
  <el-form
    :inline="true"
    :model="newListQuery"
    size="small"
    :label-position="labelPosition">
    <div :class="isSearch ? 'search-conten-block' : 'search-conten-inline'">
      <template v-for="(item, index) in formProps">
        <el-form-item :label="item.label ? `${item.label}:` : ''" v-if="item.show == null ? true : item.show" :key="item.prop" v-show="index >= maxShow ? isSearch : true">
          <template v-if="item.type === 'select'">
            <el-select
              :style="{width: item.width ? item.width : 'auto'}"
              @change="item.change"
              :filterable="filterable == null ? true : filterable"
              v-model="newListQuery[item.prop]"
              clearable
              :multiple="item.multiple"
              :placeholder="item.placeholder ? item.placeholder : '请选择'">
              <el-option
                v-for="data in item.data"
                :key="hasDefaultProps(item.props) ? data[item.props.value] : data.value"
                :label="hasDefaultProps(item.props) ? data[item.props.label] : data.label"
                :value="hasDefaultProps(item.props) ? data[item.props.value] : data.value">
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'cascader'">
            <el-cascader
              clearable
              :style="{width: item.width ? item.width : 'auto'}"
              @change="item.change"
              :props="mergeProps(item.props)"
              :options="item.data"
              v-model="newListQuery[item.prop]"
              change-on-select>
            </el-cascader>
          </template>
          <template v-else-if="item.type === 'radio'">
            <el-radio-group v-model="newListQuery[item.prop]">
              <el-radio
                :label="data.value"
                v-for="data in item.data"
                :key="hasDefaultProps(item.props) ? data[item.props.value] : data.value">
                {{hasDefaultProps(item.props) ? data[item.props.label] : data.label}}
              </el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.type === 'date'">
            <el-date-picker
              :style="{width: item.width ? item.width : 'auto'}"
              clearable
              default-value
              style="width: 200px !important;"
              v-model="newListQuery[item.prop]"
              type="date"
              :value-format="item.valueFormat ? item.valueFormat : 'timestamp'"
              placeholder="选择日期">
            </el-date-picker>
          </template>
          <template v-else-if="item.type === 'year'">
            <el-date-picker
              :style="{width: item.width ? item.width : 'auto'}"
              clearable
              style="width: 200px !important;"
              v-model="newListQuery[item.prop]"
              type="year"
              value-format="yyyy"
              placeholder="选择年度">
            </el-date-picker>
          </template>
          <template v-else-if="item.type === 'daterange'">
            <el-date-picker
              :style="{width: item.width ? item.width : 'auto'}"
              clearable
              v-model="newListQuery[item.prop]"
              type="daterange"
              :value-format="item.valueFormat ? item.valueFormat : 'timestamp'"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </template>
          <template v-else-if="item.type === 'input' || !item.type">
            <el-input
              :style="{width: item.width ? item.width : 'auto'}"
              :placeholder="item.placeholder ? item.placeholder : '请输入'"
              v-model.trim="newListQuery[item.prop]"
              :maxlength="item.maxlength ? item.maxlength : 100"
              clearable></el-input>
          </template>
        </el-form-item>
      </template>
    </div>
    <div :class="isSearch ? 'search-button-block' : 'search-button-inline'">
      <el-form-item>
        <gov-button type="search" @click="handleFilter"></gov-button>
        <gov-button type="reset" @click="handleReset" v-if="reset"></gov-button>
        <slot name="button-groups"></slot>
      </el-form-item>
      <el-form-item>
        <gov-button
          v-if="formProps.length > maxShow"
          @click="toggleSearch"
          type="text"
          :text="isSearch ? '收起' : '展开'"
          :icon="isSearch ? 'icon-arrow-up' : 'icon-arrow-down'">
        </gov-button>
      </el-form-item>
    </div>
    <!-- <br>
    listQuery:{{listQuery}}
    <br>
    newListQuery:{{newListQuery}} -->
  </el-form>
</template>

<script>
import { isArray, isBoolean, isNumber, isPlainObject, isString, mergeWith, cloneDeep } from 'lodash'

export default {
  name: "GovSearchBar",
  data () {
    return {
      isSearch: false,
      props: {
        value: 'value',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
      },
      newListQuery: {},
    }
  },
  props: {
    reset: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    // 是否为radio/select/cascader添加全部
    addAll: {
      type: Boolean,
      default: true,
    },
    // 最多显示几个
    maxShow: {
      type: Number,
      default: 2,
    },
    // label位置
    labelPosition: {
      type: String,
      default: 'right',
    },
    // 搜索参数
    listQuery: {
      type: Object,
      default () {
        return {}
      },
    },
    /**
     * 数据格式
     * 如：
     * [
     *   {
     *     prop: 'name',
     *     label: '姓名',
     *     placeholder: '请输入',
     *     multiply: true, select专用
     *     type: 'select/input/radio/cascader',
     *     data: data select/radio/cascader的数据
     *   }
     * ]
     */
    formProps: {
      type: Array,
      default () {
        return []
      },
    },
    resetIgnore: {
      type: Array,
      default: () => {
        return ['limit', 'page']
      },
    },
    isString: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    listQuery: {
      handler (newVal) {
        if (isPlainObject(newVal) && Object.keys(newVal).length > 0) {
          let newListQuery = this.newListQuery
          for (let key in newVal) {
            if (newVal[key] != null || newVal === '') {
              if (newVal[key] !== newListQuery[key]) {
                newListQuery[key] = newVal[key]
              }
            }
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    mergeProps (props) {
      return mergeWith(this.props, props)
    },
    hasDefaultProps (props) {
      return props && Object.keys(props).length > 0
    },
    // 展开切换
    toggleSearch () {
      this.isSearch = !this.isSearch
    },
    // 搜索
    handleFilter () {
      for (let key in this.newListQuery) {
        this.$set(this.listQuery, key, this.newListQuery[key])
      }
      // this.listQuery = cloneDeep(this.newListQuery)
      // console.log('搜索', this.listQuery)
      this.$emit('handleFilter', this.listQuery)
    },
    // 重置
    handleReset () {
      this.newListQuery = this.resetFormData(this.newListQuery)
      this.$emit('handleReset')
    },
    // 数据重置
    resetFormData (data = {}, string = this.isString, ignore = this.resetIgnore) {
      let resultData = cloneDeep(data)
      for (let key in resultData) {
        if (ignore.indexOf(key) > -1) {
          continue
        }
        let value = data[key]
        let result = string ? '' : undefined
        if (isBoolean(value) || isNumber(value) || isString(value)) {
          result = string ? '' : undefined
        } else if (isArray(value)) {
          result = []
        } else if (isPlainObject(value)) {
          result = {}
        } else {
          result = string ? '' : undefined
        }
        this.$set(resultData, key, result)
      }
      return resultData
    },
  },
}
</script>

<style lang="scss" scoped>
.search-conten-inline, .search-button-inline {
  display: inline-block;
}
.search-conten-block, .search-button-block {
  display: block;
}
.search-button-block {
  text-align: right;
}
</style>
