<template>
  <div class="about-task">
    <div class="task-nav">
      <span class="navTitle">我的关系</span>
      <nav-tab :nav-list="navList" @tab="tab"></nav-tab>
    </div>
    <relationship-content :contentData="contentData"></relationship-content>
  </div>
</template>

<script>
import NavTab from './NavTab'
import RelationshipContent from './RelationshipContent'
export default {
  components: { NavTab, RelationshipContent },
  data () {
    return {
      showClass: 0,
      navName: 'order',
      contentData: [],
      navList: [{
        subtitle: '师徒',
        type: 'mentor',
        id: 0,
      }, {
        subtitle: '协作',
        type: 'customer',
        id: 1,
      }, {
        subtitle: '同事',
        type: 'colleague',
        id: 3,
      }, {
        subtitle: '通讯录',
        type: 'circle',
        id: 4,
      }],
      content: {
        mentor: [],
        customer: [],
        partner: [],
        colleague: [],
        circle: [],
      },
    }
  },
  created () {
    this.contentData = this.content.mentor
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
      color: #cb3737;
    }
  }
}
</style>
