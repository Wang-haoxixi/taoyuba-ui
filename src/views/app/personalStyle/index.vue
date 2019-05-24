<template>
  <div>
    <div class="personal">
      <person-top></person-top>
      <person-content></person-content>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import PersonTop from './PersonTop'
import PersonContent from './PersonContent/'
export default {
  components: {
    PersonTop, PersonContent,
  },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.personal {
  margin: 0 auto;
  width: 1200px;
}
</style>
