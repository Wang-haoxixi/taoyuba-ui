<template>
  <div class="contract-box" style="padding:20px" v-if="show">
        <div v-if="roles.length > 1">
          <h1>编辑信息</h1>
          <el-tabs tab-position="left">
              <el-tab-pane label="船员" v-if="roles.indexOf(105) !== -1"><v-boat></v-boat></el-tab-pane>
              <el-tab-pane label="船东" v-if="roles.indexOf(108) !== -1"><v-shipowner></v-shipowner></el-tab-pane>
              <el-tab-pane label="中介" v-if="roles.indexOf(109) !== -1"><v-agent></v-agent></el-tab-pane>
              <el-tab-pane label="培训机构" v-if="roles.indexOf(110) !== -1"><v-training></v-training></el-tab-pane>
              <el-tab-pane label="渔村" v-if="roles.indexOf(112) !== -1"><v-bvillage></v-bvillage></el-tab-pane>
          </el-tabs>
        </div>
        <h1 v-else style="margin-top:20px;text-align:center">您还未加入任何角色</h1>
  </div>
</template>
<script>
import vShipowner from '@/views/tmlms/shipowner/Page/Detail'
import vTraining from '@/views/tmlms/Training/Page/Detail'
import vAgent from '@/views/tmlms/agent/Page/Detail'
import vBvillage from '@/views/tmlms/bvillage/Page/Detail'
import vBoat from '@/views/tmlms/boatMan/Page/Detail'
import { getUserInfo } from '@/api/login'

export default {
  data () {
    return {
      roles: [],
      show:false,
    }
  },
  methods: {
  },
  computed: {
  },
  created () {
    getUserInfo().then(res=>{
      this.roles = res.data.data.roles
      this.show = true
    })
  },
  components : {
    vShipowner,
    vTraining,
    vAgent,
    vBvillage,
    vBoat,
  },
  filters: {
  },
}
</script>
<style lang="scss" scoped>
.shipowner {
  padding: 20px;
}
.shipowner_title {
  span {
    width: 150px;
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
