<template>
  <div>
    <basic-container>
      <page-header :title="`${record.methodName}试卷`" :backOption="backOption"></page-header>
      <div class="withdraw-wrapper">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <keep-alive>
          <component :is="steps[current].content" :data="steps[current].data" @on-data="steps[current].onData"
            @prev="prev" :ref="steps[current].content"></component>
        </keep-alive>
      </div>
    </basic-container>
  </div>
</template>
<script>
import FirstContent from './testPaper/FirstContent'
import SecondContent from './testPaper/SecondContent'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: {
    FirstContent, SecondContent,
  },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      current: 0,
      steps: [{
        title: this.record.methodName + '试卷',
        content: 'FirstContent',
        data: this.record,
        onData: this.handleFirst,
      }, {
        title: '试题配置',
        content: 'SecondContent',
        data: undefined,
        onData: this.handleBack,
      }],
    }
  },
  methods: {
    handleFirst (form) {
      this.next()
      this.steps[this.current].data = form
    },
    handleBack () {
      this.back()
    },
    next () {
      this.current++
    },
    prev () {
      this.current--
    },
    back () {
      this.$emit('onGoBack')
    },
    handleGoBack () {
      this.$confirm('此操作将不会自动保存试卷,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$emit('onGoBack')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消返回',
        })
      })

    },
  },
}
</script>
<style scoped>
.withdraw-wrapper {
  margin-top: 50px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>