<template>
  <div class="tag-desc">
    <div class="tag-main">
      <p class="title">{{form.name}}</p>
      <span class="sign" v-for="typeName in form.typeNames" :key="typeName">{{typeName}}</span>
      <span class="explain fr">
        <i class="icon-bangzhu"></i>
        <span>标签规范说明</span>
      </span>
      <p class="content">
        <iep-no-data v-if="!form.description.length"></iep-no-data>
        {{form.description}}
      </p>
      <!-- <span class="more fr">
        <span>查看更多</span>
        <i class="icon-jiantouxiangyou"></i>
      </span> -->
    </div>
  </div>
</template>
<script>
export default {
  props: ['form'],
}
</script>
<style lang="scss" scoped>
.tag-desc {
  margin-bottom: 20px;
}
.tag-main {
  overflow: hidden;
}
.title {
  display: inline-block;
  font-size: 18px;
  color: #333;
  margin-right: 10px;
}
.sign {
  padding: 0 5px;
  border: 1px solid #c73e3e;
  color: #c73e3e;
  font-size: 14px;
  border-radius: 3px;
  background-color: rgba(231, 168, 168, 0.1);
  cursor: pointer;
  &:hover {
    background-color: rgba(184, 105, 105, 0.1);
  }
}
.fr {
  float: right;
}
.explain {
  color: #999;
  line-height: 30px;
  i {
    margin-right: 8px;
    vertical-align: -2px;
  }
}
.content {
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
  line-height: 28px;
}
.more {
  padding: 0 5px;
  border: 1px solid #eee;
  font-size: 14px;
  color: #c73e3e;
  border-radius: 3px;
  cursor: pointer;
  span {
    margin-right: 5px;
  }
  i {
    display: inline-block;
    transform: rotate(90deg);
    vertical-align: -2px;
  }
}
</style>
