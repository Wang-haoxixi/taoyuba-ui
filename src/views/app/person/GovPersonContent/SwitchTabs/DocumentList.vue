<template>
  <div class="document-list">
    <div v-for="(item, index) in documentList" :key="index" class="piece">
      <span @click="handleDetail(item)">{{item.material_name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    documentList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
}
</script>
