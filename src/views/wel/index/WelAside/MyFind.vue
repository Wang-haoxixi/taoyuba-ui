<template>
  <div class="find">
    <div class="title">
      <div class="inline">{{findList.title}}</div>
      <div class="more inline" @click="getMore">
        <span>更多</span>
        <span><i class="el-icon-d-arrow-right"></i></span>
      </div>
    </div>
    <div class="find-content">
      <div class="cursor" v-for="(item,index) in findList.details" :key="index" @click="item.callback()">
        <div class="icon"><i :class="item.icon"></i></div>
        <div class="subtitle">{{item.subtitle}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      findList: {
        title: '我要找',
        details: [
          { icon: 'icon-xiangmu', subtitle: '项目', callback: () => { this.$openPage('/app/project') } },
          { icon: 'icon-shangjifaxian', subtitle: '商机', callback: () => { this.$openPage('/app/resource/business') } },
          { icon: 'icon-peixun', subtitle: '培训', callback: () => { this.$openPage('/app/resource/training') } },
          { icon: 'icon-shifu', subtitle: '师父', callback: () => { this.$openPage('/app/person') } },
        ],
      },
    }
  },
  methods: {
    getMore () {
      this.$openPage('/app/resource/material')
    },
  },
  computed: {

  },
}
</script>
<style  lang="scss" scoped>
.find {
  box-sizing: border-box;
  position: relative;
  margin: 10px;
  border-bottom: 1px solid #ccc;
  .subtitle {
    font-size: 14px;
  }
}
.find-content {
  content: "";
  clear: both;
  display: flex;
  > div {
    flex-grow: 1;
    text-align: center;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    &:hover {
      opacity: 0.6;
    }
  }
  .icon {
    padding: 10px 0 0;
    i {
      font-size: 24px !important;
    }
    .icon-fangan {
      color: #5c79a5;
    }
    .icon-shangjifaxian {
      color: #c78a53;
    }
    .icon-peixun {
      color: #47a1bb;
    }
    .icon-shifu {
      color: #cc8082;
    }
  }
}
.more {
  float: right;
  font-size: 12px;
  vertical-align: middle;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #cb132d;
  }
}
.inline {
  display: inline-block;
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
.cursor {
  cursor: pointer;
}
</style>


