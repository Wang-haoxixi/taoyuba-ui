<template>
  <div class="about-task">
    <div class="task-nav">
      <span class="navTitle">我的推荐</span>
      <nav-tab :nav-list="navList" @tab="tab"></nav-tab>
    </div>
    <nav-content :contentData="contentData"></nav-content>
  </div>
</template>

<script>
import NavTab from './NavTab'
import NavContent from './RecommendContent'
export default {
  components: { NavTab, NavContent },
  data () {
    return {
      contentData: '',
      navList: [{
        subtitle: '服务机构',
        type: 'action',
        id: 0,
      }, {
        subtitle: '培训信息',
        type: 'success',
        id: 1,
      }],
      content: {
        action: [],
        success: [],
      },
    }
  },
  created () {
    this.contentData = this.content.action
  },
  methods: {
    tab (val) {
      this.contentData = this.content[val]
    },
  },
}
</script>
<style lang="scss" scoped>
.about-task {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  .task-nav {
    display: flex;
    align-items: center;
    .navTitle {
      font-size: 16px;
      padding-right: 20px;
      color: #000;
    }
  }
  .title {
    font-size: 14px;
    cursor: pointer;
    color: #666;
    &:hover {
      color: #0185d8;
    }
  }
}
</style>
