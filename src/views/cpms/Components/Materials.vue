<template>
  <el-table :data="form.materialRelations" border>
    <el-table-column label="标题">
      <template slot-scope="scope">
        <div>{{scope.row.name}}</div>
      </template>
    </el-table-column>
    <el-table-column label="类别">
      <template slot-scope="scope">
        <iep-dict-detail :value="scope.row.materialType" dict-name="mlms_material_type"></iep-dict-detail>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'IepCpmsMaterial',
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
}
</script>
