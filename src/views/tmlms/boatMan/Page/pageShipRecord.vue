<template>
  <div class="ship-record-container">
    <el-table
      :data="data"
      stripe
      style="width: 100%">
      <el-table-column
        prop="shipName"
        label="船名号">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="身份证号码">
      </el-table-column>
      <el-table-column
        prop="realName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="flag"
        label="上下船">
        <template slot-scope="scope">
          <span>{{getFlagName(scope.row.flag)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="certNames"
        label="职务证书">
        <template slot-scope="scope">
          <span>{{getCertNames(scope.row.certs)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sourceType"
        label="来源">
        <template slot-scope="scope">
          <span>{{getSourceTypeName(scope.row.sourceType)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="leftTime"
        label="登记时间">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getCrewAllSyslog } from '@/api/ships/shipsyslog'
import { mapGetters } from 'vuex'
const MAP_DATA = {
  sourceType: [
    { label: '合同', value: 1 },
    { label: '设备', value: 2 },
    { label: '微信', value: 3 },
  ],
  flag: [
    { label: '上船', value: 1 },
    { label: '下船', value: 2 },
  ],
}
export default {
  data () {
    return {
      data: [],
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  methods: {
    getMapByVal (data, val) {
      let result = ''
      data.forEach((item) => {
        if (item.value === val) {
          result = item.label
          return false
        }
      })
      return result
    },
    getCertNames (val) {
      let maps = this.dictGroup['tyb_crew_cert_title']
      let result = []
      if (Array.isArray(val)) {
        val.forEach((item) => {
          let re = this.getMapByVal(maps, item.certTitle)
          if (re) {
            result.push(re)
          }
        })
      }
      return result.join(',')
    },
    getFlagName (val) {
      return this.getMapByVal(MAP_DATA.flag, val)
    },
    getSourceTypeName (val) {
      return this.getMapByVal(MAP_DATA.sourceType, val)
    },
    getList (name) {
      if (name) {
        getCrewAllSyslog({ size: 10000, current: 1, realName: name}).then(({ data }) => {
          if (data.code === 0) {
            this.data = data.data.records
          }
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  .ship-record-container {

  }
</style>