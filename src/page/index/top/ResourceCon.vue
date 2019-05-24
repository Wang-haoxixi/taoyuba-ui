<template>
  <div>
    <div class="nav-bar">
      <div class="resource-wrapper">
        <div v-for="item in resourceRoute" :key="item.path" class="resource-item" @click.stop="handleOpen(item)">
          <i :class="item.icon"></i>
          <div class="resource-title">{{item.name}}</div>
          <div class="resource-count">{{item.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import resourceRoute from '@/router/app/resource'
import { getResourceCount } from '@/api/app/cpms/channel'

export default {
  data () {
    return {
      resourceRoute,
      routerMatch: this.$route.matched,
    }
  },
  methods: {
    handleOpen (item) {
      this.$router.push({
        path: `/app/resource/${item.path}`,
      })
    },
    getCount () {
      getResourceCount().then(({data}) => {
        for (let item of this.resourceRoute) {
          item.count = data.data[item.countName]
        }
      })
    },
  },
  created () {
    this.getCount()
  },
}
</script>


<style lang="scss" scoped>
.resource-wrapper {
  display: flex;
  margin: 0 auto;
  width: 1200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.resource-item {
  cursor: pointer;
  padding: 10px 0 25px;
  width: 100%;
  height: 100%;
  text-align: center;
  &:hover,
  &:focus {
    background: rgba(245, 245, 245, 0.9);
  }
  & > i {
    margin-right: 0;
    font-size: 30px !important;
    height: 30px;
    color: #999 !important;
  }
  .resource-title {
    margin-top: -5px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 14px;
    color: #999;
  }
  .resource-count {
    font-size: 18px;
    line-height: 18px;
  }
}
</style>

