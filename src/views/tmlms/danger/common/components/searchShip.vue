<template>
  <div class="search-ship-wrapper">
    <el-form inline label-width="80px">
      <el-form-item label="渔船名">
        <el-select
          v-model="shipId"
          style="width: 100%;"
          placeholder=""
          filterable
          remote
          maxlength="20"
          :remote-method="getShipNameList">
          <el-option v-for="item in shipNames" :key="item.shipId" :label="item.shipName" :value="item.shipId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getShipInfo" v-loading="loading">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getShipNamesWithOutOrg, getShipByShipId } from '@/api/ships/index'

export default {
  data () {
    return {
      shipId: '',
      shipNames: [],
      shipInfo: {},
      loading: false,
    }
  },
  methods: {
    getShipInfo () {
      if (this.shipId) {
        this.loading = true
        getShipByShipId(this.shipId).then(({ data }) => {
          if (data.code === 0) {
            this.shipInfo = data.data
            this.$emit('shipInfo', this.shipInfo)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    getShipNameList (name) {
      if (name.length === 5) {
        getShipNamesWithOutOrg(name).then(({data}) => {
          if (data.data) {
            this.shipNames = data.data
          } else {
            this.$message({
              message: data.msg || '查不到信息',
              type: 'warning',
            })
          }
        }).catch((error) => {
          this.$message.error(error.message)
        })
      } else {
        this.shipNames = this.oldShipNames
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  
</style>