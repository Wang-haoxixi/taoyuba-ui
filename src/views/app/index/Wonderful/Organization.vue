<template>
  <div class="organization">
    <el-carousel height="200px" :interval="5000" indicator-position="none">
      <el-carousel-item v-for="(item, index) in Math.ceil(wonderfulList.length/3)" :key="index">
        <div class="piece" v-for="(t, i) in wonderfulList.slice(index*3, index*3+3)" :key="i" @click="handleOpen(t)">
          <div class="img"><img :src="t.logo" class="img"></div>
          <span class="name">{{t.org_name}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getRectagsOrgList } from '@/api/app/upms/'

export default {
  data () {
    return {
      wonderfulList: [],
    }
  },
  methods: {
    handleOpen (row) {
      this.$router.push({
        path: `/app/organization_style/${row.org_id}`,
      })
    },
  },
  created () {
    getRectagsOrgList().then(({data}) => {
      this.wonderfulList = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.organization {
  padding-top: 15px;
  .piece {
    text-align: center;
    width: 260px;
    float: left;
    margin: 0 5px;
    .img {
      width: 100%;
      height: 165px;
      overflow: hidden;
      img {
        width: 100%;
        height: 165px;
        transition: 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
    .name {
      line-height: 40px;
    }
    &:first-child {
      margin: 0 15px 0 10px;
    }
    &:last-child {
      margin: 0 10px 0 15px;
    }
  }
}
</style>


