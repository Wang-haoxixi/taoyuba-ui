<template>
  <BasicAsideContainer>
    <!-- <template>
      <wel-content></wel-content>
    </template>
    <template v-slot:aside>
      <wel-aside></wel-aside>
    </template> -->
    <template>
      <wel-content v-if="roleId.indexOf(112) === -1 && roleId.indexOf(1) === -1 && roleId.indexOf(111) === -1"></wel-content>
      <basic-level v-if="roleId.indexOf(112) !== -1"></basic-level>
      <basic-levels v-if="roleId.indexOf(1) !== -1 || roleId.indexOf(111) !== -1"></basic-levels>
    </template>
    <template v-slot:aside>
      <basic-aside v-if="roleId.indexOf(112) !== -1"></basic-aside>
      <basic-asides v-if="roleId.indexOf(1) !== -1 || roleId.indexOf(111) !== -1"></basic-asides>
      <wel-aside v-if="roleId.indexOf(112) === -1 && roleId.indexOf(1) === -1 && roleId.indexOf(111) === -1"></wel-aside>
    </template>
  </BasicAsideContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import WelAside from './WelAside/'
import WelContent from './WelContent/'
import BasicLevel from './BasicLevel/index'
import BasicAside from './BasicLevelAside/index'
import BasicLevels from './BasicLevel/indexs'
import BasicAsides from './BasicLevelAside/indexs'
export default {
  name: 'Wel',
  // components: { WelAside, WelContent },
  components: { BasicLevels,BasicAsides,WelAside,WelContent,BasicLevel,BasicAside },
  created () {
    if (this.noOrg) {
      this.$router.push({
        name: '选择组织',
      })
    }
    this.roleId = JSON.parse(localStorage.getItem('user')).roles
  },
  data () {
    return {
      roleId: [],
    }
  },
  computed: {
    ...mapGetters(['noOrg']),
  },
}
</script>
