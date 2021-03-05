<template>
  <div>
    <basic-container v-show="show">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="一般性隐患排查" name="first">
          <table-common ref="tableCommon" :shipName="shipName" @open="openCommon"></table-common>
        </el-tab-pane>
        <el-tab-pane label="专业性隐患排查" name="second">
          <table-major ref="tableMajor" :shipName="shipName" @open="openMajor"></table-major>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
    <form-common v-if="showCommon" :status="status" :shipName="shipName" ref="formCommon" @back="onBack" @success="onSuccessCommon"></form-common>
    <form-major v-if="showMajor" :status="status" :shipName="shipName" ref="formMajor" @back="onBack" @success="onSuccessMajor"></form-major>
  </div>
</template>
<script>
import TableCommon from './components/common'
import TableMajor from './components/major'
import FormCommon from '../common/components/form.vue'
import FormMajor from '../major/components/form.vue'
export default {
  components: {
    TableCommon,
    TableMajor,
    FormCommon,
    FormMajor,
  },
  data () {
    return {
      activeName: 'first',
      show: true,
      showCommon: false,
      showMajor: false,
      shipName: '',
      status: '',
    }
  },
  created () {
    this.shipName = this.$route.query.shipName
    this.$nextTick(() => {
      this.$refs.tableCommon.getList()
      this.$refs.tableMajor.getList()
    })
  },
  methods: {
    openCommon (status, id) {
      this.show = false
      this.showCommon = true
      this.showMajor = false
      this.status = status
      if (id) {
        this.$nextTick(() => {
          this.$refs.formCommon.getList(id)
        })
      }
      // console.log(status, id)
    },
    openMajor (status, id) {
      this.show = false
      this.showCommon = false
      this.showMajor = true
      this.status = status
      if (id) {
        this.$nextTick(() => {
          this.$refs.formMajor.getList(id)
        })
      }
      // console.log(status, id)
    },
    onBack () {
      this.show = true
      this.showCommon = false
      this.showMajor = false
    },
    onSuccessCommon () {
      this.onBack()
      this.$refs.tableCommon.getList()
    },
    onSuccessMajor () {
      this.onBack()
      this.$refs.tableMajor.getList()
    },
  },
}
</script>
<style scoped lang="scss"></style>