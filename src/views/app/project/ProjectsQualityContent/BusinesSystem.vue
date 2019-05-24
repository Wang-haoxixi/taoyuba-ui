<template>
  <div class="business-system">
    <iepAppTabCard :title="title" :data="data">
      <div class="business-system-con">
        <div class="business-system-list" v-for="item in itemList" :key="item.id">
          <i class="iconfont" :class="item.icon"></i>
          <span class="name">{{item.name}}</span>
          <p class="con">{{item.con}}</p>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '业务体系',
      data: '五位一体',
      itemList: [
        {
          icon: 'icon-ruanjianwenti',
          name: '软件',
          con: '拥有数据基因(DNA)和水巢(DIPS)两大系列几十项软件产品',
        },
        {
          icon: 'icon-gaikuang',
          name: '咨询',
          con: '长期为中国智慧城市、智慧政府和智慧企业提供专业咨询规划和数据服务',
        },
        {
          icon: 'icon-diannaodenglu',
          name: '平台',
          con: '运营电子政务、物联网、智慧城市、数邦客、司马钱、中船通等系列行业平台',
        },
        {
          icon: 'icon-gongzuotai1',
          name: '数据',
          con: '提供大数据治理、数据资产、数据处理、数据挖掘等数据服务',
        },
        {
          icon: 'icon-dongtai',
          name: '创新业务',
          con: '以人工智能、区块链、知识图谱、政府数据体系、智慧组织为研究方向',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.business-system-con {
  display: flex;
  justify-content: space-between;
  .business-system-list {
    display: flex;
    flex: 1;
    margin-left: -1px;
    flex-direction: column;
    align-items: center;
    text-align: left;
    padding: 15px;
    border: 1px solid #fff;
    border-right-color: #eee;
    border-left-color: #eee;
    color: #666;
    &:last-child {
      border-right-color: #fff;
    }
    &:first-child {
      border-left-color: #fff;
    }
    .iconfont {
      display: block;
      font-size: 42px;
    }
    .name {
      margin-bottom: 10px;
    }
    .con {
      text-align: justify;
      color: #999;
    }
    &:hover {
      background-color: #f9f9f9;
      border-color: #eee;
    }
  }
}
</style>
<style scoped>
.business-system >>> .el-card {
  height: 330px;
}
.business-system >>> .el-card__body {
  padding: 24px 0;
}
</style>
