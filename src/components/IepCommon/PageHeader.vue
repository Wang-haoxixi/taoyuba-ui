<template>
  <div class="title-wrapper">
    <div class="title-col">
      <div class="left">
        <span v-if="!isAdvance" class="page-title" :style="{fontSize: `${titleSize}px`,fontWeight: titleWeight}">{{title}}</span>
        <span v-if="!isAdvance" class="page-desc">{{desc}}</span>
        <slot v-if="isAdvance" name="custom"></slot>
      </div>
      <div class="right">
        <operation-wrapper>
          <slot></slot>
          <iep-button v-if="backOption.isBack" @click="handleBack">返回</iep-button>
        </operation-wrapper>
      </div>
    </div>
    <div class="sub-col">
      <slot name="sub"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepPageHeader',
  props: {
    isAdvance: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
    titleSize: {
      type: Number,
      default: 20,
    },
    titleWeight: {
      type: Number,
      default: 400,
    },
    replaceText: {
      type: Function,
      default: () => { },
    },
    data: {
      type: Array,
      default: () => [],
    },
    backOption: {
      type: Object,
      default: () => {
        return {
          isBack: false,
          backPath: '',
          backFunction: () => { },
        }
      },
    },
  },
  computed: {
    desc () {
      return this.replaceText(this.data)
    },
  },
  methods: {
    handleBack () {
      if (this.backOption.backFunction) {
        this.backOption.backFunction()
        return
      } else {
        if (window.history.length <= 1) {
          this.$router.push({ path: '/' })
          return false
        } else {
          this.$router.go(-1)
        }
        //上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
        //如果上面都执行了 页面都跳走了，这个也就不用管了   
        // setTimeout(() => {
        //   this.$router.push({ path: '/' })
        // }, 500)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.title-wrapper {
  margin-bottom: 20px;
  .title-col {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    .left {
      width: 100%;
    }
    .page-title {
      font-size: 20px;
    }
    .page-desc {
      font-size: 14px;
    }
    .el-button--default.is-plain:nth-child(1) {
      background: #fff;
      border: 1px solid #dcdfe6;
      border-color: #dcdfe6;
      color: #606266;
      &:hover {
        border-color: #ea8d03;
        background-color: #fff7ec;
        color: #ea8d03;
      }
    }
  }
}
</style>
