<template>
  <div>
    <div class="title">
      <span>部门统计</span>
      <div>
        <span class="border">
          <iep-button plain size="small" @click="left" :disabled="leftDisabled"><i class="el-icon-arrow-left"></i></iep-button>
        </span>
        <span class="border">
          <iep-button plain size="small" @click="right" :disabled="rightDisabled"><i class="el-icon-arrow-right"></i></iep-button>
        </span>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="clientQuantitySort" label="排名">
      </el-table-column>
      <el-table-column prop="department" label="负责部门">
      </el-table-column>
      <el-table-column prop="clientQuantity" label="客户数量">
      </el-table-column>
      <el-table-column prop="contactQuantity" label="联系人数量">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllDept } from '@/api/crms/count'
export default {
  data () {
    return {
      tableData: [],
      current: 1,
      total: '',
      leftDisabled: false,
      rightDisabled: false,
      pageOption: {
        current: 1,
        size: 5,
      },
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      getAllDept(this.pageOption).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total / 5
      })
    },
    left () {
      this.rightDisabled = false
      if (this.current > 1) {
        this.current--
        this.pageOption.current = this.current
        this.rightDisabled = false
        this.load()
      } else {
        this.$message.info('当前已是第一页')
        this.leftDisabled = true
      }
    },
    right () {
      this.leftDisabled = false
      if (this.current < this.total) {
        this.current++
        this.pageOption.current = this.current
        this.leftDisabled = false
        this.load()
      } else {
        this.$message.info('当前已是最后一页')
        this.rightDisabled = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.border {
  margin-left: 10px;
  .el-button {
    padding: 0;
  }
  i {
    display: inline-block;
    padding: 5px;
  }
}
</style>
