<template>
  <div class="project">
    <el-card class="box-card" shadow="never">
      <div class="item" v-for="item in itemList" :key="item.id">
        <i class="iconfont" :class="item.icon"></i>
        <div class="text">
          <span class="name">{{item.name}}</span>
          <span>
            <span class="data">{{item.data}}</span>
            <span class="txt">{{item.text}}</span>
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    counts: {
      type: Object,
      default: () => {
        return {
          projectCount1: 0,
          projectCount2: 0,
          clientCount1: 0,
          clientCount2: 0,
          planCount1: 0,
          planCount2: 0,
          productCount: 0,
          honorCount1: 0,
          honorCount2: 0,
          contractCount1: 0,
          contractCount2: 0,
        }
      },
    },
  },
  computed: {
    itemList () {
      return [
        {
          icon: 'icon-renwu',
          name: '项目',
          data: this.counts.projectCount1,
          text: `（在建 ${this.counts.projectCount2}）`,
        },
        {
          icon: 'icon-lianxiren',
          name: '客户',
          data: this.counts.clientCount1,
          text: `（本月新增 ${this.counts.clientCount2}）`,
        },
        {
          icon: 'icon-dangan',
          name: '方案',
          data: this.counts.planCount1,
          text: `（本月新增 ${this.counts.planCount2}）`,
        },
        {
          icon: 'icon-dongtai',
          name: '产品',
          data: this.counts.productCount,
          text: '（最新代理 0）',
        },
        {
          icon: 'icon-hetongliebiao',
          name: '资质',
          data: this.counts.honorCount1,
          text: `（本月新增 ${this.counts.honorCount2}）`,
        },
        {
          icon: 'icon-custom',
          name: '合同',
          data: this.contractCount1,
          text: `（待签 ${this.counts.contractCount1}）`,
        },
      ]
    },
  },
  data () {
    return {
      
    }
  },
}
</script>
<style lang="scss" scoped>
.project {
  margin: 30px 0;
  i {
    display: inline-block;
    width: 70px;
    height: 70px;
    line-height: 70px;
    font-size: 32px;
    text-align: center;
    border-radius: 50%;
    background-color: #f8f8f8;
    color: #666;
    &:hover {
      background-color: #cb3737;
      color: #fff;
      animation: iconRotate-data-v-300a8671 1s linear infinite;
      cursor: pointer;
    }
  }
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 25px 10px;
    .text {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      margin-left: 18px;
      .name {
        font-size: 16px;
      }
      .data {
        font-size: 24px;
      }
      .txt {
        color: #999;
      }
    }
  }
}
</style>
<style scoped>
.project >>> .el-card__body {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
      100px,
      2fr
    );
}
</style>
