<template>
  <div class="new-tehnology">
      <div class="new-tehnology-tab">
        分类：
        <div v-for="(item,index) in newTehnologyTab" :key="index" class="piece-tab" :class="showClass==index?'color':''" @click="tab(index)">{{item}}</div>
      </div>
      <div class="new-tehnology-content">
        <div v-for="(item,index) in newTehnologyContent" :key="index" class="piece">
          <img :src="item.img" alt="">
          <div class="text">
            <span>{{item.name}}</span>
            <span class="introduction">{{item.introduction}}</span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showClass: 0,
      newTehnologyTab: ['全部', '编辑器', '研究工具', '截图工具', '设计工具'],
      newTehnologyContent: [
        { img: require('../images/Ant Design Pro.jpg'), name: 'Ant Design Pro', introduction: '一个企业级开箱即用的中后台前端' },
        { img: require('../images/Element UI.jpg'), name: 'Element UI', introduction: 'Element UI 是一套采用 Vue 2.0 作为基础框架实现的组件库，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的组件库，提供了配套设计资源，帮助网站快速成型' },
        { img: require('../images/React.jpg'), name: 'React', introduction: 'React 可以非常轻松地创建用户交互界面。为你应用的每一个状态设计简洁的视图，在数据改变时 React 也可以高效地更新渲染界面。' },
        { img: require('../images/Hadooop.jpg'), name: 'Hadooop', introduction: '利用Hadoop来了解您的数据蕴含的价值，可能不会那么容易，是个挑战。而SAS让一切变得容易。' },
        { img: require('../images/Vue.js.jpg'), name: 'Vue.js', introduction: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。' },
        { img: require('../images/Lisp.jpg'), name: 'Lisp', introduction: 'LISP语言(LISP，List Processing的缩写)是一种早期开发的、具有重大意义的表处理语言。它适用于符号处理、自动推理、硬件描述和超大规模集成电路设计等。' },
        { img: require('../images/Sencha Touch.jpg'), name: 'Sencha Touch', introduction: 'Sencha Touch。适用于最前沿Touch Web的Sencha Touch框架，该框架是世界上第一个基于HTML5的Mobile App框架。' },
        { img: require('../images/jQuery Mobile.jpg'), name: 'jQuery Mobile', introduction: 'jQuery Mobile 是用于创建移动 Web 应用的前端开发框架。' },
      ],
    }
  },
  methods: {
    tab (val) {
      this.showClass = val
    },
  },
}
</script>
<style lang="scss" scoped>
.new-tehnology {
  grid-column-start: 1;
  grid-column-end: 3;
  .new-tehnology-tab {
    width: 100%;
    height: 40px;
    line-height:26px;
    .piece-tab {
      display: inline;
      padding: 2px 10px;
      border-radius: 12px;
      border: 1px solid #ffffff;
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        background-color: #fef6f4;
        border: 1px solid #dc8687;
        color: #dc8687;
      }
    }
    .color {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
    }
  }
  .new-tehnology-content {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr;
    .piece {
      cursor: pointer;
      img {
        float: left;
        width: 50px;
        height: 50px;
      }
      .text {
        float: left;
        width: 300px;
        height: 50px;
        margin-left: 19px;
        span {
          display: block;
        }
        .introduction {
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
