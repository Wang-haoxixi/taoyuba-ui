<template>
  <div class="contract-box port-detail">
    <page-header title="面对面培训统计" :backOption="backOption"></page-header>
    <basic-container>
      <div class="title-information">
        <h1>基本情况展示</h1>
        <div class="base-information">
          <div>
            <p>参会人员</p>
            <p><span>444</span>人</p>
            <i class="base-right"></i>
          </div>
          <div>
            <p>船东</p>
            <p><span>444</span>人</p>
            <i class="base-right"></i>
          </div>
          <div>
            <p>渔船监护人</p>
            <p><span>444</span>人</p>
            <i class="base-right"></i>
          </div>
          <div>
            <p>培训次数</p>
            <p><span>444</span>人</p>
          </div>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-button @click="back">返回</el-button>
      </div>
    </basic-container>
  </div>
</template>
<script>
export default {
  mixins: [],
  data () {
    return {
      form: {},
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.back() },
      },
    }
  },
  methods: {
    getDetail () {},
    back () {
      this.$emit('back')
    },
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  filters: {
  },
  watch: {
  },
}
</script>
<style lang="scss" scoped>
.contract-box {
  padding: 20px;
  .title-information {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 12px;
  }
  .base-information {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    padding: 20px 40px;
    div {
      width: 200px;
      position: relative;
      i {
        display: block;
        position: absolute;
        right: 0;
        top: 25px;
        width: 1px;
        height: 40px;
        background: #ccc;
      }
    }
    p {
      span {
        color: #3b3b3b;
        font-size: 20px;
        margin-right: 5px;
        display: inline-block;
        letter-spacing: 2px;
      }
      color: #a2a2a2;
    }
  }
}
</style>
