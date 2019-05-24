<template>
  <div class="menus">
    <a-menu @click="handleClick" mode="inline">
      <a-menu-item v-for="(item,index) in data" :key="index">
        <router-link  :to="item.path" >{{item.levelName}}</router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>

export default {
  data () {
    return {
      data: [
        {levelName:'联盟介绍',materialCount:'11',path:'introduction'},
        {levelName:'联盟大事记',materialCount:'11',path:'memorabilia'},
        {levelName:'联盟发展历程',materialCount:'11',path:'development'},
        {levelName:'联盟文化',materialCount:'11',path:'culture'},
        {levelName:'联盟相册',materialCount:'11',path:'album'},
        {levelName:'评价管理',materialCount:'11',path:'evaluation'},
      ],
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('change_page', e.key)
    },
    titleClick () {
      // console.log('titleClick', e)
    },
  },
}
</script>
<style lang="scss" scoped>
.menus {
  border-right: 1px solid #eee;
  height: 100%;
  .ant-menu-inline {
    border-right: 0;
  }
}
</style>
