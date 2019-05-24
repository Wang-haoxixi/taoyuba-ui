<template>
  <el-table :data="form.versions" border>
    <el-table-column label="版本号">
      <template slot-scope="scope">
        <div>{{scope.row.versionNumber}}</div>
      </template>
    </el-table-column>
    <el-table-column label="上线日期">
      <template slot-scope="scope">
        <div>{{scope.row.onlineTime}}</div>
      </template>
    </el-table-column>
    <el-table-column label="更新说明">
      <template slot-scope="scope">
        {{scope.row.updateContent}}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
}
</script>