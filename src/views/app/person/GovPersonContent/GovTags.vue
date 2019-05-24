<template>
  <div>
    <IepAppTabCard :title="title" :data="data">
      <div class="leader-board-list">
        <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
          <span class="count" :class="item.color">{{index+1}}</span>
          <span class="name">{{item.key}}</span>
          <span class="num">{{item.value}}</span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
import { getTagsList } from '@/api/app/tms'

export default {
  data () {
    return {
      title: '国脉标签',
      data: '(135个)',
      leaderBoardList: [],
    }
  },
  methods: {
    loadList () {
      getTagsList().then(({data}) => {
        this.leaderBoardList = data.data.tags
        this.data = `( ${data.data.size}个 )`
      })
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.piece {
  cursor: pointer;
  .name {
    display: inline-block;
    width: 200px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .count {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-right: 20px;
    background-color: #ccc;
    color: #fff;
    vertical-align: middle;
  }
  .red {
    background-color: #cb3737;
  }
  .num {
    float: right;
    height: 30px;
    line-height: 30px;
    color: #666;
  }
  &:hover {
    color: #cb3737;
  }
}
.datas {
  color: #999;
}
</style>
