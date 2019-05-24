<template>
  <div>
    <div class="module-details">
      <introduction :form="form"></introduction>
      <r-d-progress :form="form"></r-d-progress>
      <basic-information :form="form"></basic-information>
      <team-information :form="form"></team-information>
      <all-versions :form="form"></all-versions>
      <application-module :form="form"></application-module>
      <technical-application :form="form"></technical-application>
      <related-materials :form="form"></related-materials>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>
<script>
import Introduction from './Introduction'
import RDProgress from './RDProgress'
import BasicInformation from './BasicInformation'
import TeamInformation from './TeamInformation'
import AllVersions from './AllVersions'
import ApplicationModule from './ApplicationModule'
import TechnicalApplication from './TechnicalApplication'
import RelatedMaterials from './RelatedMaterials'
import { getModuleById } from '@/api/app/cpms/module'
import { initForm } from '@/views/cpms/modules/options'
export default {
  beforeRouteUpdate (to, from, next) {
    console.log(to, from)
    this.$nextTick(() => {
      this.loadPage()
    })
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  components: { Introduction, RDProgress, BasicInformation, TeamInformation, AllVersions, ApplicationModule, TechnicalApplication, RelatedMaterials },
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
      const { data } = await getModuleById(this.$route.params.id)
      this.form = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
.module-details {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
  .tab {
    height: 80px;
    line-height: 80px;
    font-size: 18px;
  }
}
</style>
<style scoped>
</style>

