<template>
  <div class="pull-down">
    <div 
      class="choose-container clearfix" 
      v-for="(item, i) in option"
      :key="item.title">
      <div class="pull-left name">{{item.title || ''}}：</div>
      <div 
        :ref="`content${i}`"
        class="pull-left content" 
        v-if="item.data && item.data.length > 0" >
        <template v-for="(item1, index) in item.data">
          <span 
            :key="index"
            class="item" 
            :class="item1[item.prop.value] === activeValue ? 'active' : ''"
            @click="handleChange(item)">
            {{item1[item.prop.label]}}
          </span>
        </template>
      </div>
      <span class="toggle" @click="handleToggle(i)"><i :class="toggleType ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeValue: '',
      active: true,
      toggleType: false,
      maxHeight: 29,
    }
  },
  props: {
    option: {
      type: Array,
      default: () => [],
    },
  },
  mounted () {
    this.setHeight()
  },
  methods: {
    handleChange (item) {
      this.$emit('change', item)
    },
    setHeight () {
      this.$nextTick(() => {
        let data = this.option
        for (let i = 0, len = data; i < len; i++) {
          this.toggleType = this.$refs[`content${i}`].offsetHeight > this.height ? true : false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.pull-down {
  .item-body {
    .choose-container {
      font-size: 14px;
      margin: 10px 0 30px 0;
      position: relative;
      .toggle {
        position: absolute;
        bottom: -20px;
        font-size: 14px;
        &:hover {
          color: #409EFF;
        }
        color: #999;
        left: 48%;
        cursor: pointer;
      }
      .name {
        color: #666;
        width: 100px;
      }
      .content {
        width: calc(100% - 100px);
        color: #999;
        &.up {
          height: 29px;
          overflow: hidden;
        }
        span {
          display: inline-block;
          margin: 0 20px 10px 0;
          cursor: pointer;
          &.active {
            color: #409EFF;
          }
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>

