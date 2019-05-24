<template>
  <el-form
    :label-width="labelWidth"
    class="detail-form">
    <h4 v-if="title !== ''" class="title">{{title}}</h4>
    <el-row>
      <template v-for="item in props">
        <el-col
          :span="24 / column"
          :key="item.prop">
          <div class="item-form">
            <el-form-item
              :label="`${item.label}：`">
              <!-- 自定义 -->
              <template v-if="item.detailTemplate && item.show == null ? true : item.show">
                <template>
                  <slot :name="`${item.prop}Detail`" :data="detailContent(item, getTitle(item.prop), data[item.prop])"></slot>
                </template>
              </template>
              <!-- 详情和点击 -->
              <template v-else-if="item.show == null ? true : item.show">
                <p
                  class="ellipsis text"
                  :class="item.detailClick ? 'link' : ''">
                  <span
                    @click="detailClickHandle(item.prop, getTitle(item.prop), item)"
                    :title="getTitle(item.prop)">
                    {{getTitle(item.prop)}}
                  </span>
                </p>
              </template>
            </el-form-item>
          </div>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'kDetail',
  props: {
    title: {
      type: String,
      default: '',
    },
    // 表单一行${column}个
    column: {
      type: Number,
      default: 1,
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '100px',
    },
    props: {
      type: Array,
      default () {
        return []
      },
    },
    /**
      prop: 字段名
      label: 中文名
      detailClick: true/false 点击
      detailTemplate: true/false 自定义
    */
    data: {
      type: Object,
      default () {
        return {}
      },
    },
    detailName: {
      type: String,
      default: 'ForShow',
    },
  },
  methods: {
    // 详情点击
    detailClickHandle (prop, row, props) {
      if (props.detailClick) {
        this.$emit(`${prop}-detail-click-handle`, row, prop, props)
      }
    },
    detailContent (prop, content, value) {
      return {
        props: prop,
        content: content,
        value: value,
      }
    },
    getTitle (prop) {
      return this.data[this.data[prop + this.detailName] != null ? prop + this.detailName : prop]
    },
  },
}
</script>
<style lang="scss" scoped>
.detail-form {
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .text {
    display: block;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
