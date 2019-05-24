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
        {levelName:'组织介绍',materialCount:'11',path:'introduction'},
        {levelName:'组织成员',materialCount:'11',path:'member'},
        {levelName:'组织大事记',materialCount:'11',path:'memorabilia'},
        {levelName:'组织相册',materialCount:'11',path:'album'},
        {levelName:'组织荣誉',materialCount:'11',path:'honor'},
        {levelName:'组织评价',materialCount:'11',path:'evaluation'},
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
