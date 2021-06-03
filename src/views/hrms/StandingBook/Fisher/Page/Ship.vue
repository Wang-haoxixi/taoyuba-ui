<template>
  <div class="contract-container">
      <div v-if="people">
        <el-table
        :data="data"
        stripe
        style="width: 100%">
        <el-table-column
              prop="shipName"
              label="船只名称"
            >
            </el-table-column>
            <el-table-column
              prop="createDate"
              label="进出港时间"
            >
            </el-table-column>
            <el-table-column
              prop="进出港类型"
              label="进出港类型"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.type === 'IN' ? '进港' : '出港'  }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="pointName"
              label="港口名称"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="number"
              label="进出港总人数"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="receiveDate"
              label="接受时间"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top: 20px;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="page.current"
          layout="total, prev, pager, next"
          :page-size="page.size"
          :total="page.total">
        </el-pagination>
      </div>
      <div style="text-align:center;margin-top: 30px;">
        <el-button @click="back">返回</el-button>
      </div>
    </div>
    <ship-people ref="ShipPeople" v-if="!people" @back="people = true"></ship-people>
  </div>
</template>
<script>
import { tybPortRecord } from '@/api/ships'
import ShipPeople from './ShipPeople'
export default {
  data () {
    return {
      data: [],
      page: {
        size: 10,
        current: 1,
        total: 0,
      },
      people: true,
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
      tybPortRecord({...this.page,shipName: this.shipName}).then(({ data }) => {
        if (data.code === 0) {
          this.data = data.data.records
          this.page.total = data.data.total
        }
      })
    },
    handleCurrentChange (val) {
      this.page.current = val
      this.getList()
    },
    handleClick (row) {
      this.people = false
      this.$nextTick(()=>{
        this.$refs.ShipPeople.getList(row.id)
      })
    },
    back () {
      this.$emit('back')
    },
  },
  components: {
    ShipPeople,
  },
}
</script>