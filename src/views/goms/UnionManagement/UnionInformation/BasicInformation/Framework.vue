<template>
  <div class="framework">
    <span class="details-title">{{subTitle}}</span>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="post" label="职务" width="180">
      </el-table-column>
      <el-table-column prop="name" label="成员" width="180">
      </el-table-column>
      <el-table-column prop="manage" label="分管工作">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      subTitle: '联盟架构',
      tableData: [{
        post: '主任',
        name: '黄磊',
        manage: '全面负责国脉集团产品与技术委员会管理工作及执行工作，贯彻执行领导和集团公司公司下达的各项任务，负责整体统筹管理与协调工作。',
      }, {
        post: '副主任',
        name: '潘超巧',
        manage: '协助主任做好国脉产品与技术委员会技术工作。负责产品技术攻关，贯彻执行领导和集团公司下达的各项任务，主持集团内部底层框架整合工作，整体把控各个项目的进度。',
      }, {
        post: '副主任',
        name: '何益挺',
        manage: '负责国脉集团产品与技术委员会产品工作的统筹开展，协助主任进行研发中心各项工作的推进与落实，完成年度目标。',
      }, {
        post: '委员',
        name: '朱娇维、姜圣国、邵万炯、陈振辉、毛鑫敏（试）、邵奇凯（试）、陈奇（试）、邓仲斌（试）',
        manage: '协助主任和副主任做好产品与技术分管工作，参与产品与技术相关决策。',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
