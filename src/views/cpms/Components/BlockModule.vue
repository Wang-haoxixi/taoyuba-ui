<template>
  <div>
    <el-card class="card" v-for="(item) in value" :key="item.id" :body-style="{ padding: '0px', width: '150px' }" shadow="hover">
      <iep-img :src="item.imageUrl" alt=""></iep-img>
      <div style="padding: 14px;">
        <iep-div-detail :value="item.name"></iep-div-detail>
        <div class="bottom clearfix">
          <el-button type="text" class="button" @click="handleDelete(item)">删除</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleDelete (row) {
      this.$emit('delete', row)
    },
  },
}
</script>
<style scoped>
.card >>> img {
  width: 100%;
  height: 150px;
  padding: 5px;
}
</style>

<style lang="scss" scoped>
.card {
  width: 150px;
  display: inline-block;
  margin-right: 5px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
