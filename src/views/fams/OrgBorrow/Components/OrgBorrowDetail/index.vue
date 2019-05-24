<template>
  <div>
    <basic-container>
      <page-header title="组织申请借款" :replaceText="replaceText" :backOption="backOption"></page-header>
      <div class="withdraw-wrapper">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <keep-alive>
          <component :is="steps[current].content" :data="steps[current].data" @on-data="steps[current].onData" @prev="prev" @back="back"></component>
        </keep-alive>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { statusMap } from './options'
import FirstContent from './FirstContent'
import SecondContent from './SecondContent'
import ThirdContent from './ThirdContent'
import FourthContent from './FourthContent'
import FifthContent from './FifthContent'
import SixthContent from './SixthContent'
import { getOrgBorrowById } from '@/api/fams/org_borrow'
export default {
  components: {
    FirstContent,
    SecondContent,
    ThirdContent,
    FourthContent,
    FifthContent,
    SixthContent,
  },
  data () {
    return {
      replaceText: () => '（将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。）',
      backOption: {
        isBack: true,
      },
      current: 0,
      steps: [{
        title: '填写借款信息',
        content: 'FirstContent',
        nextText: '下一步',
        prevText: '',
        data: undefined,
        onData: this.handleFirst,
      }, {
        title: '确认借款信息',
        content: 'SecondContent',
        nextText: '提交',
        prevText: '上一步',
        data: undefined,
        onData: this.handleSecond,
      }, {
        title: '借出方组织审核',
        content: 'ThirdContent',
        nextText: '撤销',
        prevText: '',
        data: undefined,
        onData: this.handleThird,
      }, {
        title: '借出方财务操作',
        content: 'FourthContent',
        nextText: '',
        prevText: '',
        data: undefined,
        onData: this.handleFirst,
      }, {
        title: '借入方财务确认收款',
        content: 'FifthContent',
        nextText: '',
        prevText: '',
        data: undefined,
        onData: this.handleFirst,
      }, {
        title: '完成',
        content: 'SixthContent',
        nextText: '',
        prevText: '',
        data: undefined,
        onData: this.handleFirst,
      }],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleFirst (form) {
      this.next()
      this.steps[this.current].data = form
    },
    handleSecond (form) {
      this.next()
      this.steps[this.current].data = form
    },
    handleThird () {
      this.$router.history.go(-1)
    },
    next () {
      this.current++
    },
    prev () {
      this.current--
    },
    back () {
      this.$router.go(-1)
    },
    loadPage () {
      if (this.id) {
        getOrgBorrowById(this.id).then(({ data }) => {
          this.current = statusMap[data.data.status]
          this.steps[this.current].data = data.data
        })
      }
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