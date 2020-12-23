<template>
  <basic-container>
    <page-header :title="title" :backOption="backOption"></page-header>
    <edit-form :status="status" ref="editForm" @end="onGoBack"></edit-form>
    <operation-wrapper v-if="status !== 'detail'">
      <iep-button type="primary" @click="handleSubmit" style="margin-left: 150px;">保存</iep-button>
    </operation-wrapper>
  </basic-container>
</template>
<script>
import editForm from './edit'
import { initNow } from '@/util/date'
export default {
  components: {
    editForm,
  },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.onGoBack() },
      },
      status: '',
    }
  },
  computed: {
    title () {
      if (this.status === 'add') {
        return '新增联系记录'
      } else if (this.status === 'detail') {
        return '联系记录详情'
      } else if (this.status === 'update') {
        return '编辑联系记录'
      }
      return '联系记录'
    },
  },
  mounted () {
    let id = this.$route.query.id
    this.status = this.$route.query.status
    if (id) {
      this.$refs.editForm.getList(id)
    }
    if (this.status === 'add') {
      this.$set(this.$refs.editForm.form, 'relationshipTime', initNow())
    }
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
    handleSubmit () {
      this.$refs.editForm.handleSubmit()
    },
  },
}
</script>
<style lang="scss" scoped>

</style>