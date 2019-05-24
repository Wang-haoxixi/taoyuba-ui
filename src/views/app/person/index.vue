<template>
  <div class="gov-person">
    <gov-person-top></gov-person-top>
    <gov-person-content></gov-person-content>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import GovPersonContent from './GovPersonContent/'
import GovPersonTop from './GovPersonTop/'
export default {
  name: 'govPerson',
  components: { GovPersonContent, GovPersonTop },
  data () {
    return {
    }
  },
  created () {
    this.$notify({
      title: '注意',
      message: '此页面正在开发中，当前数据仅供参考。',
      offset: 60,
    })
  },
}
</script>
<style scoped>
.gov-person >>> .el-card {
  border-radius: 0;
}
.gov-person >>> .cardTitle {
  font-size: 16px;
}
.gov-person-content >>> .more:hover,
.gov-person-content >>> .more:focus {
  color: #cb3737;
}
.gov-person-content >>> .important {
  float: right;
  color: #cb3737;
}
.gov-person-content >>> .important:hover,
.gov-person-content >>> .important:focus {
  color: #f56c6c;
}
</style>

