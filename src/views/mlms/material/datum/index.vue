<template>
  <basic-container>
    <page-header title="资料"></page-header>
    <iep-tabs v-model="tabName" :tab-list="tabList">
      <template v-if="tabName ==='materialDialog'" v-slot:materialDialog>
        <material-dialog></material-dialog>
      </template>
      <template v-if="tabName ==='aptitudeDialog'" v-slot:aptitudeDialog>
        <aptitude-dialog></aptitude-dialog>
      </template>
      <template v-if="tabName ==='contractDialog'" v-slot:contractDialog>
        <contract-dialog></contract-dialog>
      </template>
      <template v-if="tabName ==='configureDialog'" v-slot:configureDialog>
        <configure-dialog></configure-dialog>
      </template>
      <template v-if="tabName ==='fileDialog'" v-slot:fileDialog>
        <file-dialog></file-dialog>
      </template>
    </iep-tabs>
  </basic-container>
</template>

<script>
import mixins from '@/mixins/mixins'
import MaterialDialog from './material/'
import AptitudeDialog from './aptitude/'
import ContractDialog from './contract/'
import ConfigureDialog from './configure/'
import FileDialog from './file/'
import { mapGetters } from 'vuex'

export default {
  name: 'datum',
  mixins: [ mixins ],
  components: { MaterialDialog, AptitudeDialog, ContractDialog, ConfigureDialog, FileDialog },
  computed: {
    ...mapGetters(['permissions']),
    tabList () {
      let obj = [
        {
          label: '材料',
          value: 'materialDialog',
        }, {
          label: '荣誉资质',
          value: 'aptitudeDialog',
        }, {
          label: '合同',
          value: 'contractDialog',
        },
      ]
      if (this.permission_config) {
        obj.push({
          label: '分类配置',
          value: 'configureDialog',
        })
      }
      return obj
    },
  },
  data () {
    return {
      permission_config: false,
      tabName: 'materialDialog',
    }
  },
  created () {
    this.permission_config = this.permissions['mlms_datum_fp_add']
  },
}
</script>
