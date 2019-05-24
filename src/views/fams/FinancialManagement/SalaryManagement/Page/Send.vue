<template>
  <div>
    <basic-container>
      <page-header title="工资发放" :replaceText="replaceText" :data="[120]" :backOption="backOption"></page-header>
      <div class="search-con">
        <el-input placeholder="请输入姓名" v-model="input5" class="input-with-select" size="small">
          <el-button slot="append">搜索</el-button>
        </el-input>
      </div>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='HasSent'" v-slot:HasSent>
          <has-sent v-loading="activeTab !=='HasSent'"></has-sent>
        </template>
        <template v-if="activeTab ==='Unsent'" v-slot:Unsent>
          <unsent v-loading="activeTab !=='Unsent'"></unsent>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import HasSent from './HasSent/'
import Unsent from './Unsent/'
export default {
  components: { HasSent, Unsent },
  data () {
    return {
      replaceText: (data) => `（共有${data[0]}条绩效考核记录）`,
      tabList: [{
        label: '已发送（4）',
        value: 'HasSent',
      }, {
        label: '未发送（2）',
        value: 'Unsent',
      }],
      activeTab: 'HasSent',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>

<style lang="scss" scoped>
.search-con {
  position: absolute;
  display: inline-block;
  right: 0;
  width: 280px;
}
</style>
<style lang="css" scoped>
.basic-container >>> .el-tabs__nav-wrap {
  border-bottom: 1px solid #ebeef5;
}
.basic-container >>> .el-card__body {
  position: relative;
}
</style>