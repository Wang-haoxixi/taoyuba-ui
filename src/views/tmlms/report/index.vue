<template>
  <div>
    <basic-container v-show="show">
      <page-header title="勘验报告"></page-header>
      <operation-container>
        <template slot="right">
          <span><el-input v-model.trim="params.shipName" placeholder="请输入船名号" size="small" clearable></el-input></span>
          <el-button size="small"  @click="onSearch(params)">搜索</el-button>
        </template>
      </operation-container>
      <div>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="shipName"
            label="船名号">
          </el-table-column>
          <el-table-column
            prop="shipNo"
            label="船名编号">
          </el-table-column>
          <!-- <el-table-column
            prop="hullMaterial"
            label="船体材质">
            <template slot-scope="scope">
              {{getLabel(dictGroup['tyb_ship_material'], scope.row.hullMaterial)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="workMode"
            label="作业方式">
            <template slot-scope="scope">
              {{getLabel(dictGroup['tyb_resume_worktype'], scope.row.workMode)}}
            </template>
          </el-table-column> -->
          <el-table-column
            fixed="right"
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button @click="handleDetail(scope.row)" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </basic-container>
    <page-form v-if="!show" ref="pageForm" @back="onBack" :status="status"/>
  </div>
</template>
<script>
import { getPage } from '@/api/tmlms/report'
import pageForm from './components/form.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    pageForm,
  },
  data () {
    return {
      params: {
        current: 1,
        size: 10,
        // shipName: '',
      },
      total: 0,
      tableData: [],
      loading: false,
      status: 'detail',
      show: true,
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  mounted () {
    this.getList()
  },
  methods: {
    getLabel (data, value) {
      let result = ''
      console.log(data, value)
      let val = data.findIndex((item) => {
        return item.value === value
      })
      if (val) {
        result = val.label
      }
      return result
    },
    getList () {
      this.loading = true
      getPage(this.params).then(({ data }) => {
        this.loading = false
        if (data.code === 0) {
          this.tableData = data.data.records
          this.total = data.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    onSearch () {
      this.params.current = 1
      this.getList()
    },
    handleDetail (row) {
      this.status = 'detail'
      this.show = false
      this.$nextTick(() => {
        this.$refs.pageForm.getShipInfo(row.shipName)
        this.$refs.pageForm.getList(row.id)
      })
    },
    onBack () {
      this.show = true
    },
  },
}
</script>
<style scoped lang="scss"></style>