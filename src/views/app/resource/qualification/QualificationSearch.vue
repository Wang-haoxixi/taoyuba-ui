<template>
  <div>
    <div class="qualification-search">
      <h3><span>资质库</span>（共 {{total}} 个）</h3>
      <template>
        <div class="search-con">
          <operation-search @search-page="searchPage" prop="honorQualName"></operation-search>
          <!-- <el-button type="danger" plain>高级搜索</el-button> -->
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getHonorCount } from '@/api/app/mlms/honor'

export default {
  data () {
    return {
      total: 0,
    }
  },
  methods: {
    searchPage (val) {
      this.$emit('load-page', val)
    },
    // 获取总数
    getHonorCount () {
      getHonorCount().then(({data}) => {
        this.total = data.data
      })
    },
  },
  created () {
    this.getHonorCount()
  },
}
</script>

<style lang="scss" scoped>
.qualification-search {
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  h3 {
    font-size: 24px;
    span {
      color: #0185d8;
    }
  }
  .search-con {
    display: flex;
    margin: 0 auto;
    max-width: 600px;
    justify-content: space-between;
  }
}
</style>

<style scoped>
.qualification-search >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.qualification-search >>> .el-input--small input {
  height: 40px !important;
}
.qualification-search >>> .el-card {
  background-color: #fafafa;
}
.qualification-search >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.qualification-search >>> .el-button--danger.is-plain {
  color: #0185d8;
  background: #fef0f0;
  border-color: #0185d8;
}
.qualification-search >>> .el-button--danger.is-plain:hover,
.qualification-search >>> .el-button--danger.is-plain:focus {
  background: #0185d8;
  border-color: #ba1b21;
  color: #fff;
}
</style>