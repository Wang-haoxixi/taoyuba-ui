<template>
  <div>
    <basic-container>
      <page-header :title="`${record.methodName}考试`" :backOption="backOption"></page-header>
      <div class="withdraw-wrapper">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <keep-alive>
          <component :is="steps[current].content" :data="steps[current].data" @on-data="steps[current].onData"
            @prev="prev" @back-list="back" :ref="steps[current].content"></component>
        </keep-alive>
      </div>
    </basic-container>
  </div>
</template>
<script>
import FirstContent from './CreateExam/FirstContent'
import SecondContent from './CreateExam/SecondContent'
import ThirdContent from './CreateExam/ThirdContent'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: {
    FirstContent, SecondContent, ThirdContent,
  },
  watch: {
    'record.current': {
      handler (newName) {
        this.current = newName
        this.steps[this.current].data = this.record
      },
      immediate: true,
    },
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
        title: this.record.methodName + '考试',
        content: 'FirstContent',
        data: undefined,
        onData: this.handleFirst,
      }, {
        title: '选择试题',
        content: 'SecondContent',
        data: undefined,
        onData: this.handleSecond,
      }, {
        title: '发布考试',
        content: 'ThirdContent',
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
    handleSecond (data) {
      this.next()
      this.steps[this.current].data = data
    },
    handleBack () {
      this.back()
    },
    next () {
      this.current++
    },
    prev (data) {
      this.current--
      this.steps[this.current].data = data
    },
    back () {
      this.$emit('onGoBack')
    },
    handleGoBack () {
      this.$confirm('此操作将不会自动保存考试,是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$emit('onGoBack')
        this.$message({
          type: 'success',
          message: '返回成功!',
        })
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