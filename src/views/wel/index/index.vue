<template>
  <BasicAsideContainer>
    <template>
      <wel-content></wel-content>
    </template>
    <template v-slot:aside>
      <wel-aside></wel-aside>
    </template>
  </BasicAsideContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import WelAside from './WelAside/'
import WelContent from './WelContent/'
export default {
  name: 'Wel',
  components: { WelAside, WelContent },
  created () {
    if (this.noOrg) {
      this.$router.push({
        name: '选择组织',
      })
    }
  },
  computed: {
    ...mapGetters(['noOrg']),
  },
}
</script>
