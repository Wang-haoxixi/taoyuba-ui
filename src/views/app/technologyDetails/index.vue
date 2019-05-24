<template>
  <div>
    <div class="technology-details">
      <div>
        <menus></menus>
      </div>
      <div>
        <introduction :form="form"></introduction>
        <basic-information :form="form"></basic-information>
        <application-module :form="form"></application-module>
        <technical-application :form="form"></technical-application>
        <related-materials :form="form"></related-materials>
      </div>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import Menus from './Menus'
import Introduction from './Introduction'
import BasicInformation from './BasicInformation'
import ApplicationModule from './ApplicationModule'
import TechnicalApplication from './TechnicalApplication'
import RelatedMaterials from './RelatedMaterials'
import { getTechnologyById } from '@/api/app/cpms/technology'
import { initForm } from '@/views/cpms/technologys/options'
export default {
  components: { Menus, Introduction, BasicInformation, ApplicationModule, TechnicalApplication, RelatedMaterials },
  data () {
    return {
      form: initForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      try {
        const { data } = await getTechnologyById(this.$route.params.id)
        this.form = data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.technology-details {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-column-gap: 30px;
  grid-template-columns: minmax(100px, 220px) minmax(100px, 880px);
}
</style>
<style scoped>
</style>

