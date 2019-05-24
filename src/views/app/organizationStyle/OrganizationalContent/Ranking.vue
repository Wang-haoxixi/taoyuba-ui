<template>
  <div class="ranking">
    <el-card shadow="never">
      <div class="labs-con">
        <div class="data-lab" v-for="lab in labList" :key="lab.id">
          <div class="count">{{lab.data}}</div>
          <div class="labTitle"><span>{{lab.labTitle}}</span></div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      labList: [
        {
          data: '670',
          labTitle: '信用值',
        },
        {
          data: '1453',
          labTitle: '贡献',
        },
        {
          data: '13',
          labTitle: '业绩排名',
        },
        {
          data: '25',
          labTitle: '业绩排名',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.ranking {
  margin-bottom: 30px;
  .labs-con {
    display: flex;
    justify-content: space-between;
    .count {
      font-size: 24px;
    }
    .data-lab {
      padding: 0 10px;
      border-right: 1px solid #eee;
      text-align: center;
      .labTitle {
        color: #999;
      }
      &:nth-child(4) {
        border: 0;
      }
    }
  }
}
</style>
<style scoped>
.ranking >>> .el-card__body {
  padding: 15px;
}
</style>
