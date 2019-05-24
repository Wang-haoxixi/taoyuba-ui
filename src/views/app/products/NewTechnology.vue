<template>
  <div class="new-tehnology">
    <iepAppTabCard :title="title" isMore>
      <div class="new-tehnology-tab">
        分类：
        <div :class="technologyType==''?'color':''" class="piece-tab" @click="tabTechnologyType('')">全部</div>
        <div v-for="(item) in cpmsTechnologyType" :key="item.value" class="piece-tab" :class="technologyType==item.value?'color':''" @click="tabTechnologyType(item.value)">{{item.label}}</div>
      </div>
      <iep-no-data v-if="!technologyList.length"></iep-no-data>
      <div class="new-tehnology-content">
        <div v-for="(item,index) in technologyList" :key="index" class="piece" @click="handleOpen(item)">
          <img :src="item.imageUrl" alt="">
          <div class="text">
            <span>{{item.name}}</span>
            <span class="introduction">{{item.synopsis}}</span>
          </div>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getTechnologyList } from '@/api/app/cpms/technology'
export default {
  data () {
    return {
      technologyType: '',
      title: '新兴技术',
      technologyList: [],
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    cpmsTechnologyType () {
      return this.dictGroup['cpms_technology_type']
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      this.loadTechnologyList()
    },
    async loadTechnologyList () {
      const { data } = await getTechnologyList({
        type: this.technologyType,
      })
      const technologyList = data.data
      this.technologyList = technologyList.slice(0, 8)
    },
    tabTechnologyType (val) {
      this.technologyType = val
      this.loadTechnologyList()
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/technology_details/${row.id}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.new-tehnology {
  grid-column-start: 1;
  grid-column-end: 3;
  .new-tehnology-tab {
    width: 100%;
    height: 40px;
    .piece-tab {
      display: inline;
      padding: 2px 10px;
      border-radius: 12px;
      border: 1px solid #ffffff;
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        background-color: #fef6f4;
        border: 1px solid #dc8687;
        color: #dc8687;
      }
    }
    .color {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
    }
  }
  .new-tehnology-content {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr;
    .piece {
      cursor: pointer;
      img {
        float: left;
        width: 50px;
        height: 50px;
      }
      .text {
        float: left;
        width: 300px;
        height: 50px;
        margin-left: 19px;
        span {
          display: block;
        }
        .introduction {
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
<style scoped>
.index-card >>> .el-card__header {
  padding: 16px 0 10px;
}
.new-tehnology >>> .el-card{
  height: 354px;
}
</style>

