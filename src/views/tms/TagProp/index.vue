<template>
  <div>
    <basic-container>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-tabs v-model="activeName" style="width:100%;">
          <el-tab-pane label="标签分类" name="first">
            <tag-type></tag-type>
          </el-tab-pane>
          <el-tab-pane label="标签级别" name="second">
            <tag-level></tag-level>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import tagType from './tag_type'
import tagLevel from './tag_level'
export default {
  components: { tagType, tagLevel },
  data () {
    return {
      activeName: 'first',
    }
  },
}
</script>
