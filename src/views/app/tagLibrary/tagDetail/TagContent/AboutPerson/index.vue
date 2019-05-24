<template>
  <div class="gird-all">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">
        <iep-tabs v-model="activeTab" :tab-list="tabList">
          <template v-if="activeTab ==='AboutPerson'" v-slot:AboutPerson>
            <about-person v-loading="activeTab !=='AboutPerson'" :data="data.all"></about-person>
          </template>
          <template v-if="activeTab ==='Job'" v-slot:Job>
            <job v-loading="activeTab !=='Job'" :data="data.ability"></job>
          </template>
          <template v-if="activeTab ==='Ability'" v-slot:Ability>
            <ability v-loading="activeTab !=='Ability'" :data="data.project"></ability>
          </template>
          <template v-if="activeTab ==='Hobby'" v-slot:Hobby>
            <hobby v-loading="activeTab !=='Hobby'" :data="data.learning"></hobby>
          </template>
        </iep-tabs>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import AboutPerson from './AboutPerson'
import Job from './Job'
import Ability from './Ability'
import Hobby from './Hobby'
import { getPersonById } from '@/api/tms/tag'
export default {
  components: {
    AboutPerson,
    Job,
    Ability,
    Hobby,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '相关人物(30)',
        value: 'AboutPerson',
      }, {
        label: '职业(30)',
        value: 'Job',
      }, {
        label: '能力(30)',
        value: 'Ability',
      }, {
        label: '兴趣爱好(30)',
        value: 'Hobby',
      }],
      activeTab: 'AboutPerson',
      data: {
        all: [],
        ability: [],
        project: [],
        learning: [],
      },
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      try {
        const { data } = await getPersonById(this.$route.params.id)
        this.data = this.$mergeByFirst(this.data, data.data)
        this.tabList[0].label = `相关人物(${this.data.all.length})`
        this.tabList[1].label = `职业(${this.data.ability.length})`
        this.tabList[2].label = `能力(${this.data.project.length})`
        this.tabList[3].label = `兴趣爱好(${this.data.learning.length})`
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style scoped lang="scss">
</style>
<style scoped>
.gird-all >>> .el-card {
  border: 0;
  padding: 0;
}
.gird-all >>> .el-tabs__item {
  font-size: 18px;
}
.gird-all >>> .el-tabs__header {
  margin-bottom: 30px;
}
</style>

