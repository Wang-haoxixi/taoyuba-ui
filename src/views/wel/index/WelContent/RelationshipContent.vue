<template>
  <div class="relationshipContent">
    <iep-no-data v-if="!contentData.length" message="暂无内容"></iep-no-data>
    <div class="relationship-item" v-for="(item,index) in contentData" :key="index">
      <div><span class="title">{{item.title}}{{item.data}}</span></div>
      <ul>
        <li class="name" v-for="item in item.childList" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
    <div class="relationship-item">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentData: {
      type: Array,
      default: () => [],
    },
  },
  created () {
    // console.log(this.content)
  },
}
</script>

<style lang="scss" scoped>
ul,
ol,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.relationshipContent {
  padding: 18px 0;
  .relationship-item {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .title {
    display: inline-block;
    margin-bottom: 5px;
    padding: 5px 15px;
    width: 100px;
    font-size: 14px;
    text-align: center;
    background-color: #eee;
    &:hover {
      color: #cb3737;
    }
  }
  ul {
    display: flex;
    width: 70%;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .name {
    margin: 0 10px 5px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
@media (min-width: 0px) and (max-width: 1025px) {
  .relationshipContent {
    ul {
      width: 80%;
    }
  }
}
</style>
