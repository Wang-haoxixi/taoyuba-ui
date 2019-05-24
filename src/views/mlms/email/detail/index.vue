<template>
  <basic-container>
    <main-form-dialog 
      ref="mainDialog" 
      v-show="pageState=='detail'" 
      @backPage="backPage" 
      @forward="detailForward" 
      @reply="detailReply" 
      @materialDetail="materialDetail">
    </main-form-dialog>
    <summary-detail 
      ref="summary" 
      v-if="pageState == 'summary'" 
      @backPage="backPage" 
      :detailState=true>
    </summary-detail>
    <material-detail 
      ref="material" 
      v-if="pageState == 'material'" 
      @backPage="backPage" 
      :detailState=true>
    </material-detail>
    <update-form-dialog 
      ref="updateDialog" 
      v-show="pageState=='form'" 
      @backWeb="backWeb" 
      @load-page="loadPage">
    </update-form-dialog>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import mixinTable from '../tableTpl/mixinTable'
import mainFormDialog from '../tableTpl/mainDialog'
import SummaryDetail from '@/views/mlms/material/summary/detail'
import MaterialDetail from '@/views/mlms/material/datum/material/detail'
import UpdateFormDialog from '../new/index'

export default {
  name: 'inbox',
  mixins: [ mixins, mixinTable ],
  components: { SummaryDetail, MaterialDetail, mainFormDialog, UpdateFormDialog },
  data () {
    return {
      pageState: 'detail',
    }
  },
  methods: {
    backPage () {
      this.pageState = 'detail'
    },
    materialDetail (row, type) {
      let typeList = {
        summary: { name: '纪要', ref: 'summary' },
        material: { name: '材料', ref: 'material' },
      }
      this.pageState = typeList[type].ref
      this.$nextTick(() => {
        this.$refs[typeList[type].ref].open(row.relatiionId)
      })
    },
    backWeb () {
      this.$router.go(-1)
    },
    loadPage () {
      this.pageState = 'detail'
    },
  },
}
</script>

<style lang="scss" scoped>
.datum {
  padding: 20px;
  background-color: #fff;
}
</style>
