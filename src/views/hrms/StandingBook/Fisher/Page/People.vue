<template>
  <div class="contract-container">
    <el-table
      :data="data"
      stripe
      style="width: 100%">
       <el-table-column
            prop="name"
            label="船员名称"
          >
          </el-table-column>
          <el-table-column
            prop="duty"
            label="船员职务"
          >
          </el-table-column>
          <el-table-column
            prop="cardNum"
            label="船员身份证号"
          >
          </el-table-column>
          <el-table-column
            prop="smNum"
            label="船员的船员证号"
          >
          </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top: 30px;">
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>
<script>
import { lastRecord } from '@/api/ships'
export default {
  data () {
    return {
      data: [],
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
    }
  },
  props: {
    shipName: {
      default: '',
      type: String,
    },
  },
  methods: {
    getList () {
      lastRecord({...this.page,shipName: this.shipName}).then(({ data }) => {
        if (data.code === 0) {
          this.data = data.data
        }
      })
    },
    handleCurrentChange (val) {
      this.page.current = val
      this.getList()
    },
    back () {
      this.$emit('back')
    },
  },
}
</script>