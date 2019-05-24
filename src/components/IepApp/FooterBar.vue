<template>
  <div class="footer-box">
    <div class="context">
      <div class="text">
        <a href="javascript:void(0);">常见问题</a>
        <a href="javascript:void(0);" @click="handleOpen2()">操作手册</a>
        <a href="javascript:void(0);" @click="getTag()">标签库</a>
        <a href="javascript:void(0);">知识图谱</a>
        <a href="javascript:void(0);" @click="handleOpen5()">国脉贝制度</a>
        <a href="javascript:void(0);"> 新人培训</a>
        <span> Copyright 2014 - 2019 技术支持：<a class="position" href="javascript:void(0);"> 国脉数据智能门户系统DIPS</a></span>
        <span class="number">浙ICP备13016715号-4</span>
      </div>
    </div>
  </div>
</template>
<script>
import { openWindow } from '@/util/util'
export default {
  name: 'IepAppFooterBar',
  methods: {
    handleOpen1 () {
      openWindow('', '常见问题', 800, 600)
    },
    handleOpen2 () {
      openWindow('https://ioa.govmade.com/uploads/2/file/public/201804/20180408101156_n2l3kmaach.pdf', '操作手册', 800, 600)
    },
    handleOpen3 () {
      openWindow('', '标签库', 800, 600)
    },
    handleOpen4 () {
      openWindow('', '知识图谱', 800, 600)
    },
    handleOpen5 () {
      openWindow('https://ioa.govmade.com/template/2/default/_files/onlineFiles/About_GB_2019_No1.pdf', '国脉贝制度', 800, 600)
    },
    handleOpen6 () {
      openWindow('', '新人培训', 800, 600)
    },
    getTag () {
      this.$router.push({
        path: '/app/tag_library/',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.footer-box {
  width: 100%;
  height: 65px;
  background-color: #535353;
  text-align: center;
  line-height: 65px;
  .context {
    width: 1200px;
    margin: 0 auto;
    color: #d1d1d1;
    a {
      padding: 0 15px;
      color: #d1d1d1;
      &:hover {
        color: #bb1a20;
      }
    }
    .position {
      padding-left: 0;
    }
    span {
      padding-left: 15px;
    }
    .number {
      color: #a6a6a6;
    }
  }
}
</style>


