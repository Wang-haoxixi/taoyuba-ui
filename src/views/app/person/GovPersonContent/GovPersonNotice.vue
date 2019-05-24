<template>
  <div class="notice">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <IepAppAssortCard :dataList="dataList" class="notice-box" title="typeName" desc="name">
        <span class="new" slot="label">NEW</span>
      </IepAppAssortCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getNotificationList } from '@/api/app/ims/'

export default {
  data () {
    return {
      title: '通知公告',
      dataList: [],
      linkName: '',
    }
  },
  created () {
    getNotificationList().then(({data}) => {
      for (let item of data.data) {
        item.typeName = `【${item.typeName}】`
      }
      this.dataList = data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.notice-box {
  position: relative;
  .new {
    padding: 0 3px;
    height: 20px;
    line-height: 18px;
    font-size: 12px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #cb3737;
    color: #cb3737;
    position: absolute;
    right: 0;
    top: 7px;
  }
  .assort .piece {
    padding-right: 40px;
  }
}
</style>
<style scoped>
.notice >>> .el-card {
  height: 351px;
}
</style>
