<template>
  <iep-dialog :dialog-show="dialogShow" title="发起申请" width="550px" @close="loadPage" center>
    <el-form size="small" ref="form" label-width="100px">
      <el-form-item v-for="child in applicTypeTree" :key="child.id" :label="`${child.name}：`">
        <!-- <a-checkable-tag class="tag-item" v-for="item in child.children" :key="item.id" v-model="item.checked" @change="handleChange(item.name)">{{item.name}}</a-checkable-tag> -->
        <iep-button :disabled="item.value==='7'" class="tag-item" type="warning" size="mini" v-for="item in child.children" :key="item.value" :plain="!item.checked" @click="handleChange(item)">{{item.label}}</iep-button>
      </el-form-item>
    </el-form>
  </iep-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      name: '',
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
    applicTypeTree () {
      const hrms_applic_type = this.dictGroup['hrms_applic_type']
      return [
        {
          id: 1,
          name: '人事管理',
          children: hrms_applic_type,
        },
      ]
    },
  },
  methods: {
    handleChange (row) {
      this.$router.push({
        path: '/hrms_spa/approval/0',
        query: {
          type: row.value,
        },
      })
      this.dialogShow = false
    },
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-item {
  margin-right: 8px;
}
</style>

