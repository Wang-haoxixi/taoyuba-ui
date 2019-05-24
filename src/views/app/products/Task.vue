<template>
  <div class="task">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button style="float: right; padding: 5px 0; color:#cb3737;" type="text" slot="right">产品与技术委员会></el-button>
      <div class="task-list">
        <el-table :data="tableData" style="width: 100%" size=medium>
          <el-table-column prop="name" label="任务名称"></el-table-column>
          <el-table-column prop="process" label="进度" width="180">
            <el-progress :percentage="20" color="#68C769"></el-progress>
          </el-table-column>
          <el-table-column prop="principal" label="负责人" width="80"></el-table-column>
        </el-table>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '十大任务',
      linkName: '',
      tableData: [
        { name: '高速推进公司产品微服务化，发力移动端', process: 20, principal: '黄磊' },
        { name: '建立200+人员的产品与技术研发队伍，专业岗位不断填补与培养，人力架构满足新研发模式', process: 20, principal: '黄磊' },
        { name: '创新2-3个数据产品，应用逐步智能化，数据元管理、数据清洗、语义处理、智能标注、区块链、主题采集等各项技术服务实现场景落地。', process: 20, principal: '黄磊' },
        { name: '各类技术文档齐全规范，产品模块实现高效的结构化维护。与建立各部门、各委员会协作体系。', process: 20, principal: '黄磊' },
        { name: '实现产品模块五统一，健壮性、安全性进入优秀行列，软著、专利等软件资质新增50+项。', process: 20, principal: '黄磊' },
        { name: '架构成熟，承载力得到充分发挥。数据采、存、管、用满足公司战略需求，资源集合与高效利用', process: 20, principal: '黄磊' },
        { name: '明确产品模块的部门认领与归属、定价与分配，内外部代理实质性开展', process: 20, principal: '黄磊' },
        { name: '建立技术人员能力成长体系、充分发展个人专长。考核评估奖惩清晰，模块动态收益有效激励', process: 20, principal: '黄磊' },
        { name: '内网为主体，数据体系清晰数据结构合理、数据质量好', process: 20, principal: '黄磊' },
        { name: '在组织管理、人力活用、产品设计、技术研发上弥补差距，取得实质性突破', process: 20, principal: '黄磊' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.task {
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>
<style scoped>
.task >>> .el-table th {
  background-color: #fafafa;
}
.task >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
